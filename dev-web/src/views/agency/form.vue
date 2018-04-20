<template>
 <div class="form padder form-w-c">
  <div class="form-group">
    <input-text
    title="名称:"
    placeholder="填写商家名称"
    :max-length="20"
    :min-length="2"
    :required="true"
    v-model="formData.name"
    ></input-text>
  </div>

  <div class="form-group">
    <input-text
    title="简称:"
    placeholder="填写商家简称"
    :required="true"
    v-model="formData.sort_name"
    ></input-text>
  </div>
  <div class="form-group">
    <input-text
    title="电话:"
    placeholder="填写商家电话"
    :min-length="2"
    :required="true"
    v-model="formData.phone_number"
    ></input-text>
  </div>
  <div class="form-group">
    <label>商家地址：</label>
    <div class="padder-v">
      <city-picker v-model="cityPickerValue"></city-picker>
    </div>
    <input type="text" name="" v-model="formData.address" class="form-input" placeholder="街道/门牌号">
  </div>
  <div class="form-group">
    <input-text
    title="网址:"
    placeholder="填写商家网址"
    :min-length="2"
    :required="true"
    v-model="formData.website"
    ></input-text>
  </div>
  <div class="form-group">
    <input-text
    title="联系人:"
    placeholder="填写商家联系人"
    :min-length="2"
    :required="true"
    v-model="formData.contact"
    ></input-text>
  </div>
  <div class="form-group">
    <input-text
    title="邮箱:"
    placeholder="填写商家邮箱"
    :min-length="2"
    :required="true"
    v-model="formData.email"
    ></input-text>
  </div>
  <div class="form-group">
    <input-text
    title="营业执照号:"
    placeholder="填写营业执照号"
    :min-length="2"
    :required="true"
    v-model="formData.business_licence_code"
    ></input-text>
  </div>

  <div class="form-group">
    <label><span class="required-icon">*</span> 营业执照照片：</label>
    <file-upload class="text-muted" v-model="formData.business_licence_image">
      <span class="text-colored">点击上传</span>商家营业执照照片
    </file-upload>
    <div class="text-muted">
      1.2M以内，JPG/PNG格式的图片<br>2.原件照片、扫描或者复印件加盖企业公章后扫描件<br>证件内容需清晰可见，用于商家审核。<br>
    </div>
  </div>
  
  <div class="form-group">
    <input-text
    title="法人姓名:"
    placeholder="填写法人姓名"
    :min-length="2"
    :required="true"
    v-model="formData.corporation_name"
    ></input-text>
  </div>
  <div class="form-group">
    <input-text
    title="法人身份证号:"
    placeholder="填写法人身份证号"
    :min-length="2"
    :required="true"
    v-model="formData.corporation_id"
    ></input-text>
  </div>
  <div class="form-group">
    <label><span class="required-icon">*</span> 法人身份证照片：</label>
    <file-upload class="text-muted" v-model="formData.corporation_id_image">
      <span class="text-colored">点击上传</span>法人身份证照片
    </file-upload>
    <div class="text-muted">
      1.2M以内，JPG/PNG格式的图片<br>2.原件照片、扫描或者复印件加盖企业公章后扫描件<br>证件内容需清晰可见，用于商家审核。<br>
    </div>
  </div>
  <div class="form-group">
    <label><span class="required-icon">*</span> LOGO：</label>
    <file-upload class="text-muted" v-model="formData.logo">
      <span class="text-colored">点击上传</span>LOGO
    </file-upload>
    <div class="text-muted">
      1.2M以内，JPG/PNG格式的图片<br>
    </div>
  </div>

  <div class="form-group">
    <label><span class="required-icon">*</span>  商家介绍：</label>
    <editor id="editor1" v-model="formData.instruduction" :editorToolbar="customToolbar" useCustomImageHandler @imageAdded="handleImageAdded"></editor>
  </div>
</div>
</template>
<script>
  import InputText from '../../components/input-text'
  import { Editor, FileUpload, CityPicker } from '@/components'
  import { isJson } from '@/tools/util'
  import ossResize from '@/filters/oss-resize.js'

  const object2String = obj => {
    return JSON.stringify(obj)
  }

  export default {
    components: {
      InputText,
      FileUpload,
      CityPicker,
      Editor
    },
    props: {
      value: {}
    },
    filters: {
      object2String
    },
    data: () => ({
      content: '',
      cityPickerValue: {},
      formData: {
        weight: '',
        id: '',
        name: '',
        business_licence_code: '',
        business_licence_image: '',
        corporation_name: '',
        corporation_id: '',
        corporation_id_image: '',
        logo: '',
        sort_name: '',
        instruduction: '',
        address: '',
        website: '',
        contact: '',
        phone_number: '',
        email: ''
      },
      options: {
        coty: [
        { name: '0-3年', value: '0-3年' },
        { name: '3-4年', value: '3-4年' },
        { name: '5-6年', value: '5-6年' },
        { name: '7-8年', value: '7-8年' },
        { name: '10年以上', value: '10年以上' }
        ],
        transmission_case: [
        { name: '自动挡', value: 1 },
        { name: '手动挡', value: 2 },
        { name: '手/自动挡', value: 3 }
        ],
        actuation: [
        { name: '汽油', value: 1 },
        { name: '柴油', value: 2 }
        ],
        driver_license_class: [
        { name: 'C2', value: 1 },
        { name: 'C1', value: 2 },
        { name: 'B2', value: 3 },
        { name: 'B1', value: 4 },
        { name: 'A3', value: 5 },
        { name: 'A2', value: 6 },
        { name: 'A1', value: 7 }
        ],
        mp3: [
        { name: 'mp3', value: 'mp3' },
        { name: 'mp4', value: 'mp4' }
        ]
      },
      customToolbar: [
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'color': [] }],
      ['bold', 'italic', 'underline'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{ 'align': [] }],
      ['image']
      ]
    }),
    computed: {
      currentValue () {
      // this.formData.img_cover = this.formData.images && isJson(this.formData.images) ? JSON.parse(this.formData.images)[0] : '' // 转换封面图片
        return JSON.stringify(this.formData)
      }
    },
    methods: {
    // 初始化 formData 的值
      init (val) {
        if (val && isJson(val)) {
          var tempVal = JSON.parse(val)
          for (var k in tempVal) {
            if (tempVal[k]) this.formData[k] = tempVal[k]
          }
        }
        this.initCityPickerValue()
      },
      handleImageAdded (file, Editor, cursorLocation) {
        this.axios.upload(file).then(response => {
          if (response.data.code === 200) {
            let url = ossResize(response.data.data.filename, 'middle')
            Editor.insertEmbed(cursorLocation, 'image', url)
          }
        })
        .catch(err => {
          return Promise.reject(err)
        })
      },
      initCityPickerValue () {
      // 初始化 城市选择组件
        this.cityPickerValue = {
          provinceid: this.formData.provinceid,
          province: this.formData.province,
          cityid: this.formData.cityid,
          city: this.formData.city,
          areaid: this.formData.areaid,
          area: this.formData.area
        }
      },
      onCityPickerChange (val) {
        // 将省份信息合并到 formData
        for (var k in val) {
          this.formData[k] = val[k]
        }
      },
      setCover (link) {
        this.formData.img_cover = link
      }
    },
    created () {
      this.init(this.value)
    },
    watch: {
      value (val) {
        if (this.currentValue !== val) this.init(val)
      },
      currentValue (val) {
        this.$emit('input', this.currentValue)
      },
      cityPickerValue (val) {
        this.onCityPickerChange(val)
      }
    }
  }
</script>
<style scoped>
  .water {
    clear: both;
  }
</style>
