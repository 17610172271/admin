<template>
  <div class="car-model">
    <div class="text-lg wrapper search-boxs">
      <div class="pull-left" style="margin-right:50px;">车型库管理</div>
      <div class="search-form pull-left search-box">
        <span>品牌搜索</span>
        <input type="text" class="form-input m-t-n-xs" placeholder="品牌搜索" v-model="brand_name">
      </div>
      <div class="search-form pull-left search-box">
        <span>车型搜索</span>
        <input type="text" class="form-input m-t-n-xs" placeholder="车型搜索"  v-model="rv_type_name">
      </div>
      <button class="pull-right" @click="open('addBrand')">新增</button>
      <button class="pull-right car-search" @click="searchList">搜索</button>
    </div>
    <ul class="select-options clear m-b-lg">
      <li v-for="(item,index) in rank" @click="doFilter(item)" :class="{'actives': ($route.query.key == item) && index!=0, 'actives-b': ($route.query.key == item) && index==0}" class="pull-left">{{item}}</li>
    </ul>
    <div class="car-model-content m-t-lg">
      <ul class="car-model-title clear">
        <li class="pull-left">品牌名称</li>
        <li class="pull-left">品牌logo</li>
        <li class="pull-left">操作</li>
      </ul>
      <div class="car-model-container1">
        <ul class="clear car-model-item" v-for="item in list">
          <li class="pull-left">{{item.brand_name}}</li>
          <li class="pull-left"><div class="car-model-logo"><img :src="(item.logo || img) | ossResize('small')" alt="logo"></div></li>
          <li class="pull-left">
            <router-link :to="{name: 'model_detail', params: {id: item.id}, query: {key: null}}" class="m-r-lg">查看详情</router-link>
            <a href="javascript:;" class="car-model-delet" @click="doDelBrand(item)">删除</a>
          </li>
        </ul>
        <div class="text-center m-t-lg m-b-lg">
          <pagination :max="max"></pagination>
        </div>
      </div>
    </div>
    <modal ref="addBrand">
      <div class="p-sm add-brand">
        <div class="m-b-sm text-bold text-muted">新增品牌</div>
        <div class="m-b-sm"><input type="text" width="100%" v-model="addBrandName"></div>
        <p>温馨提示：据说长得好看的人不会重复填写已有品牌</p>
        <div class="text-center m-t-lg dobind-btn">
          <button class="bg-muted m-r-md" @click="close('addBrand')">取消</button>
          <button class="bg-orange" @click="addBrand">确定</button>
        </div>
      </div>
    </modal>
    <modal ref="delBrand">
      <div class="p-sm add-brand">
        <p>您确定要删除【{{delItem.brand_name}}】品牌吗？</p>
        <div class="text-center m-t-lg dobind-btn">
          <button class="bg-muted m-r-md" @click="close('delBrand')">取消</button>
          <button class="bg-orange" @click="doDel">确定</button>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import api from '@/api'
// import { SwitchButton } from '@/components'
import {Pagination, Modal} from '@/components'
export default {
  data: () => ({
    rv_type_name: null,
    brand_name: null,
    addBrandName: '',
    delItem: {
      id: '',
      brand_name: '',
      logo: ''
    },
    img: 'https://img01.wanfangche.com/rv-brand-logo/none.png',
    page: 1,
    size: 10,
    max: null,
    list: [
      {
        id: 1,
        brand_name: '梅赛德斯·奔驰',
        logo: '111'
      },
      {
        id: 2,
        brand_name: '科威一',
        logo: '111'
      },
      {
        id: 3,
        brand_name: 'AM',
        logo: '111'
      }
    ],
    rank: ['全部', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  }),
  components: {
    Pagination,
    Modal
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.getData()
    },
    getData () {
      this.axios.get(api.certify.brand_list, {
        params: {
          rv_type_name: this.$route.query.rv_type_name,
          brand_name: this.$route.query.brand_name,
          initial: this.$route.query.key === '全部' ? null : this.$route.query.key,
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
    searchList () {
      this.$router.push({name: 'car_model', query: {key: '全部', page: 1, rv_type_name: this.rv_type_name, brand_name: this.brand_name}})
    },
    addBrand () {
      this.axios.post(api.certify.add_brand, {
        name: this.addBrandName
      })
      .then(response => {
        if (response.data.code === 200) {
          this.$refs.addBrand.close()
          this.addBrandName = ''
          this.getData()
        }
      })
    },
    doDelBrand (item) {
      this.delItem = item
      this.open('delBrand')
    },
    doDel () {
      this.axios.post(api.certify.del_brand, {
        id: this.delItem.id
      })
      .then(response => {
        if (response.data.code === 200) {
          this.close('delBrand')
          this.delItem = {}
          this.getData()
        }
      })
    },
    open (target) {
      this.$refs[target].open()
    },
    close (target) {
      this.$refs[target].close()
    },
    doFilter (item) {
      this.$router.push({name: 'car_model', query: {key: item}})
    }
  },
  watch: {
    '$route': 'getData'
  }
}
</script>
