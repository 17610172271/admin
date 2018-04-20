<template>
  <label class="check-button" :class="classObject">
    <input type="checkbox" :name="name" v-model="currentValue">
    <div class="">
      <slot></slot>
    </div>
  </label>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    name: {
      type: String
    }
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  computed: {
    classObject () {
      return {
        'active': this.currentValue
      }
    }
  },
  watch: {
    currentValue (val) {
      this.$emit('input', this.currentValue)
    },
    value () {
      this.currentValue = this.value
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
