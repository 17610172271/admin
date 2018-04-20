<template>
  <div class="city-picker">
    <h3>city-picker</h3>
    <city-picker v-model="cityPickerValue"></city-picker>
    <div class="">
      {{cityPickerValue}}
    </div>
    <div class="">
      <a @click="resetCityPickerValue" class="btn btn-orange btn-lg w-md">改变默认值</a>
      <a @click="onSubmit" class="btn btn-orange btn-lg w-md">提交</a>
    </div>
  </div>
</template>
<script>
import CityPicker from '@/components/city-picker'

export default {
  data: () => ({
    formData: {
      province: '吉林省',
      provinceid: '220000',
      cityid: '220500',
      city: '通化市',
      areaid: '220521',
      area: '通化县'
    },
    formData2: {
      province: '广东省',
      provinceid: '440000',
      cityid: '440100',
      city: '广州市',
      areaid: '440105',
      area: '海珠区'
    },
    citySwitch: true,
    cityPickerValue: {}
  }),
  created () {
    this.initCityPickerValue()
  },
  methods: {
    initCityPickerValue () {
      // setTimeout(() => {
      this.cityPickerValue = this.formData
      // }, 2000)
      // this.cityPickerValue = this.formData
    },
    resetCityPickerValue () {
      this.citySwitch = !this.citySwitch
      this.cityPickerValue = this.citySwitch ? this.formData : this.formData2
    },
    onSubmit () {
      // this.mapCity()
      console.log(this.cityPickerValue)
      // console.log(this.formData)
      // console.log(this.cityPickerValue)
    }
  },
  components: {
    CityPicker
  }
}
</script>
<style lang="scss" scoped>
.city-picker {

}
</style>
