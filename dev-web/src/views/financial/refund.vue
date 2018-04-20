<template>
  <div>
    <div class="b-b text-lg wrapper">
      <div class="search-form pull-right">
        <button class="btn btn-default" @click="searchOpen = !searchOpen"><i class="fa fa-search"></i> 搜索</button>
      </div>
      退款管理
    </div>
    <div class="b-b wrapper" v-show="searchOpen">
        <table class="table table-sm no-borders">
          <tbody>
            <tr>
              <td class="w-xs">申请时间：</td>
              <td>
                <div class="input-group w-lg">
                  <input type="text" class="form-input">
                  <span class="input-group-addon">至</span>
                  <input type="text" class="form-input">
                </div>
              </td>
            </tr>
            <tr>
              <td>订单编号：</td>
              <td><input type="text" class="form-input" v-model="query.order_code"></td>
            </tr>
            <tr>
              <td>支付方式：</td>
              <td>
                <div class="check-box-group">
                  <label>
                    <input type="radio" v-model="query.order_payType" value="0"> 全部
                  </label>
                  <label>
                    <input type="radio" v-model="query.order_payType" value="1"> 微信
                  </label>
                  <label>
                    <input type="radio"  v-model="query.order_payType" value="2"> 支付宝
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button class="btn btn-orange w-sm" @click="doSearch">查询</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    <div class="wrapper">
      <div class="clear">
        <ul class="nav nav-custom no-radius b-b">
          <li><router-link :to="{ name: 'refund'}">全部</router-link></li>
          <li v-for="link in status">
            <router-link :to="{ name: 'refund', query: { status: link.value}}">{{link.name}}</router-link>
          </li>
        </ul>
      </div>
      
      <div class="">
        
        <table class="table table-sm" v-if="list && !isLoading">
          <thead>
            <tr>
              <th>申请时间</th>
              <th>订单编号</th>
              <th class="text-right">订单金额</th>
              <th class="text-right">应退金额</th>
              <th class="text-center">支付方式</th>
              <th>退款原因</th>
              <th>状态</th>
              <th class="w-xs">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list">
              <td>{{item.cancel_time | time2date}}</td>
              <td>{{item.code}}</td>
              <td class="text-right">￥{{item.fee_total}}</td>
              <td class="text-success text-right">￥{{item.refund_money}}</td>
              <td class="text-center">
                <div v-for="type in payType">
                  <span v-if="item.pay_type == type.value">{{type.name}}</span>
                </div>
              </td>
              <td>
                {{item.refund_reason}}
              </td>
              <td>
                <div v-for="s in status">
                  <span v-if="item.refund_status == s.value" :class="s.class">{{s.name}}</span>
                </div>
              </td>
              <td>
                <refund-confirm :data="item" @confirm="doEdit"></refund-confirm>
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

// 退款状态
const status = [
  {value: 1, name: '待退款', class: ''},
  {value: 2, name: '退款失败', class: 'text-danger'},
  {value: 3, name: '已退款', class: 'text-muted'}
]

// 支付方式
const payType = [
  {value: 1, name: '微信'},
  {value: 2, name: '支付宝'}
]

import RefundConfirm from './refund-confirm'
import api from '@/api'
import {Loading} from '@/components'
import { time2date } from '@/filters'

export default {
  components: {
    RefundConfirm,
    Loading
  },
  filters: {
    time2date
  },
  data: () => ({
    isLoading: true,
    searchOpen: false,
    list: null,
    status: status,
    payType: payType,
    page: 1,
    query: {
      sDate: null,
      eDate: null,
      order_code: null,
      order_payType: 0
    }
  }),
  methods: {
    initData () {
      this.getList()
    },

    getList () {
      let params = {
        stime: this.query.sDate || undefined,
        etime: this.query.eDate || undefined,
        code: this.query.order_code || undefined,
        pay_type: this.query.order_payType > 0 ? this.query.order_payType : undefined,
        refund_status: this.$route.query.status || undefined,
        page: this.page > 1 ? this.page : 1
      }

      this.isLoading = true
      this.axios.get(api.refund.list, {params: params})
      .then(response => {
        this.isLoading = false
        if (response.data.code === 200) {
          this.list = response.data.data.list
        }
      })
      .catch(error => {
        this.isLoading = false
        return Promise.reject(error)
      })
    },

    doEdit (item) {
      item.refund_status = 3
      this.axios.post(api.refund.edit, {
        id: item.id,
        refund_status: 3,
        refund_reason: item.refund_reason
      })
    },

    doSearch () {
      this.getList()
    },

    onRouteChange () {
      this.getList()
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
