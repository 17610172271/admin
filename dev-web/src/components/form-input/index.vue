<template>
  <div class="form-group" :class="{error: isError}">
    <label>
      <span class="required-icon" v-if="required">*</span>
      {{title}}
    </label>

    <input
      v-if="!multiple"
      class="form-input"
      type="text"
      v-model="currentValue"
      :placeholder="placeholder"

      @change="onChange"
      >

      <textarea
        v-if="multiple"
        class="form-textarea"
        :placeholder="placeholder"
        rows="6"
        cols="80"
        v-model="currentValue"

        @change="onChange"
        >
      </textarea>


    <span class="err-msg" v-if="errorMessage">{{errorMessage}}</span>

  </div>
</template>
<script>
export default {
  name: 'form-input',
  props: {
    value: '',
    placeholder: '',
    title: '',
    errorMessage: '',
    error: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      defalut: false
    },
    minLength: {
      type: Number,
      default: 0
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    currentValue: '',
    isError: this.error
  }),
  methods: {
    onChange () {
      this.isError = this.minLength > 0 && this.currentValue.length < this.minLength
    }
  },
  watch: {
    error (val) {
      this.isError = val
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
