<template>
  <div>
    <div class="b-b padder-v text-lg text-thin">
      <div class="padder">
        <span class=" b-l b-2x b-colored text-xs m-r-xs"></span>
        <span class="m-r-xs">店铺管理</span>
        <span class="text-xs wfc-icon-arrow-right-thin m-r-xs"></span>
        <span class="text-muted">修改店铺信息</span>
      </div>
    </div>

    <div class="wrapper padder-md" v-if="formData">
      
      <store-form v-model="formData"></store-form>

       <div class="clear padder-v m-b text-center m-l-lg">
         <a class="btn btn-lg w-sm btn-orange" @click="onSubmit">提交修改</a>
       </div>
    </div>
    <alert ref="alert"></alert>
  </div>
</template>
<script>
import api from '@/api'
import StoreForm from './form'
import { Alert } from '@/components'

export default {
  components: {
    StoreForm,
    Alert
  },
  data: () => ({
    msg: '',
    formData: '',
    data: {},
    pickrules: [],
    backrules: [],
    otherrules: []
  }),
  methods: {
    getDetail () {
      this.axios.get(api.store.find, {params: {id: this.$route.params.id}})
      .then(response => {
        if (response.data.code === 200) {
          this.data = response.data.data
          if (this.data.extra_service) {
            for (var i = 0; i < this.data.extra_service.length; i++) {
              if (this.data.extra_service[i].type === '2') {
                this.pickrules.push(this.data.extra_service[i])
                this.data.extra_service.splice(i, 1)
                i--
              } else if (this.data.extra_service[i].type === '3') {
                this.backrules.push(this.data.extra_service[i])
                this.data.extra_service.splice(i, 1)
                i--
              } else if (this.data.extra_service[i].type === '5') {
                this.otherrules.push(this.data.extra_service[i])
                this.data.extra_service.splice(i, 1)
                i--
              }
            }
          }
          this.data.pickrules = this.pickrules
          this.data.backrules = this.backrules
          this.data.otherrules = this.otherrules
          this.formData = JSON.stringify(this.data)
        } else {
          this.msg = response.data.msg
        }
      })
    },
    onSubmit () {
      var data = JSON.parse(this.formData)
      for (var i = 0; i < data.pickrules.length; i++) {
        data.extra_service.push(data.pickrules[i])
      }
      for (var j = 0; j < data.backrules.length; j++) {
        data.extra_service.push(data.backrules[j])
      }
      for (var k = 0; k < data.otherrules.length; k++) {
        data.extra_service.push(data.otherrules[k])
      }
      this.axios.post(api.store.edit, data)
      .then(response => {
        if (response.data.code === 200) {
          this.alert('保存成功', {delay: 1000, callBack: this.next, type: 'success'})
        } else {
          this.$refs['alert'].show(response.data.msg, {type: 'warning'})
        }
      })
    },
    next () {
      this.$router.replace({name: 'store_detail'})
    },
    alert (msg, config) {
      this.$refs['alert'].show(msg, config)
    }
  },
  created () {
    this.getDetail()
  }
}
</script>
