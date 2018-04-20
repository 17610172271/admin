<template>
  <div>
    <div class="b-b padder-v text-lg text-thin">
      <div class="padder">
        <span class=" b-l b-2x b-colored text-xs m-r-xs"></span>
        <span class="m-r-xs">广告管理</span>
        <span class="text-xs wfc-icon-arrow-right-thin m-r-xs"></span>
        <span class="text-muted">修改广告</span>
      </div>
    </div>
    <div class="wrapper wrapper-custom">
      <form @submit.prevent="onSubmit">
        <div class="form-group" v-if="isShow">
          <label class="check-button">
            <span class="required-icon">*</span> id：&nbsp;
            <input type="text" placeholder="id" v-model="list.id" class="form-input">
          </label>
        </div>
        <div class="form-group">
          <label class="check-button">
            <span class="required-icon">*</span> 名字：&nbsp;
            <input type="text" placeholder="名字" v-model="list.name" class="form-input">
          </label>
        </div>
        <div class="form-group">
          <label class="check-button">
            <span class="required-icon">*</span> 标题：&nbsp;
            <input type="text" placeholder="标题" v-model="list.title" class="form-input">
          </label>
        </div>
        <div class="form-group">
          <label class="check-button">
            <span class="required-icon">*</span> 描述：&nbsp;
            <input type="text" placeholder="描述" v-model="list.remark" class="form-input">
          </label>
        </div>
        <div class="clear padder-v m-b text-center m-l-lg">
          <a class="btn btn-lg w-sm btn-orange" @click="onSubmit"  :disabled="loading">提交</a>
        </div>
        <div class="clear padder-v m-b text-center m-l-lg">
          <router-link :to="{ name: 'adv'}" class="btn btn-lg w-sm btn-orange">取消</router-link>
        </div>
      </form>
    </div>
    <alert ref="alert"></alert>
  </div>
</template>
<script>
import api from '@/api'
import { Alert } from '@/components'

export default {
  components: {
    Alert
  },
  data () {
    return {
      loading: false,
      formData: '',
      list: '',
      isShow: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.axios.get(api.adv.category_detail, {
        params: {
          id: this.$route.params.id
        }
      })
        .then(response => {
          if (response.data.code === 200) {
            this.list = response.data.data || []
            console.log(response)
          }
        })
    },
    onSubmit (status) {
      if (this.$route.params.id) {
        this.axios.post(api.adv.category_edit, {
          name: this.list.name,
          title: this.list.title,
          remark: this.list.remark,
          id: this.list.id
        })
        .then(response => {
          if (response.data.code === 200) {
            console.log(response)
            this.alert('修改成功', {delay: 1000, callBack: this.next, type: 'success'})
          } else {
            this.loading = false
            this.alert(response.data.msg, {type: 'warning'})
          }
        })
        .catch(error => {
          this.loading = false
          this.alert('连接服务器失败')
          return Promise.reject(error)
        })
      } else {
        this.axios.post(api.adv.category_add, {
          name: this.list.name,
          title: this.list.title,
          remark: this.list.remark
        })
        .then(response => {
          if (response.data.code === 200) {
            console.log(response)
            this.alert('添加成功', {delay: 1000, callBack: this.next, type: 'success'})
          } else {
            this.loading = false
            this.alert(response.data.msg, {type: 'warning'})
          }
        })
        .catch(error => {
          this.loading = false
          this.alert('连接服务器失败')
          return Promise.reject(error)
        })
      }
    },
    next () {
      this.$router.replace({name: 'adv'})
    },
    alert (msg, config) {
      this.$refs['alert'].show(msg, config)
    }
  }
}
</script>
<style scoped>
  .m-b {
    float: left;
  }
  .form-input {
    width: 300px;
  }
</style>

