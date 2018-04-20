<template>
  <div>

    <label :class="{active: currentValue.indexOf(item.value) >= 0}" v-for="item in items">

      <input type="checkbox" v-model="currentValue" :value="item.value">

      <div>{{item.name}}</div>

    </label>

  </div>
</template>

<script>
export default {
  props: {
    value: [],
    data: []
  },
  data () {
    return {
      currentValue: this.value ? JSON.parse(this.value) : [],
      items: this.data
    }
  },
  watch: {
    currentValue (val) {
      this.$emit('input', JSON.stringify(val))
    },
    value (val) {
      this.currentValue = JSON.parse(val)
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
