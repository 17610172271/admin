<template>
  <div>

    <label class="check-button" :class="{active: tempValue.indexOf(item.value) >= 0}" v-for="(item, index) in items">

      <input type="checkbox" v-model="tempValue" :value="item.value">

      <div>{{item.name}}</div>

    </label>
  </div>
</template>

<script>
import { isJson } from '@/tools/util'

export default {
  name: 'check-button-group',

  props: {
    value: {
      type: String,
      default: JSON.stringify([])
    },
    data: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      tempValue: this.value && isJson(this.value) ? JSON.parse(this.value) : [],
      items: this.data
    }
  },
  computed: {
    currentValue () {
      return JSON.stringify(this.tempValue)
    }
  },
  watch: {
    tempValue (val) {
      this.$emit('input', this.currentValue)
    },
    value (val) {
      this.tempValue = this.value && isJson(this.value) ? JSON.parse(this.value) : []
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
