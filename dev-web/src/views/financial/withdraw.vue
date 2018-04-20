<template>
  <div>
    <div class="wrapper">
      <div class="clear">
        <ul class="nav nav-custom no-radius b-b">
          <li><router-link :to="{ name: 'withdraw'}">全部</router-link></li>
          <li v-for="link in status">
            <router-link :to="{ name: 'withdraw', query: { status: link.value}}">{{link.name}}</router-link>
          </li>
        </ul>
      </div>
      <div>
        <table class="table table-sm">
          <thead>
            <tr>
              <!-- <th>
                <label>
                  <input type="checkbox" name=""> 全选
                </label>
              </th> -->
              <th>流水号</th>
              <th>申请时间</th>
              <th>账户</th>
              <th>开户行</th>
              <th>开户名</th>
              <th>提现金额</th>
              <th>处理状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list">
              <!-- <td>
                <input type="checkbox" name="">
              </td> -->
              <td>
                {{item.serial_number}}
              </td>
              <td>{{item.created_at}}</td>
              <td>{{item.account}}</td>
              <td>{{item.subbranch}}</td>
              <td>{{item.account_name}}</td>
              <td>
                <span class="text-danger">￥{{item.money}}</span>
              </td>
              <td>
                <div v-for="s in status">
                  <span v-if="item.status == s.value" :class="{'text-danger': s.value == 2, 'text-success': s.value == 3}">{{s.name}}</span>
                </div>
              </td>
              <td>
                <withdraw-confirm :data="item" @confirm="doEdit"></withdraw-confirm>
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
      <!-- Loading -->
      <div class="padder-v" v-show="isLoading"><loading></loading></div>
      <!-- /Loading -->
    </div>
  </div>
</template>
<script>

import api from '@/api'
import { widthdrawStatus } from '@/config/options'
import { Loading } from '@/components'

import WithdrawConfirm from './withdraw-confirm'

export default {
  components: {
    Loading,
    WithdrawConfirm
  },
  data: () => ({
    page: 1,
    isLoading: false,
    status: widthdrawStatus,
    list: []
  }),
  methods: {
    initData () {
      this.getList()
    },
    onRouteChange () {
      this.getList()
    },
    getList () {
      this.list = null
      this.isLoading = true
      let params = {
        status: this.$route.query.status || undefined,
        page: this.page > 1 ? this.page : 1
      }
      this.axios.get(api.withdraw.list, {params: params})
      .then(response => {
        if (response.data.code === 200) {
          this.list = response.data.data
        }
        this.isLoading = false
      })
      .catch(error => {
        this.isLoading = false
        return Promise.reject(error)
      })
    },
    doEdit (item) {
      this.axios.post(api.withdraw.edit, {
        id: item.id,
        status: item.status,
        reject: item.reject
      })
      console.log(item)
    }
  },
  created () {
    this.initData()
  },
  watch: {
    '$route': 'onRouteChange',
    page (val) {
      if (val > 0) this.getList()
    }
  }
}
</script>
