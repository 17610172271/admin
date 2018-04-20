<template>
    <label class="switch" :class="classes">
        <div class="switch__input-wrapper">
            <input
                class="switch__input"
                type="checkbox"

                :checked.prop="isChecked"
                :disabled="disabled"
                :name="name"
                :value="submittedValue"

                @blur="onBlur"
                @change="onChange"
                @click="onClick"
                @focus="onFocus"
            >
            <div class="switch__thumb"></div>

            <div class="switch__track">
              <div class="left">
                {{title[0]}}
              </div>
              <div class="right">
                {{title[1]}}
              </div>
            </div>
        </div>
    </label>
</template>

<script>
import { looseEqual } from '../../tools/util'

export default {
  name: 'ui-switch',
  props: {
    name: String,
    label: String,
    value: {
      // required: true
    },
    title: {
      type: Array,
      default () {
        return ['无', '有']
      }
    },
    trueValue: {
      default: 1
    },
    falseValue: {
      default: 0
    },
    submittedValue: {
      type: String,
      default: 'on' // HTML default
    },
    checked: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'primary' // 'primary' or 'accent'
    },
    switchPosition: {
      type: String,
      default: 'left' // 'left' or 'right'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      isActive: false,
      isChecked: looseEqual(this.value, this.trueValue) || this.checked,
      initialValue: this.value
    }
  },

  computed: {
    classes () {
      return [
        { 'is-active': this.isActive },
        { 'is-checked': this.isChecked },
        { 'is-disabled': this.disabled }
      ]
    }
  },

  watch: {
    value () {
      this.isChecked = looseEqual(this.value, this.trueValue)
    }
  },

  created () {
    this.$emit('input', this.isChecked ? this.trueValue : this.falseValue)
  },

  methods: {
    onClick (e) {
      this.isChecked = e.target.checked
      this.$emit('input', e.target.checked ? this.trueValue : this.falseValue)
    },

    onChange (e) {
      this.$emit('change', this.isChecked ? this.trueValue : this.falseValue, e)
    },

    onFocus () {
      this.isActive = true
      this.$emit('focus')
    },

    onBlur () {
      this.isActive = false
      this.$emit('blur')
    }
  }
}
</script>

<style lang="scss">
$switch-height              : 36px;
$switch-width               : 260px;

.switch__track {
    background: #f8f8f8;
    border-radius: 4px;
    height: $switch-height;
    position: absolute;
    top: 0;
    transition: background-color 0.1s linear;
    width: $switch-width;
    z-index: 0;
    font-family: 'PingFangSC-Medium';
    font-size: 14px;
    padding: 10px 0;
    text-align: center;
    line-height: 1;
    border:1px solid #f8f8f8;
    color: #C8D1DC;
}
.left {
  width: 50%;
  display: inline-block;
  float: left;
}
.right{
  color: #8D9DB0;
}

.switch__thumb{
  height: $switch-height;
  width: $switch-width / 2;
  border-radius: 4px;
  z-index: 1;
  position: absolute;
  transition-duration: 0.2s;
  transition-property: background-color, transform;
  transition-timing-function: ease;
  left: 0;
  background: rgba(141, 157, 176, 0.20);
}

.switch {
    align-items: center;
    display: flex;
    height: $switch-height;
    position: relative;
    &.is-checked {
        .switch__thumb {
            transform: translateX($switch-width / 2);
            background: transparent;
            border: 1px solid #FE7C1E;
        }
        .right{
          color: #FE7C1E;
        }
        .left{
          color: #C8D1DC;
        }
    }
}

.switch__input-wrapper {
    cursor: pointer;
    height: $switch-height;
    position: relative;
    width: $switch-width;
}

.switch__input {
    opacity: 0;
    position: absolute;

    body[modality="keyboard"] &:focus + .ui-switch__thumb {
        .ui-switch__focus-ring {
            opacity: 1;
            transform: scale(1);
        }
    }
}
</style>
