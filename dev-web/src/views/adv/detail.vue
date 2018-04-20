<template>
  <div>
    <div class="b-b padder-v text-lg text-thin">
      <div class="padder">
        <span class="m-r-xs" v-if="">广告编辑</span> 
      </div>
    </div>
    <div class="wrapper padder-md"  v-if="code === 200">

     <adv-form v-model="formData"></adv-form>

      <div class="clear padder-v m-b text-center m-l-lg">
        <a class="btn btn-lg w-sm btn-orange" @click="onSubmit"  :disabled="loading">提交</a>
        <a class="btn btn-lg w-sm btn-bordered m-r-lg" @click="success">取消</a>
      </div>
    </div>
    <alert ref="alert"></alert>
  </div>
</template>
<script>
  import AdvForm from './form'
  import { Alert } from '@/components'
  import api from '@/api'
  import { isJson } from '@/tools/util'

  export default {
    components: {
      AdvForm,
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
      this.axios.get(api.adv.find, { params: {id: this.$route.params.type_id} })
      .then(response => {
        this.code = response.data.code
        if (response.data.code === 200) {
          this.formData = JSON.stringify(response.data.data)
        } else {
          this.alert(response.data.msg)
        }
      })
    },
    methods: {
      onSubmit () {
        if (this.$route.params.type_id) {
          if (isJson(this.formData)) {
            this.loading = true
            this.axios.post(api.adv.edit, JSON.parse(this.formData))
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
        } else {
          if (isJson(this.formData)) {
            this.loading = true
            this.axios.post(api.adv.add, JSON.parse(this.formData))
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
        }
      },
      alert (msg, config) {
        this.$refs['alert'].show(msg, config)
      },
      success () {
        this.$router.go(-1)
      }
    }
  }
</script>
