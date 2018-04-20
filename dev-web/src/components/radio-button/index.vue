<template>
  <div class="check-button-group">
    <label class="check-button"  v-for="data in dataList" :class="{active: isChecked(currentValue, data.value)}">
      <input type="radio" v-model="currentValue" :value="data.value"  >
      <div>
        {{data.name}}
      </div>
    </label>
  </div>
</template>

<script>
import { looseEqual } from '@/tools/util'

export default {
  props: {
    data: {},
    value: '',
    name: '',
    buttonClass: ''
  },
  data: () => ({
    currentValue: this.value,
    dataList: this.data
  }),
  created () {
    this.currentValue = this.value
    this.dataList = this.data
  },
  methods: {
    isChecked (a, b) {
      return looseEqual(a, b)
    }
  },
  watch: {
    data (val) {
      this.dataList = this.data
    },
    value (val) {
      this.currentValue = val
    },
    currentValue (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss">
  $check-button-width:  130px;

  .check-button {
    width: $check-button-width;
    line-height: 1.5em;
    font-size: 14px;
    background: #F8F8F8;
    border-radius: 4px;
    padding: 10px 5px;
    text-align: center;
    color: rgba(186, 194, 204, 1);
    cursor:pointer;
    border: 1px solid #F8F8F8;
    transition: .02s ease;

    input {
      display:none;
    }
  }

  .check-button:hover{
    border: 1px solid #FE7C1E;
  }

  .check-button.active {
    background: #FFFFFF;
    border: 1px solid #FE7C1E;
    color: #FE7C1E;
  }
</style>
