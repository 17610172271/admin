<template>
  <div class="camp-detail">
    <alert ref="alert"></alert>
  <div class="wrapper b-b">
    <div class="pull-right m-t-n-xs">
      <div class="btn-group" v-show="!isShow">
        <a class="btn btn-default" @click="serviceSetting = !serviceSetting">
          服务配置</a>
        <a class="btn btn-default" @click="showBtn()">
          <i class="icon icon-note"></i>
          编辑</a>
        <a @click="open('delete')" class="btn btn-default">
          <i class="icon icon-trash"></i>
          删除</a>
        <a @click="noBtn(2)" class="btn btn-default" v-show="data.status === 0">
          <i class="icon icon-trash"></i>
          驳回</a>
        <a @click="noBtn(1)" class="btn btn-default" v-show="data.status === 0" >
          <i class="icon icon-trash"></i>
          通过</a>
        <a class="btn btn-default" @click="doClose">
          <i class="icon icon-power"></i>
          关闭</a>
      </div>
      <div class="btn-group" v-show="isShow">
        <a class="btn btn-default" @click="saveBtn()">
         </i>
          保存</a>
        <a @click="showBtn()" class="btn btn-default">
          取消</a>
      </div>
      <modal ref="delete">
        <div class="text-center text-lg padder-v">
          确定要删除？
        </div>
        <div class="text-center padder-v">
          <a class="btn btn-md btn-orange m-r" @click="doDelete">确定</a>
          <a class="btn btn-md btn-bordered" @click="close('delete')">取消</a>
        </div>
      </modal>
    </div>
    <div>
      <span class="text-lg">{{typeTxt}}详情</span>
    </div>
  </div>
  <div class="wrapper">
    <table class="table table-bordered">
      <tbody>
        <tr>
          <td class="w-md">ID</td>
          <td>{{data.id}}</td>
        </tr>
        <tr>
          <td class="w-md">发布时间</td>
          <td>{{data.updated_at | times}}</td>
        </tr>
        <tr>
          <td class="w-md">名称</td>
          <td v-show='!isShow'>{{data.name}}</td>
          <td v-show='isShow' class=""><input v-model="data.name"></input></td>
        </tr>
        <tr>
          <td class="w-md">地址</td>
          <td v-show='!isShow'>{{data.address}}</td>
          <td v-show='isShow' class=""><input v-model="data.address"></input></td>
        </tr>

        <tr>
          <td class="w-md">发布坐标</td>
          <td v-show='!isShow'>lng: {{data.lng}} <span style="width:20px;display:inline-block;"></span> lat:{{data.lat}}</td>
          <td v-show='isShow' class="txt">lng: <input type="text" class="zuobiao" v-model="data.lng"> <span style="width:20px;display:inline-block;"></span> lat:<input type="text" class="zuobiao" v-model="data.lat"></td>
        </tr>
        <tr>
          <td class="w-md">类型</td>
          <td>{{typeTxt}}</td>
        </tr>
        <tr>
          <td class="w-md">规模</td>
          <td v-show='!isShow'>{{data.scale}} &nbsp;[<span v-for="(item, index) in scale">{{index}},{{item.name}};</span>]</td>
          <td v-show='isShow' class="">
            <input v-model="data.scale"></input>
            <span class="pr-txt">填写编号: 
              <span v-for="(item, index) in scale">{{index}},{{item.name}};</span>
            </span>
          </td>
        </tr>
        <tr>
          <td class="w-md">基础服务</td>
          <td v-show='!isShow' class="tab-service">
           <!--  <div class="clear wrap">
              <button class="add-service pull-right" @click="serviceSetting = true">服务配置 +</button>
            </div> -->
            <div class="camp-service-list">
              <div class="clear m-b"><button class="add-service pull-right m-r" @click="open('addServiceItem')">新增 +</button></div>
              <label v-for="item in data.service">
                <span class="m-w-lg">{{item.name}}【{{item.num}}】</span>
                <a href="javascript::" @click="editServiceNum(item)" v-show="item.is_num==1"> 数量</a>
                <a href="javascript::" @click="delServiceItem(item)"> 删除</a>
              </label>
              <!-- 测试 -->
              <div class="m-t-10 camp-add-service">
<!--                 <form-select :list="service" v-model="addServiceVal"></form-select>
                <button class="add-service" @click="addServiceItem">新增服务 +</button> -->
                
                <modal size="middle" ref="addServiceItem">
                  <div class="clear">
                    <div class="service-item-add pull-left btn" style="width:25%;" v-for="item in service" @click="addServiceItem(item)"><span style="display:inline-block;min-width:56px;">{{item.name}}</span> <span class="orange hidden">+</span></div>
                  </div>
                </modal>
              </div>

            </div>

            <!-- 服务配置 -->
            <div width="100%" class="camp-service-modal" v-show="serviceSetting">
              <h3 class="text-lg text-muted m-b-lg">服务配置</h3>
              <div class="camp-service-list">
                <label v-for="item in service">
                  {{item.name}}
                  <a href="javascript:;" @click.stop="editService1(item)">编辑</a>
                  <a href="javascript::" @click.stop="delService0(item)"> 删除</a>
                </label>
                <button class="add-service" @click="editService1">新增服务配置 +</button>
              </div>
              <a href="javascript:;" class="service-back text-md" @click="serviceSetting = false">关闭</a>
            </div>
            
            <modal ref="serviceNum">
              <div class="padder-v text-center">
                <div class="text-xlg">修改服务数量</div>
                <input type="text" class="m-t-lg m-b-lg" v-model="serviceNum1">
                <div><button @click="close('serviceNum')" class="m-r-lg btn">取消</button><button class="btn" @click="editNum">保存</button></div>
              </div>
            </modal>
            <modal ref="delService">
              <div class="text-center text-lg padder-v">
                确定要删除？
              </div>
              <div class="text-center padder-v">
                <a class="btn btn-md btn-orange m-r" @click="delService">确定</a>
                <a class="btn btn-md btn-bordered" @click="close('delService')">取消</a>
              </div>
            </modal>
            <modal ref="editService" size="middle">
              <div class="text-lg padder-v">
                <div v-show="editService.id" class="service-edit-modal"><span class="service-ipt-text">ID</span><span>{{editService.id}}</span></div>
                <div class="service-edit-modal"><span class="service-ipt-text">名称</span><input type="text" v-model="editService.name"></div>
                <div class="service-edit-modal"><span class="service-ipt-text">未选中icon</span><input type="text" v-model="editService.icon"></div>
                <div class="service-edit-modal"><span class="service-ipt-text">选中icon</span><input type="text" v-model="editService.choice_icon"></div>
                <div class="service-edit-modal"><span class="service-ipt-text">是否显示数量</span><input type="text" v-model="editService.is_num" placeholder="0不显示，1显示"></div>
                <div class="service-edit-modal"><span class="service-ipt-text">描述</span><input type="text" v-model="editService.desc"></div>
                <div class="service-edit-modal"><span class="service-ipt-text">是否默认</span><input type="text" v-model="editService.is_default"></div>
                <div class="service-edit-modal"><span class="service-ipt-text">排序</span><input type="text" v-model="editService.weight"></div>
                <div class="text-center m-t-lg"><button class="m-r-lg" @click="close('editService')">取消</button><button @click="saveService">保存</button></div>
              </div>
            </modal>
          </td>
        </tr>
        <tr v-show="$route.query.type == 1">
          <td class="w-md">特色服务</td>
          <td v-show='!isShow'>{{data.feature_service}} &nbsp;[<span v-for="(item, index) in feature_service">{{item.id}},{{item.name}};</span>]</td>
          <td v-show='isShow' class=""><input v-model="data.feature_service"></input><br><span class="pr-txt mnone" >填写编号: <span v-for="(item, index) in feature_service">{{item.id}},{{item.name}};</span></span></td>
        </tr>
        <tr>
          <td class="w-md">介绍</td>
          <td v-show='!isShow'>{{data.introduce}}</td>
          <td v-show='isShow' class="txt"><textarea v-model="data.introduce" style="resize: none; width:100%;height:100px;"></textarea></td>
        </tr>
         <tr>
          <td class="w-md">联系方式</td>
          <td v-show='!isShow'>{{data.telephone}}</td>
          <td v-show='isShow' class=""><input v-model="data.telephone"></input></td>
        </tr>
        <tr>
          <td class="w-md">网址</td>
          <td v-show='!isShow'>{{data.website}}</td>
          <td v-show='isShow' class=""><input v-model="data.website"></input></td>
        </tr>
        <tr>
          <td class="w-md">工作日</td>
          <td v-show='!isShow'>{{data.open_date}}</td>
          <td v-show='isShow' class=""><input v-model="data.open_date"></input>填写编号: 8每天9工作日 或 1-7为周一到周日,逗号分割</td>
        </tr>
        <tr>
          <td class="w-md">开放时间</td>
          <td v-show='!isShow'>{{data.open_time}}</td>
          <td v-show='isShow' class=""><input v-model="data.open_time"></input>24小时制"例:07:00-19:00"</td>
        </tr>
        <tr>
          <td class="w-md"><span v-show="$route.query.type == 2">淡季</span>价格</td>
          <td v-show='!isShow'>{{data.price}}</td>
          <td v-show='isShow' class=""><input v-model="data.price"></input>填写编号: -2不了解,-1免费 或 直接价格</td>
        </tr>
        <tr v-show="$route.query.type == 2">
          <td class="w-md">旺季价格</td>
          <td v-show='!isShow'>{{data.busy_price}}</td>
          <td v-show='isShow' class=""><input v-model="data.busy_price"></input>填写编号: -2不了解,-1免费 或 直接价格</td>
        </tr>
        <tr>
          <td class="w-md">价格类型</td>
          <td v-show='!isShow'>{{data.price_type}}</td>
          <td v-show='isShow' class=""><input v-model="data.price_type"></input>填写编号: 1元,2美元,3欧元</td>
        </tr>
        <tr>
          <td class="w-md">评分</td>
          <td v-show='!isShow'>{{data.score * 1}}</td>
          <td v-show='isShow' class=""><input v-model="data.score"></input>填写星级:1 - 5</td>
        </tr>
        <tr>
          <td class="w-md">最佳月份</td>
          <td v-show='!isShow'>{{data.best_month}}</td>
          <td v-show='isShow' class=""><input v-model="data.best_month"></input>填写编号: 1-12代表1-12月以逗号分割</td>
        </tr>
        <tr>
          <td class="w-md">邮箱</td>
          <td v-show='!isShow'>{{data.email}}</td>
          <td v-show='isShow' class=""><input v-model="data.email"></input></td>
        </tr>
         <tr>
          <td class="w-md">视频</td>
          <td v-show='!isShow'>{{data.video}}</td>
          <td v-show='isShow' class=""><input v-model="data.video"></input></td>
        </tr>
        <tr>
          <td class="w-md">封面图</td>
          <td v-show="!isShow" class="img-m-t" >
            <div class="camp_imgcover">
              <img :src="data.imgcover" alt="">
            </div>
          </td>
          <td v-show='isShow' class="">
            <input v-model="data.imgcover" style="width:70%;"></input>填写单张图片路径
          </td>
        </tr>
        <tr>
          <td class="w-md">图片集合</td>
          <td class="img-m-t img-list" v-show='!isShow'><span  v-for="img in imgList"><img  :src="img.img | ossResize('small')" alt=""></span></td>
          <td class="img-m-t img-list" v-show='isShow'>
            <p style="float:left;">用户ID：<input type="text" v-model="userId"><album-upload v-model="addimgList" :cover="img_cover" @coverset="setCover"></album-upload></p>
            <span  v-for="img in imgList"><i @click="delimg(img.id)" class="icon icon-trash"></i><img  :src="img.img | ossResize('small')" alt=""></span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>
<script>
import api from '@/api'
import AlbumUpload from '@/components/album-upload/camp'
import { isJson } from '@/tools/util'
import {Modal, Alert, FileUpload, CheckButtonGroup} from '@/components'
import FormSelect from '@/components/form-select/camp'
// import { isJson } from '@/tools/util'
const switchTitle = (str, type = 1) => {
  return parseInt(str) === 1 ? (type === 1 ? '有' : '是') : (type === 1 ? '无' : '否')
}

export default {
  components: {
    Modal,
    Alert,
    AlbumUpload,
    FileUpload,
    CheckButtonGroup,
    FormSelect
  },
  filters: {
    switchTitle,
    times (val) {
      var time = new Date(parseInt(val) * 1000).toLocaleString().replace(/:\d{1,2}$/, '')
      return time
    }
  },
  data: () => ({
    data: {},
    isShow: false,
    serviceSetting: false,
    serviceItem: {},
    serviceNum: {},
    serviceNum1: '',
    serviceAdd: {},
    editService: '',
    driver_license_class: [
      { name: 'C2', value: 1 },
      { name: 'C1', value: 2 },
      { name: 'B2', value: 3 },
      { name: 'B1', value: 4 },
      { name: 'A3', value: 5 },
      { name: 'A2', value: 6 },
      { name: 'A1', value: 7 }
    ],
    postData: {
      busy_price: '',
      id: 0,
      address: '',
      name: '',
      scale: 1,
      introduce: '',
      feature_service: '',
      telephone: '',
      website: '',
      open_date: '',
      open_time: '',
      price: -1,
      best_month: '',
      score: 5,
      lng: '',
      lat: '',
      video: '',
      email: '',
      imgcover: '',
      price_type: ''
    },
    scale: '',
    typeTxt: '',
    imgList: '',
    multiple: {
      type: Boolean,
      default: true
    },
    userId: 75,
    addimgList: '',
    img_cover: '',
    service: [],
    feature_service: '',
    serviceVal: [],
    feature_serviceVal: ''
  }),
  methods: {
    doDelete () {
      this.axios.get(api.camp.del, {params: {id: this.$route.params.id}})
      .then(response => {
        if (response.data.code === 200) {
          this.$refs['alert'].show('删除成功', {type: 'success'})
          this.$router.go(-1)
        } else {
          this.$refs['alert'].show('删除失败')
        }
      })
    },
    open (target) {
      this.$refs[target].open()
    },
    close (target) {
      this.$refs[target].close()
    },
    doClose () {
      this.$router.go(-1)
    },
    getDetail () {
      this.axios.get(api.camp.find, {params: {id: this.$route.params.id}})
      .then(response => {
        if (response.data.code === 200) {
          this.data = response.data.data
          this.getImglist()
        }
      })
    },
    getScale () {
      this.axios.get(api.camp.campConf, {params: {type: this.$route.query.type}})
      .then(response => {
        if (response.data.code === 200) {
          this.scale = response.data.data.scale
          this.service = response.data.data.service.list
          this.feature_service = response.data.data.feature_service
        }
      })
    },
    showBtn () {
      this.isShow ? this.isShow = false : this.isShow = true
    },
    saveBtn () {
      for (var key in this.data) {
        for (var keys in this.postData) {
          if (keys === key) {
            this.postData[keys] = this.data[key]
          }
        }
      }
      this.axios.post(api.camp.edit, this.postData)
      .then(response => {
        if (response.data.code === 200) {
          this.getDetail()
          this.isShow = false
          this.$refs['alert'].show('修改成功', {type: 'success'})
        } else {
          this.$refs['alert'].show('修改失败')
        }
      })
    },
    typeList () {
      let ind = this.$route.query.type * 1
      console.log(ind)
      if (ind === 0) {
        this.typeTxt = '停车点'
      } else if (ind === 1) {
        this.typeTxt = '营地'
      } else if (ind === 2) {
        this.typeTxt = '景点'
      } else if (ind === 3) {
        this.typeTxt = '美食'
      } else if (ind === 4) {
        this.typeTxt = '修理厂'
      } else if (ind === 5) {
        this.typeTxt = '加气站'
      }
    },
    noBtn (ind) {
      this.axios.post(api.camp.updStatus, {id: this.data.id, status: ind})
      .then(response => {
        if (response.data.code === 200) {
          if (ind === 1) {
            this.$refs['alert'].show('审核通过', {type: 'success'})
          } else {
            this.$refs['alert'].show('驳回成功', {type: 'success'})
          }
        } else {
          this.$refs['alert'].show('审核失败', {type: 'success'})
        }
      })
    },
    getImglist () {
      this.axios.get(api.camp.imglist, {params: {id: this.data.id}})
      .then(response => {
        if (response.data.code === 200) {
          this.imgList = response.data.data.list
        }
      })
    },
    delimg (ind) {
      this.axios.post(api.camp.imgdel, {id: ind})
      .then(response => {
        if (response.data.code === 200) {
          this.$refs['alert'].show('删除成功', {type: 'success'})
          this.getImglist()
        } else {
          this.$refs['alert'].show('删除失败')
        }
      })
    },
    addServiceItem (item) {
      this.axios.post(api.camp.server_bind_add, {
        s_id: item.id,
        c_id: this.$route.params.id
      })
      .then(response => {
        if (response.data.code === 200) {
          this.getDetail()
        } else {
          this.$refs['alert'].show('添加失败')
        }
      })
    },
    delServiceItem (item) {
      this.axios.get(api.camp.server_bind_del, {
        params: {
          id: item.id
        }
      })
      .then(response => {
        if (response.data.code === 200) {
          this.getDetail()
        } else {
          this.$refs['alert'].show('删除失败')
        }
      })
    },
    editService1 (item) {
      if (item) {
        this.editService = item
      }
      this.open('editService')
    },
    editServiceNum (item) {
      this.serviceNum = item
      this.open('serviceNum')
    },
    editNum () {
      this.axios.post(api.camp.server_bind_edit, {
        id: this.serviceNum.id,
        num: this.serviceNum1
      })
      .then(response => {
        if (response.data.code === 200) {
          this.close('serviceNum')
          this.serviceNum1 = ''
          this.getDetail()
        }
      })
    },
    saveService () {
      if (this.editService.id) {
        this.axios.post(api.camp.server_edit, this.editService)
        .then(response => {
          this.close('editService')
          this.getScale()
        })
      } else {
        this.axios.post(api.camp.server_add, {
          ...this.editService,
          type: this.$route.query.type
        })
        .then(response => {
          this.close('editService')
          this.getScale()
        })
      }
    },
    // 删除服务配置
    delService0 (item) {
      this.serviceItem = item
      this.open('delService')
    },
    delService () {
      this.axios.get(api.camp.server_del, {
        params: {
          id: this.serviceItem.id
        }
      })
      .then(response => {
        if (response.data.code === 200) {
          this.close('delService')
          this.getScale()
        }
      })
    },
    setCover (link) {
      console.log(link)
    }
  },
  created () {
    this.typeList()
    this.getDetail()
    this.getScale()
  },
  watch: {
    addimgList (val) {
      if (isJson(val)) {
        let arr = JSON.parse(val)
        for (var key of arr) {
          this.axios.post(api.camp.imgadd, {c_id: this.data.id, uid: this.userId, img: key})
          .then(response => {
            if (response.data.code === 200) {
              this.getImglist()
            }
          })
        }
      }
    }
  }
}
</script>
<style scope>
  .fed-avatar img{
    width: 40px;
    height: 40px;
  }
  td{
    max-width: 500px;
  }
  .img-m-t img{
    margin-top: 5px;
  }
  .input{
    width: 100%;
    height: 100px;
    resize: none;
    padding: 5px;
  }
  .img-list span{
    width: 40%;
    position: relative;
    height: 200px;
    float: left;
    margin: 0 5%;
    overflow: hidden;
  }
  .img-list span i{
    position: absolute;
    right: 10px;
    top: 10px;
    font-style: normal;
    width: 40px;
    height: 40px;
    background: red;
    border-radius: 20px;
    text-align: center;
    line-height: 40px;
    color: #FFFFFF;
    font-size: 20px;
  }
  .img-list span img{
    width: 100%;
  }
  .camp_imgcover {
    width: 280px;
  }
</style>
