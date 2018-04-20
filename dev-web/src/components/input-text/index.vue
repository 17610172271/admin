<template>
  <div class="input-text" :class="classObject">
    <label>
      <div class="right-info" v-if="maxLength">{{currentLength}}/{{maxLength}}</div>
      <span class="required">*</span>
      <span>{{title}}</span>
    </label>
    <input
      type="text"
      :name="name"

      v-model="currentValue"
      :placeholder="placeholder"
      :maxlength="maxLength"
      :minLength="minLength"

      @blur="onBlur"
      @change="onChange"
      @focus="onFocus"
      >
  </div>
</template>
<script>
  export default {
    props: {
      name: {
        type: String
      },
      value: {
        type: String,
        default: ''
      },
      maxLength: {
        type: Number
      },
      minLength: {
        type: Number
      },
      required: {
        type: Boolean,
        default: false
      },
      title: {
        type: String
      },
      placeholder: {
        type: String
      }
    },
    data () {
      return {
        currentValue: this.value,
        isActive: false
      }
    },
    computed: {
      currentLength () {
        return this.currentValue.length
      },
      classObject () {
        return {
          'is-active': this.isActive,
          'error': this.isError(),
          'length-error': this.currentValue.length > this.maxLength || this.currentValue.length < this.minLength
        }
      }
    },
    methods: {
      isError () {
        return this.currentValue.length > this.maxLength
      },
      onChange (e) {
        this.$emit('change', this.currentValue, e)
      },
      onFocus () {
        this.isActive = true
        this.$emit('focus')
      },
      onBlur () {
        this.isActive = false

        this.$emit('blur')
      }
    },
    watch: {
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

$max-bo-ui-width: 580px;

.input-text {
  position: relative;
  display: block;
  line-height: 20px;
  font-size: 14px;
  color: rgba(46, 62, 76, 1);
  padding: 0 0;
  max-width: $max-bo-ui-width;
  font-family: "PingFangSC-Medium";

  label {
    display:block;
    color: #8D9DB0;
    padding: 5px 0;
    margin: 0 0;

    .required {
      margin-right: 3px;
      color: #FE7C1E;
      font-size: 16px;
      vertical-align: middle;
    }
  }
  .right-info {
    float: right;
    color: #C8D1DC;
  }

  input {
    color: rgba(46, 62, 76, 1);
    width: 100%;
    border: 1px solid #F8F8F8;
    background: #F8F8F8;
    border-radius: 4px;
    padding: 7px 10px;
    transition: .2s ease;
  }

  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: #C8D1DC
  }
  ::-moz-placeholder { /* Firefox 19+ */
    color: #C8D1DC;
  }
  :-ms-input-placeholder { /* IE 10+ */
    color: #C8D1DC;
  }
  :-moz-placeholder { /* Firefox 18- */
    color: #C8D1DC;
  }
}

.input-text.is-active{
  input{
    border-color: rgba(254, 124, 30, 1);
    // box-shadow: 0 0 2px rgba(254, 124, 30, 1);
    background: #fff;
  }
}

.input-text.length-error .right-info{
    color: rgba(254, 124, 30, 1);
  }
.input-text.error input {
  border-color: rgba(254, 124, 30, 1);
  box-shadow: 0 0 3px rgba(254, 124, 30, .5);
  background: rgba(254, 241, 232, 1)
}
</style>
