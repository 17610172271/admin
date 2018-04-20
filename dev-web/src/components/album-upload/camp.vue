<template>
  <div class="camp-img">

   <!--  <div class="preview">
      <div class="image-container" v-for="(image, index) in files" :key="index">
        <div class="remove-btn">
          <a @click="removeImage(index)"><i class="icon icon-close"></i></a>
        </div>
        <div class="image"><img :src="image | ossResize('small')"></div>
      </div>
    </div> -->
    <label class="album-upload">
      <input
      class="fileup-input"
      type="file"
      name="file[]"
      ref="input"

      :multiple="multiple"
      @change="onChange"
      >

      <div class="album-upload-btn">
        添加
      </div>

    </label>
  </div>

</template>
<script>
import { isJson } from '@/tools/util'

export default {
  name: 'album-upload',
  props: {
    value: {},
    multiple: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      files: []
    }
  },
  computed: {
    currentValue () {
      return JSON.stringify(this.files)
    }
  },
  created () {
    this.init(this.value)
  },
  methods: {
    init (val) {
      if (isJson(val)) {
        this.files = JSON.parse(val)
      }
    },
    onChange (e) {
      if (this.$refs.input.files[0]) {
        this.loading = true
        this.axios.upload(this.$refs.input.files)
        .then(response => {
          this.loading = false
          if (response.data.code === 200) {
            if (response.data.data.length > 1) {
              for (var index in response.data.data) {
                this.files.push(response.data.data[index].filename)
              }
            } else {
              this.files.push(response.data.data.filename)
            }
          }
          this.$emit('input', this.currentValue)
        })
        .catch(error => {
          this.loading = false
          return Promise.reject(error)
        })
      }
    },
    removeImage (index) {
      this.files.splice(index, 1)
    }
  },
  watch: {
    currentValue (val) {
      // this.$emit('input', this.currentValue)
    },
    value (val) {
      // console.log('val changed')
      // if (this.currentValue !== val) this.init(val)
    }
  }
}
</script>
<style lang="scss">
$album-upload-width: 100px;
$album-upload-height: 100px;


.camp-img{
  float:right;
  height:30px;
  line-height:28px;
  .album-upload {
    width: $album-upload-width;
    height: $album-upload-height;


    .album-upload-btn {
      width: $album-upload-width;
      height: 30px;
      display: block;

      border: 1.5px dashed #C8D1DC;
      border-radius: 4px;
      background:orange;
      margin-left:30px;

      text-align:center;
      cursor: pointer;

      .wfc-icon-plus-thin{
        font-size: 52px;
      }
    }

    .fileup-input {
      height: 0.1px;
      opacity: 0;
      overflow: hidden;
      position: absolute;
      z-index: -1;
      width: 0.1px;
    }
  }
}


.preview{
  position: relative;
  display: table;
  margin: 0 -5px;
  .image-container{
    position: relative;
    float: left;
    margin: 5px 5px;
    display: inline-block;

    width: $album-upload-width;
    height: $album-upload-height;
    line-height: $album-upload-height;

    // border: 1.5px dashed #C8D1DC;
    border: 0;
    background: #f8f8f8;
    border-radius: 4px;
    .remove-btn {
      position: absolute;
      right: -10px;
      top: -10px;
      // background: rgba(46,62,76, .5);
      // background: rgba(255,255,255, .5);

      display: block;
      height: 20px;
      line-height: 20px;
      text-align: center;
    }
    .image {
      overflow: hidden;
      display: block;
    }
  }

  .image-container img {
    width: 100%;
  }
}

</style>
