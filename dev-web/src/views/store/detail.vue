<template>
  <div>
    <alert ref="alert"></alert>
  <div class="wrapper b-b">
    <div class="pull-right m-t-n-xs">
      <div class="btn-group">
        <router-link :to="{name: 'store_edit'}" class="btn btn-default">
          <i class="icon icon-note"></i>
          编辑</router-link>
        <a @click="open('delete')" class="btn btn-default">
          <i class="icon icon-trash"></i>
          删除</a>
        <a class="btn btn-default" @click="doClose">
          <i class="icon icon-power"></i>
          关闭</a>
      </div>
      <modal ref="delete">
        <div class="text-center text-lg padder-v">
          确定要删除？
        </div>
        <div class="text-center padder-v">
          <a class="btn btn-md btn-orange m-r" @click="doDelete">确定</a>
          <a class="btn btn-md btn-bordered" @click="close('delete')">取消</a>
        </div>
      </modal>
    </div>
    <div>
      <span class="text-lg">店铺详情</span>
    </div>
  </div>
  <div class="wrapper">
    <table class="table table-bordered">
      <tbody>
        <tr>
          <td class="w-md">开始时间</td>
          <td>{{data.open_at}}</td>
        </tr>
        <tr>
          <td class="w-md">结束时间</td>
          <td>{{data.close_at}}</td>
        </tr>
        <tr>
          <td class="w-md">省id</td>
          <td>{{data.provinceid}}</td>
        </tr>
        <tr>
          <td class="w-md">省</td>
          <td>{{data.province}}</td>
        </tr>
        <tr>
          <td class="w-md">市id</td>
          <td>{{data.cityid}}</td>
        </tr>
        <tr>
          <td class="w-md">市</td>
          <td>{{data.city}}</td>
        </tr>
        <tr>
          <td class="w-md">区域id</td>
          <td>{{data.areaid}}</td>
        </tr>
        <tr>
          <td class="w-md">区域</td>
          <td>{{data.area}}</td>
        </tr>
                <tr>
          <td class="w-md">地址</td>
          <td>{{data.address}}</td>
        </tr>
        <tr>
          <td class="w-md">经度</td>
          <td>{{data.lng}}</td>
        </tr>
        <tr>
          <td class="w-md">纬度</td>
          <td>{{data.lat}}</td>
        </tr>
        <tr>
          <td class="w-md">是否上门取车</td>
          <td>{{data.pickup_the_car | switchTitle(0)}}</td>
        </tr>
        <tr>
          <td class="w-md">上门取车规则</td>
          <td><div v-for="item in pick_rules">费用：{{item.price}}元&nbsp;描述：{{item.description}}</div></td>
        </tr>
        <tr>
          <td class="w-md">是否上门还车</td>
          <td>{{data.return_the_car | switchTitle(0)}}</td>
        </tr>
        <tr>
          <td class="w-md">上门还车规则</td>
          <td><div v-for="item in return_rules">费用：{{item.price}}元&nbsp;描述：{{item.description}}</div></td>
        </tr>
        <tr>
          <td class="w-md">是否使用房车管家(代驾)服务</td>
          <td>{{data.butler_service | switchTitle(0)}}</td>
        </tr>
        <tr>
          <td class="w-md">房车管家(代驾)服务规则</td>
          <td>费用：{{butler_service.price}}&nbsp;描述：{{butler_service.description}}</td>
        </tr>
        <tr>
          <td class="w-md">是否使用户外露营桌椅</td>
          <td>{{data.outdoor_tables_chairs | switchTitle(0)}}</td>
        </tr>
        <tr>
          <td class="w-md">户外露营桌椅使用规则</td>
          <td><div v-for="item in outdoor_tables">费用：{{item.price}}&nbsp;描述：{{item.description}}</div></td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>
<script>
import api from '@/api'
import {Modal, Alert} from '@/components'
const switchTitle = (str, type = 1) => {
  return parseInt(str) === 1 ? (type === 1 ? '有' : '是') : (type === 1 ? '无' : '否')
}

export default {
  components: {
    Modal,
    Alert
  },
  filters: {
    switchTitle
  },
  data: () => ({
    data: {},
    pick_rules: [],
    return_rules: [],
    butler_service: {},
    outdoor_tables: []
  }),
  methods: {
    doDelete () {
      console.log('delete')
    },
    open (target) {
      this.$refs[target].open()
    },
    close (target) {
      this.$refs[target].close()
    },
    doClose () {
      this.$router.go(-1)
    },
    getDetail () {
      this.axios.get(api.store.find, {params: {id: this.$route.params.id}})
      .then(response => {
        if (response.data.code === 200) {
          this.data = response.data.data || {}
          if (this.data.extra_service) {
            for (let item of this.data.extra_service) {
              if (item.type === '2') {
                this.pick_rules.push(item)
              } else if (item.type === '3') {
                this.return_rules.push(item)
              } else if (item.type === '4') {
                this.butler_service = item
              } else {
                this.outdoor_tables.push(item)
              }
            }
          }
        }
      })
    }
  },
  created () {
    this.getDetail()
  }
}
</script>
