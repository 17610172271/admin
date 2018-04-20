<template>
  <div class="model-detail">
    <div class="model-detail-header text-lg">
      车型库详情<button class="pull-right text-md bg-orange text-white" @click="addData">新增</button>
    </div>
    <div class="model-detail-content">
      <div class="detail-brand-name text-sm">
        品牌名称： <input type="text" class="text-lg text-muted" v-model="data.name">
      </div>
      <div class="detail-brand-logo text-sm">
        品牌logo: <file-upload v-model="data.logo"><span>点击上传logo图片</span></file-upload>
      </div>
    </div>
    <div class="detail-model-list m-t-lg">
      <div class="model-list-header">
        <span class="pull-left">车型</span>
        <span class="pull-right">操作</span>
      </div>
      <ul class="model-list-body text-md">
        <li v-for="item in data.rv_type_list">
          <span class="pull-left">
            <span v-show="!item.edit">{{item.name}}</span>
            <input type="text" v-model="item.name" v-show="item.edit">
          </span>
          <span class="pull-right">
            <a href="javascript:;" class="m-r-lg" v-show="!item.edit" @click="item.edit = !item.edit">编辑</a>
            <a href="javascript:;" class="m-r-lg" v-show="item.edit" @click="editModel(item)">保存</a>
            <a href="javascript:;" v-show="!item.edit" @click="delModel(item)">删除</a>
            <a href="javascript:;" v-show="item.edit" @click="cancelItem(item)">取消</a>
          </span>
        </li>
      </ul>
    </div>
    <div class="model-detail-submit">
      <button @click="cancel">取消</button>
      <button @click="editBrand">保存</button>
    </div>
    <modal ref="delModel">
      <div class="p-sm add-brand">
        <p>您确定要删除型号为【{{delItem.name}}】的房车吗？</p>
        <div class="text-center m-t-lg dobind-btn">
          <button class="bg-muted m-r-md" @click="close('delModel')">取消</button>
          <button class="bg-orange" @click="doDel">确定</button>
        </div>
      </div>
    </modal>
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
import { FileUpload, Modal } from '@/components'
import api from '@/api'
export default {
  data: () => ({
    data: {
      id: 1,
      name: '梅赛德斯奔驰',
      logo: '123',
      rv_type_list: [
        {id: 1, name: '荣享'},
        {id: 2, name: '荣享1'},
        {id: 3, name: '荣享2'}
      ]
    },
    delItem: {}
  }),
  components: {
    FileUpload,
    Modal
  },
  created () {
    this.initData()
  },
  methods: {
    initData () {
      this.getData()
    },
    getData () {
      this.axios.get(api.certify.brand_info, {
        params: {
          id: this.$route.params.id
        }
      })
      .then(response => {
        if (response.data.code === 200) {
          this.data = response.data.data
          this.data.rv_type_list = this.data.rv_type_list.map(val => {
            return {
              ...val,
              edit: false
            }
          })
        }
      })
    },
    editBrand () {
      this.axios.post(api.certify.edit_brand, {
        id: this.$route.params.id,
        name: this.data.name,
        logo: this.data.logo
      })
      .then(response => {
        if (response.data.code === 200) {
          this.open('success')
        }
      })
    },
    addData () {
      this.data.rv_type_list.unshift({
        id: '',
        name: '',
        edit: true
      })
    },
    editModel (item) {
      if (item.id) {
        this.axios.post(api.certify.edit_model, {
          id: item.id,
          name: item.name
        })
        .then(response => {
          if (response.data.code === 200) {
            item.edit = !item.edit
          }
        })
      } else {
        this.axios.post(api.certify.add_model, {
          name: item.name,
          brand_id: this.$route.params.id
        })
        .then(response => {
          if (response.data.code === 200) {
            item.edit = !item.edit
            // this.getData()
          }
        })
      }
    },
    cancelItem (item) {
      if (item.id) {
        item.edit = !item.edit
      } else {
        this.data.rv_type_list.shift()
      }
    },
    delModel (item) {
      this.delItem = item
      this.open('delModel')
    },
    doDel () {
      this.axios.post(api.certify.del_model, {
        id: this.delItem.id
      })
      .then(response => {
        if (response.data.code === 200) {
          this.close('delModel')
          this.delItem = {}
          this.getData()
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
  watch: {
  }
}
</script>
