<template>
  <div>
    <div class="wrapper">
      <table class="table table-sm">
        <tbody>
          <tr>
            <td>商家</td>
            <td>
              <div class="text-lg">{{item.company_name}}</div>
            </td>
          </tr>
          <tr>
            <td>地址</td>
            <td>
              <div class="text-muted m-t-xs">{{item.address}}</div>
            </td>
          </tr>
          <tr>
            <td>联系人</td>
            <td>
              <div class="m-r">{{item.name}}</div>
            </td>
          </tr>
          <tr>
            <td>电话</td>
            <td>
              <div class="m-r">{{item.telephone}}</div>
            </td>
          </tr>
          <tr>
            <td>邮箱</td>
            <td>
              <div class="m-r">{{item.email}}</div>
            </td>
          </tr>
          <tr>
            <td>车辆</td>
            <td>
              <table class="table">
                <thead>
                  <tr class="text-muted">
                    <th>车型</th>
                    <th>数量</th>
                    <th>工作日价格 <span></span></th>
                    <th>节假日价格 <span></span></th>
                  </tr>
                </thead>
                <tbody v-if="item.rv_info">
                  <tr v-for="rv in rvInfo">
                    <td>{{rv.type}}</td>
                    <td>{{rv.number}}</td>
                    <td>{{rv.fee1}}</td>
                    <td>{{rv.fee2}}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td>开通城市</td>
            <td>
              <label class="label label-success" v-for="city in pickupInfo">{{city}}</label>
            </td>
          </tr>
          <tr>
            <td>创建时间</td>
            <td>{{item.created_at}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import api from '@/api'
import {isJson} from '@/tools/util'

const str2obj = str => {
  return JSON.parse(str)
}
export default {
  filters: {
    str2obj: str2obj
  },
  data: () => ({
    item: {
      pickup_info: null,
      rv_info: null
    }
  }),
  created () {
    this.$nextTick(() => {
      this.getDetail()
    })
  },
  computed: {
    rvInfo () {
      return this.item.rv_info && isJson(this.item.rv_info) ? JSON.parse(this.item.rv_info) : []
    },
    pickupInfo () {
      return this.item.pickup_info && isJson(this.item.pickup_info) ? JSON.parse(this.item.pickup_info) : []
    }
  },
  methods: {
    getDetail () {
      this.axios.get(api.gather.detail, {params: {id: this.$route.params.id}})
      .then(response => {
        if (response.data.code === 200) {
          this.item = response.data.data
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
