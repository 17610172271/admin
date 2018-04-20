<template>
  <div>
    <div class="b-b text-lg wrapper">
      <div class="search-form pull-right">
        <input type="text" class="form-input m-t-n-xs" placeholder="搜索">
      </div>
      店铺管理
    </div>
    <div class="wrapper">
        <div class="text-center padder-v" v-if="!list">
          未找到数据
        </div>
        <table class="table" v-if="list">
          <thead>
            <tr>
              <th>店铺</th>
              <th class="w-xs">状态</th>
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
                <div class="text-muted">
                  <span>电话：</span>{{item.phone_number}}<br>
                  <span>地址：</span>{{item.country}}{{item.city}}{{item.area}} {{item.address}}
                </div>
              </td>
              <td>
                <span class="" v-if="item.is_closed == '1'">已关闭</span>
              </td>
              <td>
                <div class="text-muted">
                  {{item.created_at}}<br>
                  {{item.updated_at}}
                </div>
              </td>
              <td>
                <router-link :to="{ name: 'store_detail', params: { id: item.id}}">详情</router-link>
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

export default {
  data: () => ({
    list: [],
    page: 1
  }),
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.axios.get(api.store.list, {
        params: {
          status: this.$route.query.status,
          size: this.$route.query.size,
          page: this.page > 1 ? this.page : 1
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
