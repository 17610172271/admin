<template>
 <div class="form padder form-w-c">
   <div class="form-group" v-if="isTrue">
    <input-text
    title="ID："
    placeholder="填写广告ID"
    :max-length="20"
    :min-length="1"
    :required="true"
    v-model="formData.id"
    ></input-text>
  </div>
  <div class="form-group" v-if="isTrue">
    <input-text
    title="分类ID："
    placeholder="填写分类ID"
    v-model="formData.category_id"
    ></input-text>
  </div>
  <div class="form-group">
    <input-text
    title="标题："
    placeholder="填写标题"
    :max-length="20"
    :min-length="1"
    :required="true"
    v-model="formData.title"
    ></input-text>
  </div>
  <div class="form-group">
    <label><span class="required-icon">*</span> 所属模块：</label>
    <form-select :list="storeList" v-model="formData.category_id" class="w-md"></form-select>
  </div>
  <div class="form-group">
    <label><span class="required-icon">*</span> 内容：</label>
    <editor id="editor1" v-model="formData.content"  useCustomImageHandler @imageAdded="handleImageAdded"></editor>
  </div>

</div>
</template>
<style scoped>
  .form-group {
    width: 650px !important;
  }
</style>
<script>
  import InputText from '../../components/input-text'
  import FormSelect from '../../components/form-select/pageadmin'
  import { FileUpload, Editor } from '@/components'
  // import DatePicker from '../../components/date-picker'
  import api from '@/api'
  import { isJson } from '@/tools/util'
  import ossResize from '@/filters/oss-resize.js'

  const object2String = obj => {
    return JSON.stringify(obj)
  }
  export default {
    components: {
      InputText,
      FileUpload,
      FormSelect,
      Editor
    },
    props: {
      value: {}
    },
    filters: {
      object2String
    },
    data: () => ({
      formData: {
        id: '',
        title: '',
        category_id: '',
        content: ''
      },
      storeList: [],
      isTrue: false
    }),
    computed: {
      currentValue () {
        return JSON.stringify(this.formData)
      }
    },
    methods: {
    // 初始化 formData 的值
      init (val) {
        if (val && isJson(val)) {
          var tempVal = JSON.parse(val)
          for (var k in this.formData) {
            if (tempVal[k]) this.formData[k] = tempVal[k]
          }
        }
      },
      getStoreList () {
        this.axios.get(api.pageadmin.category_list, {
          params: {
            size: this.$route.query.size,
            page: this.page > 1 ? this.page : 1
          }
        })
        .then(response => {
          if (response.data.code === 200) {
            this.storeList = response.data.data.list
          }
        })
      },
      handleImageAdded (file, Editor, cursorLocation) {
        this.axios.upload([file]).then(response => {
          if (response.data.code === 200) {
            let url = ossResize(response.data.data.filename, 'middle')
            Editor.insertEmbed(cursorLocation, 'image', url)
          }
        })
        .catch(err => {
          return Promise.reject(err)
        })
      }
    },
    created () {
      this.init(this.value)
      this.getStoreList()
    },
    watch: {
      value (val) {
        if (this.currentValue !== val) this.init(val)
      },
      currentValue (val) {
        this.$emit('input', this.currentValue)
      }
    }
  }
</script>
<style scoped>
  .form-group {
    width: 530px !important;
  }
</style>
