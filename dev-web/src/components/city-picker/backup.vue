<template>
  <div class="city-picker">
    <select class="form-select" name=""v-model="currentProvince" @change="onProvinceChange">
      <option :value="index" v-for="(province, index) in provinceList">{{province.province}}</option>
    </select>
    <select class="form-select" name="" v-model="currentCity" @change="onCityChange">
      <option :value="index" v-for="(city, index) in cityList">{{city.city}}</option>
    </select>
    <select class="form-select" name="" v-model="currentArea">
      <option :value="index" v-for="(area, index) in areaList">{{area.area}}</option>
    </select>
  </div>
</template>
<script>
import city from '@/api/city'

export default {
  name: 'city-picker',
  props: {
    name: String,
    value: {
      type: Object,
      default () {
        return {
          province: '',
          provinceid: '',
          city: '',
          cityid: '',
          area: '',
          areaid: ''
        }
      }
    }
  },
  data () {
    return {
      provinceList: [],
      cityList: [],
      areaList: [],
      currentValue: this.value,
      currentProvince: 0,
      currentCity: 0,
      currentArea: 0
    }
  },
  methods: {
    getCurrentValue () {
      return {
        province: this.provinceList[this.currentProvince].province,
        provinceid: this.provinceList[this.currentProvince].provinceid,
        city: this.cityList[this.currentCity].city,
        cityid: this.cityList[this.currentCity].cityid,
        area: this.areaList[this.currentArea].area,
        areaid: this.areaList[this.currentArea].areaid
      }
    },
    getCurrentProvince (provinceList) {
      // var idx = 1
      console.log(this.currentValue)
      console.log(provinceList)
      var p = {
        province: this.currentValue.province,
        provinceid: this.currentValue.provinceid
      }
      console.log(p)
      var idx = provinceList.indexOf(p)
      // this.provinceList.indexOf({
      //   province: this.currentValue.province,
      //   provinceid: this.currentValue.provinceid
      // })
      console.log(idx)
      return idx
    },
    initProvinceList () {
      this.getProvinceList()
      // this.getCityList(this.currentProvince)
      // this.getAreaList(this.currentCity)
    },
    onProvinceChange () {
    },
    onCityChange () {
    },
    getProvinceList () {
      return city.getProvince(response => {
        this.provinceList = response.data.data
        // console.log(this.provinceList)
        this.currentProvince = this.getCurrentProvince(this.provinceList)
      }, err => {
        console.log(err)
      })
    },
    getCityList (idx) {
      // console.log(this.provinceList[idx])
      var id = this.provinceList[idx].provinceid
      return city.getCity({ provinceid: id }, response => {
        this.cityList = response.data.data
        if (this.currentCity === undefined) this.currentCity = 0
      }, err => {
        console.log(err)
      })
    },
    getAreaList (idx) {
      var id = this.cityList[idx].cityid
      return city.getArea({ cityid: id }, response => {
        this.areaList = response.data.data
        if (this.currentArea === undefined) this.currentArea = 0
      }, err => {
        console.log(err)
      })
    }
  },
  created () {
    // do something after creating vue instance
    this.initProvinceList()
  },
  watch: {
    currentProvince (val) {
      // console.log('province changed')
      this.currentCity = undefined
      this.getCityList(val)
    },
    currentCity (val) {
      // console.log('city changed')
      // console.log(val)
      this.currentArea = undefined
      if (val !== undefined) this.getAreaList(val)
    },
    currentArea (val) {
      // console.log('area changed')
      // console.log(val)
      if (val !== undefined) this.$emit('input', this.getCurrentValue())
    }
  }
}
</script>
<style lang="scss">
.city-picker select{
  min-width: 180px;
}
</style>
