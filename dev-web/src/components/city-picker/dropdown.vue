<template>
  <div class="city-picker" :class="classObject">

    <select class="form-select" name="" v-model="currentValue.province">
      <option value="北京">北京</option>
      <option :value="i" v-for="i in 10">{{i}}</option>
    </select>
    <select class="form-select" name="" v-model="currentValue.city">
      <option value="北京">北京</option>
      <option :value="i" v-for="i in 10">{{i}}</option>
    </select>
    <select class="form-select" name="" v-model="currentValue.county">
      <option value="朝阳区">朝阳区朝阳区朝阳区朝阳区</option>
      <option :value="i" v-for="i in 10">{{i}}</option>
    </select>
  </div>
</template>
<script>
export default {
  name: 'city-picker',
  props: {
    name: String,
    value: {
      type: Object,
      default () {
        return {
          province: '省',
          city: '市',
          county: '县/区'
        }
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isActive: false,
      isTouched: false,
      showDropdown: false,
      initialValue: JSON.stringify(this.value),
      currentValue: this.value
    }
  },
  computed: {
    classObject () {
      return [
        { 'is-active': this.isActive },
        { 'is-touched': this.isTouched },
        { 'is-disabled': this.disabled }
      ]
    }
  },
  mounted () {
    document.addEventListener('click', this.onExternalClick)
  },
  methods: {
    setValue (value) {
      this.$emit('input', value)
      this.$emit('change', value)
    },
    created () {
      if (!this.value || this.value === '') {
        this.setValue(null)
      }
    },
    beforeDestroy () {
      document.removeEventListener('click', this.onExternalClick)
    },

    toggleDropdown () {
      this[this.showDropdown ? 'closeDropdown' : 'openDropdown']()
    },

    openDropdown () {
      if (this.disabled) {
        return
      }

      this.showDropdown = true

      // IE: clicking label doesn't focus the select element
      // to set isActive to true
      if (!this.isActive) {
        this.isActive = true
      }
    },

    closeDropdown (options = { autoBlur: false }) {
      this.showDropdown = false

      // if (!this.isTouched) {
      //   this.isTouched = true
      //   this.$emit('touch')
      // }

      if (options.autoBlur) {
        this.isActive = false
      } else {
        this.$refs.label.focus()
      }
    },

    onFocus (e) {
      if (this.isActive) {
        return
      }

      this.isActive = true
      this.$emit('focus', e)
    },

    onBlur (e) {
      this.isActive = false
      this.$emit('blur', e)

      if (this.showDropdown) {
        this.closeDropdown({ autoBlur: true })
      }
    },

    onOpen () {
    },

    onClose () {
    },

    onExternalClick (e) {
      if (!this.$el.contains(e.target)) {
        if (this.showDropdown) {
          this.closeDropdown({ autoBlur: true })
        } else if (this.isActive) {
          this.isActive = false
        }
      }
    }
  }
}
</script>
