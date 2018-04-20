<template>
  <div class="car-certify car-model">
    <div class="text-lg wrapper search-boxs m-b-lg">
      <div class="pull-left" style="margin-right:50px;">爱车认证管理</div>
      <div class="search-form pull-left search-box">
        <span>昵称搜索</span>
        <input type="text" class="form-input m-t-n-xs" placeholder="昵称搜索" v-model="car_nickname">
      </div>
      <div class="search-form pull-left search-box">
        <span>手机号</span>
        <input type="text" class="form-input m-t-n-xs" placeholder="手机号"  v-model="car_tel">
      </div>
      <button class="pull-right car-search" @click="getData">搜索</button>
    </div>
    <div class="car-certify-content">
      <ul class="car-certify-title clear">
        <li class="pull-left">用户昵称</li>
        <li class="pull-left">手机号</li>
        <li class="pull-left">车辆品牌</li>
        <li class="pull-left">车型</li>
        <li class="pull-left">申请时间</li>
        <li class="pull-left">审核状态</li>
        <li class="pull-left">操作</li>
      </ul>
      <div class="car-model-container">
        <ul class="clear car-certify-item" v-for="item in list">
          <li class="pull-left over-omit">{{item.nickname}}</li>
          <li class="pull-left">{{item.tel}}</li>
          <li class="pull-left over-omit">{{item.brand_name}}</li>
          <li class="pull-left over-omit">{{item.rv_type_name}}</li>
          <li class="pull-left">{{item.created_at}}</li>
          <li class="pull-left" :class="{'text-danger': item.status==2, 'text-info': item.status==1, 'text-muted': item.status==0}">{{item.status | status}}</li>
          <li class="pull-left">
            <router-link :to="{name: 'certify_detail', params: {id: item.id}}" class="m-r-lg">详情</router-link>
            <a href="javascript:;" class="car-model-delet" @click="doDelCertify(item)">删除</a>
          </li>
        </ul>
        <div class="text-center m-t-lg m-b-lg">
          <pagination></pagination>
        </div>
      </div>
    </div>
    <modal ref="delCertify">
      <div class="p-sm add-brand">
        <p>您确定要删除该条认证吗？</p>
        <div class="text-center m-t-lg dobind-btn">
          <button class="bg-muted m-r-md" @click="close('delCertify')">取消</button>
          <button class="bg-orange" @click="doDel">确定</button>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import api from '@/api'
// import { SwitchButton } from '@/components'
import { Pagination, Modal } from '@/components'
export default {
  data: () => ({
    car_nickname: '',
    car_tel: '',
    list: [],
    page: 1,
    size: 10,
    type: null,
    max: null,
    delItem: {}
  }),
  components: {
    Pagination,
    Modal
  },
  filters: {
    status (val) {
      return val === '0' ? '待审核' : (val === '1' ? '已通过' : '已驳回')
    }
  },
  methods: {
    initData () {
      this.getData()
    },
    getData () {
      this.axios.get(api.certify.certify_list, {
        params: {
          nickname: this.car_nickname || null,
          tel: this.car_tel || null,
          type: this.type || null,
          page: this.$route.query.page || this.page,
          size: this.size
        }
      })
      .then(response => {
        if (response.data.code === 200) {
          this.max = Math.ceil(response.data.data.count / 10)
          this.list = response.data.data.list
        } else {
          this.list = []
        }
      })
    },
    doDelCertify (item) {
      this.delItem = item
      this.open('delCertify')
    },
    doDel () {
      this.axios.post(api.certify.certify_del, {
        id: this.delItem.id
      })
      .then(response => {
        if (response.data.code === 200) {
          this.getData()
          this.close('delCertify')
          this.delItem = {}
        }
      })
    },
    open (target) {
      this.$refs[target].open()
    },
    close (target) {
      this.$refs[target].close()
    }
  },
  created () {
    this.initData()
  },
  watch: {
    '$route': 'getData'
  }
}
</script>
