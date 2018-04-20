<template>
  <label class="file-upload">
    <div class="fileup-btn">
      <div v-if="loading">上传中...</div>
      <span v-if="!currentValue"><slot></slot></span>
      <img v-if="currentValue" v-show="!loading" :src="currentValue | ossResize('middle')">
    </div>

    <input
      class="fileup-input"
      type="file"
      name="file"
      ref="input"

      @change="onChange"

      >

  </label>
</template>

<script>

export default {
  props: {
    value: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      currentValue: this.value,
      loading: false
    }
  },
  methods: {
    onChange (e) {
      if (this.$refs.input.files[0]) {
        // this.currentValue = undefined
        this.loading = true
        this.axios.upload(this.$refs.input.files)
        .then(response => {
          this.loading = false
          if (response.data.data) {
            this.currentValue = response.data.data.filename
          }
        })
        .catch(error => {
          this.loading = false
          return Promise.reject(error)
        })
      }
    }
  },
  watch: {
    currentValue (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.currentValue = val
    }
  }
}
</script>
<style lang="scss">
label.file-upload {
  display: table;
  width: 280px;
}
.fileup-btn{
  border: 1.5px dashed #C8D1DC;
  border-radius: 4px;
  width: 100%;
  height:192px;
  line-height: 192px;
  text-align:center;
  cursor: pointer;
  width: 280px;
  overflow: hidden;
}
.fileup-btn img{
  width: 100%;
}
.fileup-btn input,
.fileup-input {
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
  width: 0.1px;
}

.error .fileup-btn {
  border-color: rgba(254, 124, 30, 1);
}
</style>
