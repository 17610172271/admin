<template>
  <div class="city-picker">
    <select class="form-select" v-model="currentProvince" @change="onProvinceChange">
      <option disabled value="">选择省份</option>
      <option :value="province | object2String" v-for="province in provinceList">
        {{province.province}}
      </option>
    </select>
    <select class="form-select" v-model="currentCity" @change="onCityChange">
      <option disabled value="">选择城市</option>
      <option :value="city | object2String" v-for="city in cityList">{{city.city}}</option>
    </select>
    <select class="form-select" v-model="currentArea" @change="onAreaChange">
      <option disabled value="">选择县/区</option>
      <option :value="area | object2String" v-for="area in areaList">
        {{area.area}}
      </option>
    </select>
  </div>
</template>
<script>
import api from '@/api'

const object2String = obj => {
  return JSON.stringify(obj)
}

const string2Object = str => {
  return JSON.parse(str)
}

export default {
  name: 'city-picker',
  filters: {
    object2String,
    string2Object
  },
  props: {
    value: ''
  },
  data () {
    return {
      provinceList: [],
      cityList: [],
      areaList: [],
      currentValue: '',
      currentProvince: JSON.stringify({}),
      currentCity: JSON.stringify({}),
      currentArea: JSON.stringify({})
    }
  },
  methods: {
    init (val) {
      this.currentValue = val
      this.onValueChange(this.currentValue)
    },
    getCurrentValue () {
      return {
        ...string2Object(this.currentProvince),
        ...string2Object(this.currentCity),
        ...string2Object(this.currentArea)
      }
    },
    getProvinceList () {
      this.axios.get(api.common.province)
      .then(response => {
        this.provinceList = response.data.data
      })
      .catch(error => {
        return Promise.reject(error)
      })
    },
    onValueChange (val) {
      this.axios.get(api.common.province)
      .then(response => {
        this.provinceList = response.data.data
        this.currentProvince = JSON.stringify({
          provinceid: val.provinceid,
          province: val.province
        })
      })
      this.axios.get(api.common.city, {params: { provinceid: val.provinceid }})
      .then(response => {
        this.cityList = response.data.data
        this.currentCity = JSON.stringify({
          cityid: val.cityid,
          city: val.city
        })
        this.axios.get(api.common.area, {params: { cityid: val.cityid }})
        .then(response => {
          this.areaList = response.data.data
          this.currentArea = JSON.stringify({
            areaid: val.areaid,
            area: val.area
          })
          this.currentValue = this.getCurrentValue()
        })
      })
    },
    onProvinceChange () {
      if (this.currentProvince !== undefined) {
        var id = JSON.parse(this.currentProvince).provinceid
        this.axios.get(api.common.city, {params: { provinceid: id }})
        .then(response => {
          this.cityList = response.data.data
          this.currentCity = JSON.stringify(this.cityList[0])
          this.axios.get(api.common.area, {params: { cityid: this.cityList[0].cityid }})
          .then(response => {
            this.areaList = response.data.data
            this.currentArea = JSON.stringify(this.areaList[0])
            this.currentValue = this.getCurrentValue()
            this.$emit('change', this.currentValue)
          })
        })
      }
    },
    onCityChange () {
      var id = JSON.parse(this.currentCity).cityid
      this.axios.get(api.common.area, {params: { cityid: id }})
      .then(response => {
        this.areaList = response.data.data
        this.currentArea = JSON.stringify(this.areaList[0])
        this.currentValue = this.getCurrentValue()
        this.$emit('change', this.currentValue)
      })
    },
    onAreaChange () {
      this.$emit('change', this.currentValue)
      this.currentValue = this.getCurrentValue()
    }
  },
  created () {
    this.getProvinceList()
    this.init(this.value)
  },
  watch: {
    value (val) {
      if (this.currentValue !== val) this.init(val)
    },
    currentValue (val) {
      this.$emit('input', this.currentValue)
    }
  }
}
</script>
<style lang="scss">
.city-picker select{
  min-width: 180px;
}
</style>
