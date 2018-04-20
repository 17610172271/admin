<template>
  <div class="wfc-rater">
    <input v-model="currentValue" style="display:none">
    <a class="wfc-rater-box" v-for="i in max" @click="handleClick(i-1)" :class="{'is-active':currentValue > i-1}" :style="{color: colors && colors[i-1] ? colors[i-1] : '#ccc',marginRight:margin+'px',fontSize: fontSize + 'px', width: fontSize + 'px', height: fontSize + 'px', lineHeight: fontSize + 'px'}">
      <span class="wfc-rater-inner"><span class="wfc-icon-Star"></span><span class="wfc-rater-outer" :style="{color: activeColor, width: cutPercent + '%'}" v-if="cutPercent > 0 && cutIndex === i-1">{{star}}</span></span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'rater',
  created () {
    this.currentValue = this.value
  },
  mounted () {
    this.updateStyle()
  },
  props: {
    max: {
      type: Number,
      default: 5
    },
    value: {
      type: Number,
      default: 0
    },
    disabled: Boolean,
    star: {
      type: String
    },
    activeColor: {
      type: String,
      default: '#FE4848'
    },
    margin: {
      type: Number,
      default: 4
    },
    fontSize: {
      type: Number,
      default: 20
    }
  },
  computed: {
    sliceValue () {
      const _val = this.currentValue.toFixed(2).split('.')
      return _val.length === 1 ? [_val[0], 0] : _val
    },
    cutIndex () {
      return this.sliceValue[0] * 1
    },
    cutPercent () {
      return this.sliceValue[1] * 1
    }
  },
  methods: {
    handleClick (i, force) {
      if (!this.disabled || force) {
        if (this.currentValue === i + 1) {
          this.currentValue = i
          this.updateStyle()
        } else {
          this.currentValue = i + 1
        }
      }
    },
    updateStyle () {
      for (var j = 0; j < this.max; j++) {
        if (j <= this.currentValue - 1) {
          this.$set(this.colors, j, this.activeColor)
        } else {
          this.$set(this.colors, j, '#ccc')
        }
      }
    }
  },
  data () {
    return {
      colors: [],
      currentValue: 0
    }
  },
  watch: {
    currentValue (val) {
      this.updateStyle()
      this.$emit('input', val)
    },
    value (val) {
      this.currentValue = val
    }
  }
}
</script>

<style>
.wfc-rater {
  text-align: left;
  display: inline-block;
  line-height: normal;
}
.wfc-rater a {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  color: #ccc;
}
.wfc-rater a:last-child {
  padding-right: 2px!important;
  margin-right: 0px!important;
}
.wfc-rater a:hover {
  color: #FE4848;
}
.wfc-rater a.is-disabled {
  color: #ccc !important;
  cursor: not-allowed;
}
.wfc-rater-box {
  position: relative;
}
.wfc-rater-inner {
  position: relative;
  display: inline-block;
}
.wfc-rater-outer {
  position: absolute;
  left: 0;
  top: 0;
  display: inline-block;
  overflow: hidden;
}
</style>
