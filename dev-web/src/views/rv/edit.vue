<template>
  <div>
    <div class="b-b padder-v text-lg text-thin">
      <div class="padder">
        <span class=" b-l b-2x b-colored text-xs m-r-xs"></span>
        <router-link :to="{name: 'rv_detail'}">车辆详情</router-link>
        <span class="text-xs wfc-icon-arrow-right-thin m-r-xs"></span>
        <span class="text-muted">编辑车辆信息</span>
      </div>
    </div>
     <div class="wrapper padder-md" v-if="code === 200">

       <rv-form v-model="formData" :storelist="storelist"></rv-form>

        <div class="clear padder-v m-b text-center m-l-lg">
          <a class="btn btn-lg w-sm btn-orange" @click="onSubmit" :disabled="loading">提交审核</a>
        </div>
     </div>
     <alert ref="alert"></alert>
  </div>
</template>
<script>
import RvForm from './form'
import { Alert } from '@/components'
import api from '@/api'
import { isJson } from '@/tools/util'

export default {
  components: {
    RvForm,
    Alert
  },
  data () {
    return {
      loading: false,
      formData: '',
      code: 0
    }
  },
  created () {
    this.axios.get(api.rv.find, { params: {id: this.$route.params.id} })
    .then(response => {
      this.code = response.data.code
      if (response.data.code === 200) {
        this.storelist = response.data.data.store_list.list
        this.formData = JSON.stringify(response.data.data)
      } else {
        this.alert(response.data.msg)
      }
    })
  },
  methods: {
    onSubmit () {
      if (isJson(this.formData)) {
        this.loading = true
        this.axios.post(api.rv.edit, JSON.parse(this.formData))
        .then(response => {
          if (response.data.code === 200) {
            // 提交成功
            this.alert('保存成功,请等待审核', {delay: 1000, callBack: this.success})
          } else {
            this.loading = false
            this.alert(response.data.msg || '未知错误')
          }
        })
        .catch(error => {
          this.loading = false
          this.alert('连接错误,请稍后再试')
          return Promise.reject(error)
        })
      }
    },
    alert (msg, config) {
      this.$refs['alert'].show(msg, config)
    },
    success () {
      this.$router.replace({ name: 'rv' })
    }
  }
}
</script>
