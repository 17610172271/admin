<template>
  <div class="certify-detail" id="certify-detail">
    <div class="certify-detail-header">
      <div class="pull-right m-t-n-xs">
<!--         <div class="btn-group">
          <router-link :to="{name: 'agency_edit'}" class="btn btn-cutom"><i class="icon icon-note"></i> 编辑</router-link>
        </div> -->
        <div class="btn-group">
          <a @click="open('reject')" class="btn btn-danger"><i class="icon icon-ban"></i> 驳回申请</a>
          <a @click="open('apply')" class="btn btn-success"><i class="icon icon-check"></i> 通过审核</a>
        </div>
        <modal ref="reject">
          <div class="text-center text-lg padder-v">
            驳回申请
          </div>
          <div  class="clear padder-v-xs">
            <textarea class="form-input" placeholder="驳回理由" v-model="failure_reason"></textarea>
          </div>
          <div class="text-center padder-v">
            <a class="btn btn-md btn-orange m-r" @click="editStatus(2)">确定</a>
            <a class="btn btn-md btn-bordered" @click="close('reject')">取消</a>
          </div>
        </modal>
        <modal ref="apply">
          <div class="text-center text-lg padder-v">
            确定要通过审核？
          </div>
          <div class="text-center padder-v">
            <a class="btn btn-md btn-orange m-r" @click="editStatus(1)">确定</a>
            <a class="btn btn-md btn-bordered" @click="close('apply')">取消</a>
          </div>
        </modal>
      </div>
      <div>
        <span class="text-lg">审核详情页</span>
        <label class="label label-default" v-if="data.status == '0'">待审核</label>
        <label class="label label-danger" v-if="data.status == '2'">已驳回：{{data.failure_reason}}</label>
        <label class="label label-success" v-if="data.status == '1'">已通过</label>
      </div>
    </div>
    <div class="certify-detail-content m-t-lg text-md">
      <div class="certify-detail-nickname">
        <span class="text-bold text-muted">用户昵称</span> <span class="m-l-lg">{{data.nickname}}</span>
      </div>
      <div class="certify-detail-nickname">
        <span class="text-bold text-muted">手机号</span> <span class="m-l-lg">{{data.tel}}</span>
      </div>
      <div class="certify-detail-nickname">
        <span class="text-bold text-muted">车辆信息</span> <span class="m-l-lg" v-show="data.brand_name">{{data.brand_name}}</span> <span class="m-l-lg">{{data.rv_type_name}} <span class="m-l-sm p-leval-10 p-vertical-4 bg-muted" v-show="data.type==2">其他</span></span>
        <div href="javascript:;" class="p-leval-15 m-l-md connect-brand" @click="openBrand" v-show="data.type==2">关联品牌车型</div>
      </div>
      <div>
        <div class="driver-permit">
          <div class="text-bold text-muted m-b-md certify-detail-nickname">行驶证</div>
          <div class="clear">
            <a :href="data.driving_license" target="_blank" class="driver-permit-img pull-left" style="width:450px;height:300px;background-color:#f2f2f2;">
              <img :src="data.driving_license | ossResize('middle')" alt="" width="100%" height="100%">
            </a>
            <div class="driver-permit-info pull-right" style="width:300px;height:400px;">
              <div>
                <span class="permit-ipt-text">车牌号码</span> <input type="text" v-model="data.plate_number">
              </div>
              <div>
                <span class="permit-ipt-text">车辆类型</span> <input type="text" v-model="data.vehicle_type">
              </div>
              <div>
                <span class="permit-ipt-text">使用性质</span> <input type="text" v-model="data.use_property">
              </div>
              <div>
                <span class="permit-ipt-text">品牌型号</span> <input type="text" v-model="data.brand_model">
              </div>
              <div>
                <span class="permit-ipt-text">车辆识别号</span> <input type="text" v-model="data.vin_number">
              </div>
              <div>
                <span class="permit-ipt-text">发动机号码</span> <input type="text" v-model="data.engine_number">
              </div>
              <div>
                <span class="permit-ipt-text">注册日期</span> <input type="text" v-model="data.regdate">
              </div>
            </div>
          </div>
        </div>
        <div class="driver-permit">
          <div class="text-bold text-muted m-b-md">驾驶证</div>
          <div class="clear">
            <a :href="data.drivers_license" target="_blank" class="driver-permit-img pull-left" style="width:450px;height:300px;background-color:#f2f2f2;">
              <img :src="data.drivers_license | ossResize('middle')" alt="" width="100%" height="100%">
            </a>
            <div class="driver-permit-info pull-right" style="width:300px;height:300px;">
              <div>
                <span class="permit-ipt-text">驾驶证证号</span> <input type="text" v-model="data.drivers_license_number">
              </div>
              <div>
                <span class="permit-ipt-text">准驾类型</span> <input type="text" v-model="data.driving_type">
              </div>
              <div>
                <span class="permit-ipt-text">有效期</span> <input type="text" v-model="data.valid_date">
              </div>
            </div>
          </div>
        </div>
        <div class="permit-submit text-center m-t-xl">
          <button class="bg-orange" @click="saveInfo">保存信息</button>
        </div>
      </div>
    </div>
    <div class="bind-brand">
      <modal ref="bindBrand" class="bind-brand-modal">
        <div class="m-b-md">
          品牌搜索<input type="text" class="m-r-xl m-l-sm" v-model="brand_name" @keyup.enter="getBrandList"> 车型搜索<input type="text" class="m-r-md m-l-sm" v-model="rv_type_name" @keyup.enter="getBrandList">
          <button @click="getBrandList">搜索</button>
        </div>
        <div class="relative">
          <ul class="car-model-title clear">
            <li class="pull-left">品牌</li>
            <li class="pull-left">车型</li>
            <li class="pull-left">操作</li>
          </ul>
          <div>
            <div class="car-model-container">
              <div class="clear car-model-item" :class="{'bg-fa': index==brandNum}" v-for="(item, index) in list" @click="getModelList(item, index)">
                {{item.brand_name}}
              </div>
            </div>
            <div class="text-center">
              <pagination></pagination>
            </div>
          </div>
          <ul class="certify-model-list">
            <li v-for="item in modelList" class="clear">
              <div class="pull-left">{{item.name}}</div>
              <div class="pull-left">
                <a href="javascript:;" class="btn-bind" @click="bindModal(item)">关联</a>
              </div>
            </li>
          </ul>
        </div>
        <div class="bind-modal">
          <modal ref="doBind">
            <div class="p-sm">
              <div>用户【{{data.nickname}}】已关联到 [{{data.brand_name}} {{data.rv_type_name}}] <br> 确定要关联替换车型为【{{brandItem.brand_name}} {{bindItem.name}}】吗？</div>
              <div class="text-center m-t-lg dobind-btn">
                <button class="bg-muted m-r-md" @click="close('doBind')">取消</button>
                <button class="bg-orange" @click="bindModel">确定</button>
              </div>
            </div>
          </modal>
        </div>
      </modal>
    </div>
    <modal ref="success">
      <div class="text-center wrap">
        保存成功
      </div>
      <div class="text-center m-t-lg dobind-btn">
        <button class="bg-muted m-r-md" @click="close('success')">取消</button>
        <button class="bg-orange" @click="close('success')">确定</button>
      </div>
    </modal>
  </div>
</template>
<script>
import api from '@/api'
import {Modal, Alert, Pagination} from '@/components'
export default {
  data: () => ({
    reject: '',
    brand_name: '',
    rv_type_name: '',
    brandNum: 0,
    list: [],
    size: 5,
    page: 1,
    modelList: '',
    brandItem: {},
    bindItem: {},
    data: {
      status: 0,
      plate_number: '',
      vehicle_type: '',
      use_property: '',
      brand_model: '',
      vin_number: '',
      engine_number: '',
      regdate: '',
      drivers_license_number: '',
      driving_type: '',
      valid_date: ''
    },
    failure_reason: null
  }),
  components: {
    Modal,
    Alert,
    Pagination
  },
  methods: {
    initData () {
      this.getData()
    },
    getData () {
      this.axios.get(api.certify.certify_info, {
        params: {
          id: this.$route.params.id
        }
      })
      .then(response => {
        if (response.data.code === 200) {
          this.data = response.data.data
        }
      })
    },
    getBrandList () {
      this.axios.get(api.certify.brand_list, {
        params: {
          rv_type_name: this.rv_type_name,
          brand_name: this.brand_name,
          page: this.$route.query.page || this.page,
          size: this.size
        }
      })
      .then(response => {
        if (response.data.code === 200) {
          this.max = Math.ceil(response.data.data.count / 10)
          this.list = response.data.data.list
          this.modelList = []
        } else {
          this.list = []
        }
      })
    },
    getModelList (item, index) {
      this.brandNum = index
      this.brandItem = item
      this.axios.get(api.certify.brand_info, {
        params: {
          id: item.id
        }
      })
      .then(response => {
        if (response.data.code === 200) {
          this.modelList = response.data.data.rv_type_list
        }
      })
    },
    bindModal (item) {
      this.bindItem = item
      this.open('doBind')
    },
    bindModel () {
      this.axios.post(api.certify.certify_bind_brand, {
        id: this.$route.params.id,
        brand_id: this.brandItem.id,
        rv_id: this.bindItem.id
      }).then(response => {
        if (response.data.code === 200) {
          this.getData()
          this.close('doBind')
          this.close('bindBrand')
        }
      })
    },
    openBrand () {
      this.brand_name = ''
      this.rv_type_name = ''
      this.getBrandList()
      this.page = 1
      this.open('bindBrand')
    },
    saveInfo () {
      this.axios.post(api.certify.certify_edit, {
        id: this.$route.params.id,
        plate_number: this.data.plate_number,
        vehicle_type: this.data.vehicle_type,
        use_property: this.data.use_property,
        brand_model: this.data.brand_model,
        vin_number: this.data.vin_number,
        engine_number: this.data.engine_number,
        regdate: this.data.regdate,
        drivers_license_number: this.data.drivers_license_number,
        driving_type: this.data.driving_type,
        valid_date: this.data.valid_date
      }).then(response => {
        if (response.data.code === 200) {
          this.open('success')
        }
      })
    },
    editStatus (status) {
      this.axios.post(api.certify.certify_status, {
        id: this.$route.params.id,
        status: status,
        failure_reason: this.failure_reason
      }).then(response => {
        if (response.data.code === 200) {
          this.failure_reason = null
          if (status === 2) {
            this.close('reject')
            this.getData()
          } else {
            this.close('apply')
            this.getData()
          }
        }
      })
    },
    open (target) {
      this.$refs[target].open()
    },
    close (target) {
      this.$refs[target].close()
    },
    cancel () {
      this.$router.go(-1)
    }
  },
  created () {
    this.initData()
  },
  watch: {
    '$route': 'getBrandList'
  }
}
</script>
