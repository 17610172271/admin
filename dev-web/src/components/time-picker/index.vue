<template>
  <span class="select-group">
    <select name="" class="form-select" v-model="currentValue[0]">
      <option :value="h" v-for="h in hours">{{h}}</option>
    </select>
    <select name="" class="form-select" v-model="currentValue[1]">
      <option :value="m" v-for="m in minutes">{{m}}</option>
    </select>
  </span>
</template>
<script>
// time picker
import NumberRange from '@/tools/number/range'

const array2String = function (array) {
  return array.length === 1 ? array[0] : array.join(':')
}

const string2Array = function (str) {
  return str === undefined ? [] : str.split(':')
}

export default {
  props: {
    value: {
      type: String,
      default: '00:00'
    }
  },
  data () {
    return {
      hours: NumberRange(0, 23),
      minutes: NumberRange(0, 60),
      currentValue: string2Array(this.value)
    }
  },
  watch: {
    value (val) {
      this.currentValue = string2Array(val)
    },
    currentValue (val) {
      this.$emit('input', array2String(val))
    }
  }

}
</script>
<style lang="scss">

</style>
