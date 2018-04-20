<template>
  <div>
    <div class="b-b text-lg wrapper">
      <div class="search-form pull-right">
        <input type="text" class="form-input m-t-n-xs" placeholder="搜索">
      </div>
      商家管理
    </div>
    <div class="padder clear">
      <ul class="nav nav-custom no-radius b-b">
        <li><router-link :to="{ name: 'agency'}">全部商家</router-link></li>
        <li v-for="link in links">
          <router-link :to="{ name: 'agency', query: { status: link.value}}">{{link.name}}</router-link>
        </li>
      </ul>
    </div>
    <div class="text-center wrapper" v-if="!list">
      未找到数据
    </div>
    <div class="wrapper" v-if="list">
        <table class="table table-sm">
          <thead>
            <tr>
              <th>商家</th>
              <th class="w-xxs">状态</th>
              <th>驳回理由</th>
              <th class="w-sm">
                时间
                <span class="text-muted">(创建/更新)</span>
              </th>
              <th class="w-xxs">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list">
              <td>
                <div class="text-lg">
                  {{item.name}}
                </div>
                <div class="">
                  {{item.phone_number}}
                </div>
              </td>
              <td>
                <div v-if="item.status == '0'" class="text-muted">草稿</div>
                <div v-if="item.status == '1'" class="text-info">待审核</div>
                <div v-if="item.status == '2'" class="text-danger">已驳回</div>
                <div v-if="item.status == '3'" class="text-muted">已通过</div>
              </td>
              <td>
                {{item.reject}}
              </td>
              <td>
                <div class="text-muted">
                  {{item.created_at}}<br>
                  {{item.updated_at}}
                </div>
              </td>
              <td class="text-center">
                <router-link :to="{ name: 'agency_detail', params: { id: item.id}}">详情</router-link>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-center">
          <ul class="pagination">
            <li class="page-item"><a @click="page > 1 ? page-- : page = 1">上一页</a></li>
            <li class="page-item"><a>{{page}}</a></li>
            <li class="page-item"><a @click="page++">下一页</a></li>
          </ul>
        </div>
    </div>
  </div>
</template>
<script>
import api from '@/api'

const links = [
  {value: 1, name: '待审核'},
  {value: 2, name: '已驳回'},
  {value: 3, name: '已通过'}
]

export default {
  data: () => ({
    links: links,
    list: null,
    page: 1
  }),
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.axios.get(api.agency.list, {
        params: {
          status: this.$route.query.status,
          size: this.$route.query.size,
          page: this.page > 1 ? this.page : 1
        }
      })
      .then(response => {
        if (response.data.code === 200) {
          this.list = response.data.data.list || null
        }
      })
    },
    onRouteChange () {
      this.page = 1
      this.getList()
    }
  },
  watch: {
    '$route': 'onRouteChange',
    page (val) {
      if (val > 0) this.getList()
    }
  }
}
</script>
<style scoped>
  .w-xxs {
    text-align: center;
    
  }
</style>
