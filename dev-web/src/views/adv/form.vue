<template>
 <div class="form padder form-w-c">
   <div class="form-group">
    <input-text
    title="ID："
    placeholder="填写广告ID"
    :max-length="20"
    :min-length="1"
    :required="true"
    v-model="formData.id"
    v-if="isShow"
    ></input-text>
  </div>

  <div class="form-group">
    <input-text
    title="标题："
    placeholder="填写广告标题"
    :max-length="20"
    :min-length="1"
    :required="true"
    v-model="formData.title"
    ></input-text>
  </div>
  <div class="form-group">
    <input-text
    title="广告描述："
    placeholder="填写广告描述"
    :max-length="100"
    :min-length="1"
    :required="true"
    v-model="formData.description"
    ></input-text>
  </div>
  <div class="form-group">
    <label> 分类ID：</label>
    <form-select :list="storeList" v-model="formData.category_id" class="w-md"></form-select>
  </div>
  <div class="form-group">
    <label><span class="required-icon">*</span>过期时间：</label>
    <date-picker v-model="expire"></date-picker>
  </div>
  <div class="form-group">
    <input-text
    title="备注："
    placeholder="填写备注："
    :min-length="1"
    :required="true"
    v-model="formData.remark"
    ></input-text>
  </div>
  <div class="form-group">
    <label><span class="required-icon">*</span> 广告图片(点击上传)：</label>
    <file-upload class="text-muted" v-model="formData.image">
      <span class="text-colored">点击上传</span>广告图片
    </file-upload>
    <div class="text-muted">
      1.JPG/PNG格式的图片<br>
    </div>
  </div>

</div>
</template>
<script>
  import InputText from '../../components/input-text'
  import { FileUpload, FormSelect } from '@/components'
  import DatePicker from '../../components/date-picker'
  import api from '@/api'
  import { isJson } from '@/tools/util'
  import format from '@/tools/date/format'

  const object2String = obj => {
    return JSON.stringify(obj)
  }
  export default {
    components: {
      InputText,
      FileUpload,
      DatePicker,
      FormSelect
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
        image: '',
        category_id: '',
        expire: '',
        description: '',
        remark: ''
      },
      expire: '',
      storeList: [],
      isShow: false
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
        this.expire = format(this.formData.expire * 1000, 'YYYY-MM-DD')
      },
      getStoreList () {
        this.axios.get(api.adv.category_list)
        .then(response => {
          if (response.data.code === 200) {
            this.storeList = response.data.data.list
          }
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
      },
      expire (val) {
        console.log(val)
        this.formData.expire = val
      }
    }
  }
</script>
