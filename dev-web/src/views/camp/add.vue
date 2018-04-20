<template>
  <div>
    <div class="b-b padder-v text-lg text-thin">
      <div class="padder">
        <span class=" b-l b-2x b-colored text-xs m-r-xs"></span>
        <span class="m-r-xs">营地管理</span>
        <span class="text-xs wfc-icon-arrow-right-thin m-r-xs"></span>
        <span class="text-muted">添加营地</span>
      </div>
    </div>

    <div class="wrapper padder-md">
      
      <div class="form padder">
         <div class="form-group">
           <label><span class="required-icon">*</span>地标：</label>
          lat: <input type="text" name="" v-model="formData.lat" class="form-input w-200">
           lng: <input type="text" name="" v-model="formData.lng" class="form-input w-200">
         </div>
         <div class="form-group">
           <label><span class="required-icon">*</span>类型：</label>
           <input type="text" class="form-input w-50" v-model="formData.type">
           <span class="pr-txt">填写编号: 0停车点1营地2景点3美食4修理厂5加气</span>
         </div>
         <div class="form-group">
           <label><span class="required-icon">*</span>上传用户ID：</label>
           <input type="text" class="form-input w-50" v-model="formData.uid">
         </div>
         <div class="form-group">
           <label><span class="required-icon">*</span>门店地址：</label>
           <div class="padder-v">
             国家<input type="text" name="" v-model="formData.country" class="form-input w-200" placeholder="例:中国">
             省份<input type="text" name="" v-model="formData.province" class="form-input w-200" placeholder="例:河北省">
             市<input type="text" name="" v-model="formData.city" class="form-input w-200" placeholder="例:衡水市">
           </div>
         </div>


        <div v-show="isShow">
         <div class="form-group">
           <label><span class="required-icon">*</span>详细地址：</label>
           <div class="padder-v">
             地址<input type="text" name="" class="form-input w-200" v-model="postData.address" placeholder="例:光华路阳光100D座">
           </div>
         </div>

         <div class="form-group">
           <label><span class="required-icon">*</span>名称：</label>
           <div class="padder-v">
            <input type="text" name=""  class="form-input w-200" placeholder="例:天安门" v-model="postData.name">
           </div>
         </div>
         <div class="form-group">
           <label><span class="required-icon">*</span>规模：</label>
           <div class="padder-v">
            <input type="text" name="" class="form-input w-200" placeholder="例:1" v-model="postData.scale"><span class="pr-txt">填写编号: <span v-for="(item, index) in scale">{{index}},{{item.name}};</span></span>
           </div>
         </div>

         <div class="form-group">
           <label><span class="required-icon">*</span>服务：</label>
           <div class="padder-v">
            <input type="text" name="" class="form-input w-200" placeholder="例:1" v-model="postData.service"><br><br><span class="pr-txt mnone" >填写编号: <span v-for="(item, index) in service">{{index}},{{item.name}};</span></span>
           </div>
         </div>

         <div class="form-group">
           <label><span class="required-icon">*</span>介绍：</label>
           <div class="padder-v">
            <textarea name="" id="" cols="30" rows="10" class="form-input" style="resize:none;" v-model="postData.introduce"></textarea>
           </div>
         </div>

          <div class="form-group">
           <label>联系方式：</label>
           <div class="padder-v">
            电话：<input type="text" name="" class="form-input w-200" placeholder="例:13511112222/010-858585" v-model="postData.telephone">
            网址：<input type="text" name="" class="form-input w-200" placeholder="例:www.baidu.com" v-model="postData.website">
           </div>
           <label>营业时间：</label>
           <div class="padder-v">
            工作日：<input type="text" name="" class="form-input w-200" placeholder="例:8或2,3,4,5" v-model="postData.open_date"><span class="pr-txt">填写编号: 8每天9工作日 或 1-7为周一到周日,逗号分割</span><br>
            开放时间：<input type="text" name="" class="form-input w-200 m-t-10" placeholder="例:07:00-19:00" v-model="postData.open_time"><span class="pr-txt">24小时制</span>
           </div>
         </div>

         <div class="form-group">
           <label>价格：</label>
           <div class="padder-v">
            <input type="text" name="" class="form-input w-200" placeholder="例:-1或100" v-model="postData.price"><span class="pr-txt" >填写编号: -2不了解,-1免费 或 直接价格</span>
           </div>
         </div>

         <div class="form-group">
           <label>价格类型：</label>
           <div class="padder-v">
            <input type="text" name="" class="form-input w-200" placeholder="例:-1或100" v-model="postData.price_type"><span class="pr-txt" >填写编号: 1元,2美元,3欧元</span>
           </div>
         </div>

          <div class="form-group">
           <label>评分：</label>
           <div class="padder-v">
            <input type="text" name="" class="form-input w-200" placeholder="例:5" v-model="postData.score"><span class="pr-txt" >填写星级:1 - 5 </span>
           </div>
         </div>


         <div class="form-group">
           <label>最佳月份：</label>
           <div class="padder-v">
            <input type="text" name="" class="form-input w-200" placeholder="例:2,3,4,5,6" v-model="postData.best_month"><span class="pr-txt">填写编号: 1-12代表1-12月以逗号分割</span>
           </div>
         </div>

         <div class="form-group">
           <label> 车辆图片：</label>
           <div class="text-muted">车辆主图大小不能超过3MB；<br>700*700以上JPG、PNG格式的图片上传以后车辆详情页自动提供放大镜的功能
           </div>
           <div class="">
             <album-upload v-model="images" :cover="img_cover" @coverset="setCover"></album-upload>
           </div>
         </div>
         </div>

       </div>

       <div class="clear padder-v m-b text-center m-l-lg" v-show="!isShow">
         <a class="btn btn-lg w-sm btn-orange" @click="onSubmit">提交继续</a>
       </div>

       <div class="clear padder-v m-b text-center m-l-lg" v-show="isShow">
         <a class="btn btn-lg w-sm btn-orange" @click="onSubmits">提交</a>
       </div>
    </div>
    <alert ref="alert"></alert>
  </div>
</template>
<script>
import api from '@/api'
import { Alert, AlbumUpload } from '@/components'
import { isJson } from '@/tools/util'

export default {
  components: {
    Alert,
    AlbumUpload
  },
  data: () => ({
    formData: {
      lat: '',
      lng: '',
      type: 0,
      country: '',
      province: '',
      city: '',
      uid: 546
    },
    scale: null,
    service: null,
    dataId: 0,
    images: '',
    img_cover: '',
    isShow: false,
    postData: {
      id: 0,
      address: '',
      name: '',
      scale: 1,
      service: '1',
      introduce: '',
      telephone: '',
      website: '',
      open_date: '',
      open_time: '',
      price: -1,
      best_month: '',
      imgs: '',
      score: 5,
      price_type: 1
    }
  }),
  methods: {
    alert (msg, config) {
      this.$refs['alert'].show(msg, config)
    },
    onSubmit () {
      this.formData.type = this.formData.type * 1
      this.formData.uid = this.formData.uid * 1
      this.axios.post(api.camp.campadd, this.formData)
      .then(response => {
        if (response.data.code === 200) {
          this.scale = response.data.data.scale
          this.service = response.data.data.service
          this.dataId = response.data.data.id
          this.isShow = true
        } else {
          this.alert('参数有问题')
        }
      })
    },
    setCover (link) {
      this.formData.img_cover = link
    },
    onSubmits () {
      this.postData.id = this.dataId * 1
      this.postData.score = this.postData.score * 1
      this.postData.price = this.postData.price * 1
      this.postData.scale = this.postData.scale * 1
      if (isJson(this.images)) {
        this.postData.imgs = JSON.parse(this.images).join(',')
      }
      this.axios.post(api.camp.complete, this.postData)
      .then(response => {
        if (response.data.code === 200) {
          this.alert('提交成功', {type: 'suscess'})
          this.$router.replace({
            name: 'camp'
          })
        } else {
          this.alert('提交失败')
        }
      })
    }
  },
  created () {
  }
}
</script>
<style>
  .w-200{
    width: 200px;
  }
  .w-50{
    width: 50px;
  }
  .m-l-10{
    margin-left: 10px;
  }
  .m-t-10{
    margin-top: 10px;
  }
  .pr-txt{
    padding-left: 20px;
    color: #FF7C00;
  }
  .mnone{
    margin: 0;
    padding: 0;
  }
</style>
