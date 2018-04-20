<template>
  <div>
    <div class="b-b text-lg wrapper">
      <div class="search-form pull-right">
        <input type="text" class="form-input m-t-n-xs" placeholder="输入订单编号搜索" @change="doSearch" v-model="searchKey">
      </div>
      订单管理
    </div>
    <div class="clear padder">
      <ul class="nav nav-custom no-radius b-b">
        <li><router-link :to="{ name: 'order'}">全部房车</router-link></li>
        <li v-for="link in links">
          <router-link :to="{ name: 'order', query: { status: link.value}}">{{link.name}}</router-link>
        </li>
      </ul>
    </div>
    <div class="wrapper">
        <div class="text-center padder-v" v-if="!list">
          未找到数据
        </div>
        <table class="table" v-if="list">
          <thead>
            <tr>
              <th>订单</th>
              <th class="w-sm">状态</th>
              <th class="w-sm">
                时间
                <span class="text-muted">(创建/更新)</span>
              </th>
              <th class="w-xs">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list">
              <td>
                <div class="text-lg">
                  {{item.code}}
                </div>
                <div class="text-muted">
                  {{item.brand_name}} <br>
                  取：{{item.pickup_time | format('YYYY-MM-DD HH:mm')}}
                  <router-link class="text-muted" :to="{ name: 'store_detail', params: {id: item.pickup_store_id}}">{{item.pickup_store_name}}</router-link>
                </div>
                <div class="text-muted">
                  还：{{item.return_time | format('YYYY-MM-DD HH:mm')}}
                  <router-link class="text-muted" :to="{ name: 'store_detail', params: {id: item.return_store_id}}">{{item.return_store_name}}</router-link>
                </div>
              </td>
              <td>
                <div v-if="item.status == status.value" v-for="status in orderStatus" :class="status.class">{{status.full_name}}</div>
              </td>
              <td>
                <div class="text-muted">
                  {{item.created_at}}<br>
                  {{item.updated_at}}
                </div>
              </td>
              <td>
                <div><router-link :to="{ name: 'order_detail', params: { id: item.id}}">详情</router-link></div>
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
import options from '@/config/options'
import format from '@/tools/date/format'

export default {
  data: () => ({
    list: [],
    links: options.orderListLinks,
    page: 1,
    orderStatus: options.orderStatus,
    searchKey: ''
  }),
  filters: {
    format: format
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.axios.get(api.order.list, {
        params: {
          status: this.$route.query.status,
          size: this.$route.query.size || null,
          page: this.page > 1 ? this.page : 1,
          code: this.searchKey || undefined
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
