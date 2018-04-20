<template>
  <div>
    <alert ref="alert"></alert>
  <div class="wrapper b-b">
    <div class="pull-right m-t-n-xs">
      <div class="btn-group">
        <router-link :to="{name: 'fee'}" class="btn btn-cutom">价格&排期</router-link>
        <router-link :to="{name: 'rv_edit'}" class="btn btn-cutom"><i class="icon icon-note"></i> 编辑</router-link>
      </div>
      <div class="btn-group">
        <a @click="open('reject')" class="btn btn-danger"><i class="icon icon-ban"></i>  驳回申请</a>
        <a @click="open('apply')" class="btn btn-success"><i class="icon icon-check"></i>  通过审核</a>
      </div>
      <modal ref="reject">
        <div class="text-center text-lg padder-v">
          驳回申请
        </div>
        <div  class="clear padder-v-xs">
          <textarea class="form-input" placeholder="驳回理由" v-model="reject"></textarea>
        </div>
        <div class="text-center padder-v">
          <a class="btn btn-md btn-orange m-r" @click="doReject">确定</a>
          <a class="btn btn-md btn-bordered" @click="close('reject')">取消</a>
        </div>
      </modal>
      <modal ref="apply">
        <div class="text-center text-lg padder-v">
          确定要通过审核？
        </div>
        <div class="text-center padder-v">
          <a class="btn btn-md btn-orange m-r" @click="doApply">确定</a>
          <a class="btn btn-md btn-bordered" @click="close('apply')">取消</a>
        </div>
      </modal>
    </div>
    <div>
      <span class="text-lg">车辆详情</span>
      <label class="label label-warning" v-if="data.status == '0'">草稿</label>
      <label class="label label-default" v-if="data.status == '1'">待审核</label>
      <label class="label label-danger" v-if="data.status == '2'">已驳回：{{data.reject}}</label>
      <label class="label label-success" v-if="data.status == '3'">已通过</label>
    </div>
  </div>
  <div class="wrapper">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th class="w-sm">详情</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>权重</td>
          <td>
            <div>
              <input type="number" class="form-input table-form-input" v-model="data.weight" @change="setWeight(data.weight)">
            </div>
          </td>
        </tr>
        <tr>
          <td>标题</td>
          <td>{{data.title}}</td>
        </tr>
        <tr>
          <td>车牌</td>
          <td>{{data.plate_number}}</td>
        </tr>
        <tr>
          <td>品牌</td>
          <td>{{data.brand_name}}</td>
        </tr>
        <tr>
          <td>型号</td>
          <td>{{data.model}}</td>
        </tr>
        <tr>
          <td>视频</td>
          <td>{{data.video}}</td>
        </tr>
        <tr>
          <td>车辆行驶证扫描件</td>
          <td>
          <a :href="data.img_driver_license" target="_blank">
              <img :src="data.img_driver_license | ossResize('middle')" alt="" class="w-lg">
          </a>
          </td>
        </tr>
        <tr>
          <td>图文详情</td>
          <td v-html="data.notice"></td>
        </tr>
        <tr>
          <td>租车须知</td>
          <td v-html="data.notice"></td>
        </tr>
        <tr>
          <td>费用说明</td>
          <td v-html="data.expenses_explain"></td>
        </tr>
        <tr>
          <td>取车地点</td>
          <td>{{ data.pickup_rv.city }}{{ data.pickup_rv.name }}</td>
        </tr>
        <tr>
          <td>还车地点</td>
          <td><span v-for="store in data.return_rv">{{store.city}}{{store.name}}&nbsp;</span></td>
        </tr>
        <tr>
          <td>车辆图片</td>
          <td>
          <a :href="data.img_cover" target="_blank">
              <img :src="data.img_cover | ossResize('middle')" alt="" class="w-lg">
          </a>
          </td>
        </tr>
        <tr>
          <td>行驶证注册日期</td>
          <td>{{data.coty}}</td>
        </tr>
        <tr>
          <td>房车类型</td>
          <td>{{data.type | switchType}}</td>
        </tr>
        <tr>
          <td>变速器</td>
          <td>{{data.transmission_case | switchDang}}</td>
        </tr>
        <tr>
          <td>燃油类型</td>
          <td>{{data.actuation | switchActuation}}</td>
        </tr>
        <tr>
          <td>燃油消耗率</td>
          <td>{{data.fuel_consumption}} L/百公里</td>
        </tr>
        <tr>
          <td>准驾执照</td>
          <td>{{data.driver_license_class | switchLicense}}</td>
        </tr>
        <tr>
          <td>水箱容量</td>
          <td>{{data.water_tank}} L</td>
        </tr>
        <tr>
          <td>油箱容量</td>
          <td>{{data.fuel_tankage}} L</td>
        </tr>
        <tr>
          <td>电池容量</td>
          <td>{{data.battery}} Ah</td>
        </tr>
        <tr>
          <td>车辆高度</td>
          <td>{{data.height}}m</td>
        </tr>
        <tr>
          <td>车内高度</td>
          <td>{{data.inside_height}}m</td>
        </tr>
        <tr>
          <td>车辆宽度</td>
          <td>{{data.width}}m</td>
        </tr>
        <tr>
          <td>车辆长度</td>
          <td>{{data.length}}m</td>
        </tr>

        <tr>
          <td>单人床</td>
          <td>{{data.single_bed_4adult}}张</td>
        </tr>
        <tr>
          <td>双人床</td>
          <td>{{data.double_bed_4adult}}张</td>
        </tr>
        <tr>
          <td>座椅</td>
          <td>{{data.seat}}个</td>
        </tr>
        <tr>
          <td>桌子</td>
          <td>{{data.desk}}张</td>
        </tr>
        
        <tr>
          <td>厕所</td>
          <td>{{data.wash_room | switchTitle(1)}}</td>
        </tr>
        <tr>
          <td>淋浴</td>
          <td>{{data.water_heater | switchTitle(1)}}</td>
        </tr>
        <tr>
          <td>炉灶</td>
          <td>{{data.cooking_range | switchTitle(1)}}</td>
        </tr>
        <tr>
          <td>冰箱</td>
          <td>{{data.firdge}}L</td>
        </tr>
        <tr>
          <td>水槽</td>
          <td>{{data.poll | switchTitle(1)}}</td>
        </tr>
        <tr>
          <td>微波炉</td>
          <td>{{data.microwave_oven | switchTitle(1)}}</td>
        </tr>
        <tr>
          <td>遮阳蓬</td>
          <td>{{data.sunshade | switchTitle(1)}}</td>
        </tr>
        <tr>
        <td>纱窗</td>
          <td>{{data.screen_window | switchTitle(1)}}</td>
        </tr>
        <tr>
          <td>自行车架</td>
          <td>{{data.bicycle_frame | switchTitle(1)}}</td>
        </tr>
        <tr>
          <td>电视</td>
          <td>{{data.dvd | switchTitle(1)}}</td>
        </tr>
        <tr>
          <td>卫星天线</td>
          <td>{{data.satellite_antenna | switchTitle(1)}}</td>
        </tr>
        <tr>
          <td>发电机</td>
          <td>{{data.alternator | switchTitle(1)}}</td>
        </tr>

        <tr>
          <td>行车空调</td>
          <td>{{data.train_air_conditioner | switchTitle(1)}}</td>
        </tr>
        <tr>
          <td>驻车空调</td>
          <td>{{data.parking_air_conditioner | switchTitle(1)}}</td>
        </tr>
        
        <tr>
          <td>燃油加热器</td>
          <td>{{data.fuel_accelerator | switchTitle(1)}}</td>
        </tr>
        <tr>
          <td>起赔额度</td>
          <td>{{data.compensation}} 元</td>
        </tr>
        <tr>
          <td>投保开始时间</td>
          <td>{{data.warranty_start_time}}</td>
        </tr>
        <tr>
          <td>投保结束时间</td>
          <td>{{data.warranty_end_time}}</td>
        </tr>
        <tr>
          <td>投保公司</td>
          <td>{{data.warranty_company}}</td>
        </tr>
        <tr>
          <td>保单复印件</td>
          <td>
            <a :href="data.img_warranty" target="_blank">
              <img :src="data.img_warranty | ossResize('middle')" alt="" class="w-lg">
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>
<script>
import api from '@/api'
import {Modal, Alert} from '@/components'
const switchTitle = (str, type = 1) => {
  return parseInt(str) === 1 ? (type === 1 ? '有' : '是') : (type === 1 ? '无' : '否')
}
const switchType = (str) => {
  switch (str) {
    case '1':
      return '自行A型'
    case '2':
      return '自行B型'
    case '3':
      return '自行C型'
    case '4':
      return '自行A型'
    case '5':
      return '自行B型'
    case '6':
      return '自行C型'
    case '7':
      return '自行D型'
  }
}
const switchDang = (str) => {
  switch (str) {
    case '1':
      return '自动挡'
    case '2':
      return '手动挡'
    case '3':
      return '手/自动档'
  }
}
const switchActuation = (str) => {
  return str === '1' ? '汽油' : '柴油'
}
const switchLicense = (str) => {
  let arr = []
  if (str) {
    str = str.substr(1, str.length - 2)
    arr = str.split(',')
  }
  var license = []
  if (arr.length > 0) {
    arr.forEach((item) => {
      switch (item) {
        case '1':
          return license.push('C2')
        case '2':
          return license.push('C1')
        case '3':
          return license.push('B2')
        case '4':
          return license.push('B1')
        case '5':
          return license.push('A3')
        case '6':
          return license.push('A2')
        case '7':
          return license.push('A1')
      }
    })
  }
  return license.join(',')
}
export default {
  components: {
    Modal,
    Alert
  },
  filters: {
    switchTitle,
    switchType,
    switchDang,
    switchActuation,
    switchLicense
  },
  data: () => ({
    data: {
      pickup_rv: {
        name: '',
        city: '',
        address: '',
        driver_license_class: '[1]'
      }
    },
    reject: ''
  }),
  methods: {
    doApply () {
      if (this.data.id) {
        this.axios.post(api.rv.editStatus, {
          id: this.data.id,
          status: 3
        })
        .then(response => {
          if (response.data.code === 200) {
            this.getDetail()
            this.$refs.alert.show('提交成功', {type: 'success'})
            this.$refs['apply'].close()
          } else {
            this.$refs.alert.show(response.data.msg)
          }
        })
      }
    },
    doReject () {
      if (this.data.id && this.reject.length > 2) {
        this.axios.post(api.rv.editStatus, {
          id: this.data.id,
          status: 2,
          reject: this.reject
        })
        .then(response => {
          if (response.data.code === 200) {
            this.getDetail()
            this.$refs.alert.show('提交成功', {type: 'success'})
            this.$refs['reject'].close()
          } else {
            this.$refs.alert.show(response.data.msg)
          }
        })
      } else {
        this.$refs.alert.show('驳回理由不能少于3个字')
      }
    },
    open (target) {
      this.$refs[target].open()
    },
    close (target) {
      this.$refs[target].close()
    },
    getDetail () {
      this.axios.get(api.rv.find, {params: {id: this.$route.params.id}})
      .then(response => {
        if (response.data.code === 200) {
          this.data = response.data.data || {}
        }
      })
    },
    setWeight (val) {
      this.axios.post(api.rv.edit, {
        id: this.data.id,
        weight: val
      }).then(response => {
        if (response.data.code === 200) {
          console.log('success')
        }
      })
    }
  },
  created () {
    this.getDetail()
  }
}
</script>
