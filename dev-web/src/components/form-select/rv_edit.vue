<template>
  <div>
  <select class="form-select" name="" v-model="tempValue" @change="onChange" v-if="dataList">
    <option disabled value="title">{{title}}</option>
    <option :value="item" v-for="item in dataList" :selected="isSelected(tempValue, item)">{{item.name}}</option>
  </select>
</div>
</template>
<script>
import { looseEqual } from '@/tools/util'

export default {
  props: {
    list: {},
    value: {},
    title: ''
  },
  data: () => ({
    dataList: [],
    tempValue: this.value
  }),
  created () {
    this.dataList = this.list
    this.tempValue = this.value
  },
  methods: {
    onChange (val) {
      this.$emit('input', this.tempValue)
    },
    isSelected (a, b) {
      return looseEqual(a, b)
    }
  },
  watch: {
    value (val) {
      if (val !== undefined) this.tempValue = val
    },
    tempValue (val) {
    },
    list (val) {
      this.dataList = this.list
    }
  }
}
</script>
