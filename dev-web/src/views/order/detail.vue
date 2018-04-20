<template>
  <div>
    <alert ref="alert"></alert>
    <div class="wrapper b-b">
      <div class="pull-right m-t-n-xs">
        <select class="form-select" name="" v-model="data.status" @change="onStatusChange">
          <option value="" disabled>更改订单状态</option>
          <option :value="status.value" v-for="status in orderStatus">{{status.name}}</option>
        </select>
      </div>
      <span class="text-lg">订单详情 {{data.code}}</span>
      <span v-if="data.status == status.value" v-for="status in orderStatus" :class="status.class" class="m-l">{{status.full_name}}</span>
    </div>
    <div class="wrapper">
      <div class="btn-group">
        <router-link class="btn btn-orange" :to="{name: 'rv_detail', params: {id: data.rv_id}}">车辆详情</router-link>
        <router-link class="btn btn-orange" :to="{name: 'user_detail', params: {id: data.user_id}}">用户详情</router-link>
        <router-link class="btn btn-orange" :to="{name: 'driver_detail', params: {id: data.driver_id}}">驾驶员详情</router-link>
        <router-link class="btn btn-orange" :to="{name: 'agency_detail', params: {id: data.agency_id}}">商家详情</router-link>
      </div>
      <table class="table table-bordered m-t">
        <tbody>
          <tr>
            <td class="w-md">订单ID</td>
            <td>{{data.order_id}}</td>
          </tr>
          <tr>
            <td class="w-md">车ID</td>
            <td>{{data.rv_id}}</td>
          </tr>
          <tr>
            <td class="w-md">车标题</td>
            <td>{{data.title}}</td>
          </tr>
          <tr>
            <td class="w-md">车图片</td>
            <td>
            <a :href="data.img_cover" target="_blank">
              <img :src="data.img_cover" alt="" class="w-lg">
            </a>
            </td>
          </tr>
          <tr>
            <td class="w-md">变速器</td>
            <td>{{data.transmission_case}}</td>
          </tr>
          <tr>
            <td class="w-md">燃油</td>
            <td>{{data.actuation}}</td>
          </tr>
          <tr>
            <td class="w-md">国内驾照</td>
            <td>{{data.driver_license_class}}</td>
          </tr>
          <tr>
            <td class="w-md">品牌名</td>
            <td>{{data.brand_name}}</td>
          </tr>
          <tr>
            <td class="w-md">可乘坐人数-成人</td>
            <td>{{data.adult_passengers}}</td>
          </tr>
          <tr>
            <td class="w-md">取车时间</td>
            <td>{{data.pickup_time}}</td>
          </tr>
          <tr>
            <td class="w-md">取车店名</td>
            <td>{{data.pickup_store_name}}</td>
          </tr>
          <tr>
            <td class="w-md">取车城市</td>
            <td>{{data.pickup_store_city}}</td>
          </tr>
          <tr>
            <td class="w-md">取车经度</td>
            <td>{{data.pickup_store_lng}}</td>
          </tr>
          <tr>
            <td class="w-md">取车纬度</td>
            <td>{{data.pickup_store_lat}}</td>
          </tr>
          <tr>
            <td class="w-md">还车时间</td>
            <td>{{data.return_time}}</td>
          </tr>
          <tr>
            <td class="w-md">还车店名</td>
            <td>{{data.return_store_name}}</td>
          </tr>
          <tr>
            <td class="w-md">还车城市</td>
            <td>{{data.return_store_city}}</td>
          </tr>
          <tr>
            <td class="w-md">还车经度</td>
            <td>{{data.return_store_lng}}</td>
          </tr>
          <tr>
            <td class="w-md">还车纬度</td>
            <td>{{data.return_store_lat}}</td>
          </tr>
          <tr>
            <td class="w-md">用户ID</td>
            <td>{{data.user_id}}</td>
          </tr>

        </tbody>
      </table>
    </div>

  </div>
</template>
<script>
import api from '@/api'
import options from '@/config/options'
import {Alert} from '@/components'

export default {
  components: {
    Alert
  },
  data: () => ({
    orderStatus: options.orderStatus,
    data: {
      rv_id: null,
      user_id: null,
      driver_id: null,
      agency_id: null
    }
  }),
  created () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      this.axios.get(api.order.detail, {params: {id: this.$route.params.id}})
      .then(response => {
        if (response.data.code === 200) {
          this.data = response.data.data || {}
        }
      })
    },
    onStatusChange () {
      console.log(this.data.status)
      this.axios.post(api.order.editStatus, {
        id: this.data.id,
        status: this.data.status
      }).then(response => {
        if (response.data.code === 200) {
          this.$refs['alert'].show('修改成功', {type: 'success'})
        } else {
          this.$refs['alert'].show(response.msg)
        }
      })
    }
  }

}

</script>
