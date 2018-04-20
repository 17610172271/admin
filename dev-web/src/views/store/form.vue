<template>
  <div class="form padder">
    <div class="form-group">
      <label>店铺名称：</label>
      <input type="text" name="" v-model="formData.name" class="form-input">
    </div>
    <div class="form-group">
      <label>营业时间：</label>
      <time-picker v-model="formData.open_at"></time-picker>
      <span class="padder text-muted m-r">至</span>
      <time-picker v-model="formData.close_at"></time-picker>

    </div>
    <div class="form-group">
      <label>门店电话：</label>
      <input type="text" name="" v-model="formData.phone_number" class="form-input w-md">
    </div>
    <div class="form-group">
      <label>门店地址：</label>
      <div class="padder-v">
        <city-picker v-model="cityPickerValue" @change="onAddressChange"></city-picker>
      </div>
      <input type="text" name="" v-model="formData.address" class="form-input" placeholder="街道/门牌号" @change="onAddressChange">
      <div class="padder-v">
        <b-map :center="center" :marker="marker" :search="searchKey" @ready="onMapReady" v-model="mapValue">
        </b-map>
      </div>
    </div>

    <div class="text-lg padder-v">
      增值服务
    </div>

    <div class="form-group">
      <label class="pickcar"><input class="backcar" type="checkbox" v-model="formData.pickup_the_car">上门取车：</label>
      <a class="add-serve" @click="addpickrules()">+ 添加规则 </a>
    </div>
    <div class="rules">
      <div class="form-group" v-for="(item,index) in formData.pickrules">
        <span class="text-muted m-l-lg fee">费用:</span>
        <input type="text" name="" v-model="item.price" class="form-input w-sm"> 元
        <input type="text" name="" v-model="item.description" class="form-input w-md rmb" placeholder="描述：如6环以内">
        <span class="cancel icon wfc-icon-minus" @click.stop="cancelpick(index)" v-if="formData.pickrules.length > 1"></span>
      </div>
    </div>

    <div class="form-group">
      <label class="pickcar"><input class="backcar" type="checkbox" v-model="formData.return_the_car">上门还车：</label>
      <a class="add-serve" @click="addbackrules()">+ 添加规则</a>
    </div>
    <div class="rules">
      <div class="form-group" v-for="(item,index) in formData.backrules">
        <span class="text-muted m-l-lg fee">费用:</span>
        <input type="text" name="" v-model="item.price" class="form-input w-sm"> 元
        <input type="text" name="" v-model="item.description" class="form-input w-md rmb" placeholder="描述：如6环以内">
        <span class="cancel icon wfc-icon-minus" @click.stop="cancelback(index)" v-if="formData.backrules.length > 1"></span>
      </div>
    </div>

    <div class="form-group">
      <label class="pickcar"><input class="backcar" type="checkbox" v-model="formData.butler_service">房车管家(代驾)服务：</label>
    </div>
    <div class="form-group">
      <span class="text-muted m-l-lg fee">费用:</span>
      <input type="text" name="" v-model="formData.extra_service[0].price" class="form-input w-sm"> 元/天
      <input type="text" name="" v-model="formData.extra_service[0].description" class="form-input w-md description" placeholder="描述：如6环以内">
    </div>

    <!-- <div class="form-group">
      <label class="pickcar"><input class="backcar" type="checkbox" v-model="formData.outdoor_tables_chairs">户外露营桌椅：</label>
    </div>
    <div class="form-group">
      <span class="text-muted m-l-lg fee">费用:</span>
      <input type="text" name="" v-model="formData.extra_service[1].price" class="form-input w-sm"> 元/天
      <input type="text" name="" v-model="formData.extra_service[1].description" class="form-input w-md description" placeholder="描述：如6环以内">
    </div> -->
    <div class="form-group">
      <label class="pickcar"><input class="backcar" type="checkbox" v-model="formData.outdoor_tables_chairs">其他服务：</label>
      <a class="add-serve" @click="addotherrules()">+ 添加规则</a>
    </div>
    <div class="rules" v-if="others.length > 0">
      <div class="other-title">
        <div class="description">商品名称</div>
        <div class="price">价格</div>
        <div class="isday">是否按天</div>
        <div class="isnum">是否按数</div>
      </div>
      <div class="form-group" v-for="(item,index) in formData.goods">
        <input type="text" name="" v-model="item.goods_name" class="form-input w-md description" placeholder="商品名称">
        <input type="text" name="" v-model="item.price" class="form-input w-sm price" placeholder="费用"> 元
        <input type="checkbox" class="checkbox" v-model="others[index].is_day">
        <input type="checkbox" class="checkbox" v-model="others[index].is_num">
        <span class="cancel icon wfc-icon-minus" @click.stop="cancelother(index)" v-if="formData.otherrules.length > 1"></span>
      </div>
    </div>
    <input type="hidden" name="" v-model="currentValue">

  </div>
</template>

<script>
import { TimePicker, CityPicker } from '@/components'
import {BMap} from '@/components/baidu-map'
import { isJson } from '@/tools/util'

export default {
  components: {
    TimePicker,
    CityPicker,
    BMap
  },
  props: {
    value: ''
  },
  data () {
    return {
      formData: {
        id: '',
        name: '',
        open_at: '09:00',
        close_at: '20:00',
        province: '北京',
        provinceid: '',
        cityid: '',
        city: '',
        areaid: '',
        area: '',
        address: '',
        lng: '',
        lat: '',
        full_gas_return: 0,
        return_unexpected: 1,
        return_fee: 1,
        return_fee_description: '',
        driver_lisence_necessary: 1,
        driver_id: 1,
        driver_credit_card: 1,
        licence_expire_limit: 1,
        licence_expire_in: 1,
        other_info: '',
        notice: '111',
        d2d_description: '',
        door2door: '0',
        child_seats_price: 0.00,
        d2d_price: '',
        phone_number: '',
        butler_service: '',
        pickup_the_car: '',
        return_the_car: '',
        outdoor_tables_chairs: '',
        pickrules: [{type: 2, price: '', description: ''}],
        backrules: [{type: 3, price: '', description: ''}],
        otherrules: [{type: 5, price: '', description: ''}],
        extra_service: [{type: 4, price: '', description: ''}],
        goods: []
      },
      other_info: '',
      cityPickerValue: {},
      center: {lng: 116.404, lat: 39.915},
      marker: {lng: 116.404, lat: 39.915},
      mapValue: null,
      searchKey: null,
      pick_disabled: false,
      back_disabled: false,
      driver_disabled: false,
      table_disabled: false,
      others: []
    }
  },
  computed: {
    currentValue () {
      if (this.others) {
        for (let i = 0; i < this.others.length; i++) {
          if (this.others[i].is_num === true) {
            this.formData.goods[i].is_num = '1'
          } else {
            this.formData.goods[i].is_num = '0'
          }
          if (this.others[i].is_day === true) {
            this.formData.goods[i].is_day = '1'
          } else {
            this.formData.goods[i].is_day = '0'
          }
        }
      }
      // 当前表单的值用 JSON string 的形式存储
      return JSON.stringify(this.formData)
    }
  },
  created () {
    this.initData(this.value)
    this.formData.pickup_the_car = !!parseInt(this.formData.pickup_the_car)
    this.formData.return_the_car = !!parseInt(this.formData.return_the_car)
    this.formData.butler_service = !!parseInt(this.formData.butler_service)
    this.formData.outdoor_tables_chairs = !!parseInt(this.formData.outdoor_tables_chairs)
  },
  methods: {
    initData (val) {
      // 接收 json string 格式的数据，把数据合并到当前form表单
      // 这样处理，this.formData将会保持原来的格式
      if (val && isJson(val)) {
        var tempVal = JSON.parse(val)
        for (var k in tempVal) {
          if (tempVal[k]) this.formData[k] = tempVal[k]
        }
        if (this.formData.goods.length > 0) {
          for (let i = 0; i < this.formData.goods.length; i++) {
            if (this.formData.goods[i].is_num === '1') {
              this.others.push({is_num: true, is_day: false})
            } else {
              this.others.push({is_num: false, is_day: false})
            }
            if (this.formData.goods[i].is_day === '1') {
              this.others[i].is_day = true
            } else {
              this.others[i].is_day = false
            }
          }
        } else {
          this.formData.goods = []
        }
        this.initCityPickerValue()
      }
    },
    initCityPickerValue () {
      // 初始化 城市选择组件
      this.cityPickerValue = {
        provinceid: this.formData.provinceid,
        province: this.formData.province,
        cityid: this.formData.cityid,
        city: this.formData.city,
        areaid: this.formData.areaid,
        area: this.formData.area
      }
    },
    onCityPickerChange (val) {
      // 将省份信息合并到 formData
      for (var k in val) {
        this.formData[k] = val[k]
      }
    },
    onMapReady ({BMap, map}) {
      this.map = map
      this.BMap = BMap
      this.center = {lat: this.formData.lat, lng: this.formData.lng}
      this.marker = {lat: this.formData.lat, lng: this.formData.lng}
    },
    onAddressChange () {
      this.searchKey = this.formData.province + this.formData.city + this.formData.area + this.formData.address
    },
    addpickrules () {
      this.formData.pickrules.push({type: 2, price: '', description: ''})
    },
    addbackrules () {
      this.formData.backrules.push({type: 3, price: '', description: ''})
    },
    addotherrules () {
      this.formData.goods.push({goods_name: '', price: '', description: '', is_day: '0', is_num: '0'})
      this.others.push({is_num: false, is_day: false})
    },
    cancelpick (index) {
      this.formData.pickrules.splice(index, 1)
    },
    cancelback (index) {
      this.formData.backrules.splice(index, 1)
    },
    cancelother (index) {
      this.formData.goods.splice(index, 1)
      this.others.splice(index, 1)
    }
  },
  watch: {
    value (val, old) {
      // if (this.currentValue !== this.value) this.initData(this.value)
    },
    // 监控城市选择器变化
    cityPickerValue (val) {
      this.onCityPickerChange(val)
    },
    currentValue (val) {
      this.$emit('input', val)
    },
    mapValue (val) {
      this.formData.lat = val.lat
      this.formData.lng = val.lng
    }
  }
}
</script>
<style scoped>
  .pickcar {
    line-height: 23px;
    display: inline-block;
    position: relative;
    padding-left: 20px;
  }
  .backcar {
    width: 15px;
    height: 15px;
    position: absolute;
    top: 2px;
    left: 0px;
  }
  .btn {
    margin-left: 150px;
  }
  .add-serve {
    display: inline-block;
    margin-left: 410px;
  }
  
  .form-group {
    position: relative;
  }
  .cancel {
    position: absolute;
    right: 160px;
    top: 9px;
    font-size: 14px;
    background-color: #fc852e;
    border-radius: 50%;
    padding: 2px;
    cursor: pointer;
  }
  .cancel:before {
    color: #fff;

  }
  .form-input.w-md {
    width: 334px;
  }
  .rmb {
    margin-left: 16px;
  }
  .fee {
    margin-right: 8px;
  }
  .rules .price {
    width: 80px;
  }
  .checkbox {
    margin-left: 60px;
    display: inline-block;
    width: 15px;
    height: 15px;
  }
  .other-title {
    height: 36px;
  }
  .other-title>div {
    display: inline-block;
    line-height: 36px;
    height: 36px;
    text-align: center;
    color: #C8D1DC;
  }
  .isday {
    margin-left: 42px;
    width: 75px;
  }
  .isnum {
    width: 75px;
  }
  .rules .description {
    margin-left: 16px;
    margin-right: 20px;
    width: 250px;
  }
</style>
