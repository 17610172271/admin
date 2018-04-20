<template>
<div>
  <div class="b-b wrapper">
    <div class="pull-right m-t-n-xs">
      <div class="btn-group">
        <server-charge :data="server" @confirm="doEdit"></server-charge>  
        <router-link :to="{name: 'agency_edit'}" class="btn btn-cutom"><i class="icon icon-note"></i> 编辑</router-link>
      </div>
      <div class="btn-group">
        <a @click="open('reject')" class="btn btn-danger"><i class="icon icon-ban"></i> 驳回申请</a>
        <a @click="open('apply')" class="btn btn-success"><i class="icon icon-check"></i> 通过审核</a>
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
      <span class="text-lg">商家详情</span>
      <label class="label label-default" v-if="data.status == '1'">待审核</label>
      <label class="label label-danger" v-if="data.status == '2'">已驳回：{{data.reject}}</label>
      <label class="label label-success" v-if="data.status == '3'">已通过</label>
    </div>

  </div>
  <div class="wrapper">
    <table class="table table-bordered">
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
          <td class="w-xs">名称</td>
          <td>{{data.name}}</td>
        </tr>
        <tr>
          <td>简称</td>
          <td>{{data.sort_name}}</td>
        </tr>
        <tr>
          <td>电话</td>
          <td>{{data.phone_number}}</td>
        </tr>
        <tr>
          <td>地址</td>
          <td>
            {{data.province}} {{data.city}} {{data.area}} {{data.address}}
          </td>
        </tr>
        <tr>
          <td>网址</td>
          <td>{{data.website}}</td>
        </tr>
        <tr>
          <td>联系人</td>
          <td>
              {{data.contact}}
          </td>
        </tr>
        <tr>
          <td>电话</td>
          <td>
              {{data.phone_number}}
          </td>
        </tr>
        <tr>
          <td>邮箱</td>
          <td>{{data.email}}</td>
        </tr>
        <tr>
          <td>时间</td>
          <td>
            <div>
              创建时间：{{data.created_at}}
            </div>
            <div>
              更新时间：{{data.updated_at}}
            </div>
          </td>
        </tr>
        <tr>
          <td>用户</td>
          <td>{{data.user_id}}</td>
        </tr>
        <tr>
          <td>营业执照号</td>
          <td>{{data.business_licence_code}}</td>
        </tr>
        <tr>
          <td>营业执照照片</td>
          <td>
            <a :href="data.business_licence_image" target="_blank">
              <img :src="data.business_licence_image | ossResize('middle')" alt="" class="w-lg">
            </a>
          </td>
        </tr>
        <tr>
          <td>法人姓名</td>
          <td>{{data.corporation_name}}</td>
        </tr>
        <tr>
          <td>法人身份证号</td>
          <td>{{data.corporation_id}}</td>
        </tr>
        <tr>
          <td>法人身份证照片</td>
          <td>
            <a :href="corporation_id_image[0]" target="_blank"><img :src="corporation_id_image[0] | ossResize('middle')" alt="" class="w-lg"></a>
            <a :href="corporation_id_image[1]" target="_blank"><img :src="corporation_id_image[1] | ossResize('middle')" alt="" class="w-lg"></a>
          </td>
        </tr>
        <tr>
          <td>logo</td>
          <td>
            <img :src="data.logo | ossResize('small')" class="w-sm">
          </td>
        </tr>
        <tr>
          <td>介绍</td>
          <td v-html="data.instruduction"></td>
        </tr>
      </tbody>
    </table>
  </div>
  <alert ref="alert"></alert>
  </div>
</template>
<script>
import api from '@/api'
import {ConfirmButton, Modal, Alert} from '@/components'
import FormSelect from '@/components/form-select/rv_edit'
import ServerCharge from './server_charge'
export default {

  components: {
    ConfirmButton,
    FormSelect,
    Modal,
    Alert,
    ServerCharge
  },
  data: () => ({
    data: {
      name: null,
      corporation_id_image: ''
    },
    server: '',
    reject: '',
    charge_type: 'title',
    charge_number: '111',
    charge_type_list: [{name: '百分比', value: '1'}, {name: '实际金额', value: '2'}],
    charge_title: '服务费类型',
    unit: '%'
  }),
  created () {
    this.getDetail()
  },
  computed: {
    corporation_id_image () {
      return this.data.corporation_id_image ? this.data.corporation_id_image.split(',') : []
    }
  },
  methods: {
    doApply () {
      this.axios.post(api.agency.editStatus, {
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
    },
    doReject () {
      if (this.reject.length > 2) {
        this.axios.post(api.agency.editStatus, {
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
        this.$refs.alert.show('驳回理由太短')
      }
    },
    open (target) {
      this.$refs[target].open()
    },
    close (target) {
      this.$refs[target].close()
    },
    getDetail () {
      this.axios.get(api.agency.detail, {params: {id: this.$route.params.id}})
      .then(response => {
        if (response.data.code === 200) {
          this.data = response.data.data
          this.server = {charge_type_list: this.charge_type_list, charge_type: this.data.charge_type, charge_number: this.data.charge_number, id: this.data.id}
        }
      })
    },
    setWeight (val) {
      this.axios.post(api.agency.editWeight, {
        id: this.data.id,
        weight: val
      }).then(response => {
        if (response.data.code === 200) {
        }
      })
    },
    doEdit (item) {
      this.axios.post(api.withdraw.edit, {
        id: item.id,
        status: item.status,
        reject: item.reject
      })
    }
  },
  watch: {
    charge_type (val) {
      if (val.name === '百分比') {
        this.unit = '%'
      } else if (val.name === '实际金额') {
        this.unit = '元'
      } else {
        this.unit = ''
      }
    }
  }
}
</script>
<style scoped>
  .w-md {
    width: 160px;
    display: inline-block;
  }
  .form-input {
    width: 115px;
    height: 36px;
    text-align: center;
    background-color: #f8f8f8;
  }
</style>
