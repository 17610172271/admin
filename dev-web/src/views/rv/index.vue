<template>
  <div>
    <div class="b-b text-lg wrapper">
      <div class="search-form pull-right">
        <input type="text" class="form-input m-t-n-xs" placeholder="搜索车辆标题" v-model="searchKey" @change="doSearch">
      </div>
      车辆管理
    </div>
    <div class="clear padder">
      <ul class="nav nav-custom no-radius b-b">
        <li><router-link :to="{ name: 'rv'}">全部房车</router-link></li>
        <li v-for="link in links">
          <router-link :to="{ name: 'rv', query: { status: link.value}}">{{link.name}}</router-link>
        </li>
      </ul>
    </div>
    <div class="wrapper">
        <div class="text-center padder-v" v-if="!list">
          未找到数据
        </div>
        <table class="table table-sm" v-if="list">
          <thead>
            <tr>
              <th>房车</th>
              <th class="w-xs">状态</th>
              <th>权重</th>
              <th class="w-sm">时间
                <span class="text-muted">(创建/更新)</span>
              </th>
              <th class="w-xs">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list">
              <td>
                <div class="text-lg">
                  {{item.title}}
                </div>
                <div class="text-muted">
                  {{item.plate_number}} | {{item.model}} | {{item.brand_name}}
                </div>
              </td>
              <td>
                <div v-if="item.status == '0'" class="text-muted">草稿</div>
                <div v-if="item.status == '1'" class="text-info">待审核</div>
                <div v-if="item.status == '2'" class="text-danger">已驳回</div>
                <div v-if="item.status == '3'" class="text-muted">已通过</div>
              </td>
              <td>
                <div>
                  <input type="number" name="" value="1" class="form-input table-form-input" v-model="item.weight" @change="setWeight(item)">
                </div>
              </td>
              <td>
                <div class="text-muted">
                  {{item.created_at}}<br>
                  {{item.updated_at}}
                </div>
              </td>
              <td>
                <router-link :to="{ name: 'rv_detail', params: { id: item.id}}">详情</router-link>
                <router-link :to="{name: 'fee', params: {id: item.id}}">价格&排期</router-link>
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
    list: [],
    page: 1,
    searchKey: null
  }),
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.axios.get(api.rv.list, {
        params: {
          status: this.$route.query.status,
          size: this.$route.query.size,
          page: this.page > 1 ? this.page : 1,
          title: this.searchKey || undefined
        }
      })
      .then(response => {
        if (response.data.code === 200) {
          this.list = response.data.data.list || []
        }
      })
    },
    onRouteChange () {
      this.page = 1
      this.getList()
    },
    doSearch () {
      this.page = 1
      this.getList()
    },
    setWeight (item) {
      this.axios.post(api.rv.edit, {
        id: item.id,
        weight: item.weight
      }).then(response => {
        if (response.data.code === 200) {
          console.log('success')
        }
      })
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
  .w-xs {
    width: 94px;
    text-align: center;
    
  }
</style>
