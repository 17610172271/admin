<template>
  <div class="hello">
    <div class="text-lg text-thin">
      <div class="padder delete-box"  v-if="formData!=='false'">
        <span class="delete" @click="control"><span class="icon icon-trash"></span>删除</span>
      </div>
    </div>
    <div class="wrapper padder-md"  v-if="code === 200">

     <adv-form v-model="formData"></adv-form>

      <div class="clear padder-v m-b text-center">
        <a class="btn btn-md w-sm btn-orange" @click="onSubmit"  :disabled="loading">提交</a>
        <a class="btn btn-md w-sm btn-orange" @click="success"  :disabled="loading">取消</a>
        
      </div>
    </div>
    <!-- 确认删除弹框 -->
     <div ref="delete" v-if="isTrue" class="modals">
      <div class="text-center text-lg padder-v">
        确定要删除？
      </div>
      <div class="text-center padder-v">
        <a class="btn btn-md btn-orange m-r" @click="Delete(delId)">确定</a>
        <a class="btn btn-md btn-bordered" @click="control()">取消</a>
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
        formData: null,
        code: 0,
        isTrue: false,
        delId: ''
      }
    },
    created () {
      this.axios.get(api.pageadmin.detail, { params: {id: this.$route.params.id} })
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
        if (this.$route.params.id) {
          if (isJson(this.formData)) {
            this.loading = true
            this.axios.post(api.pageadmin.edit, JSON.parse(this.formData))
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
            this.axios.post(api.pageadmin.add, JSON.parse(this.formData))
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
      Delete () {
        this.axios.get(api.pageadmin.del, {
          params: {
            id: this.$route.params.id
          }
        })
        .then(response => {
          if (response.data.code === 200) {
            // 提交成功
            this.isTrue = !this.isTrue
            this.alert('保存成功,请等待审核', {delay: 1000, callBack: this.success})
          } else {
            this.isTrue = !this.isTrue
            this.loading = false
            this.alert(response.data.msg || '未知错误')
          }
        })
      },
      alert (msg, config) {
        this.$refs['alert'].show(msg, config)
      },
      control () {
        this.isTrue = !this.isTrue
      },
      success () {
        this.$router.go(-1)
      }
    }
  }
</script>
<style scoped>
  .delete-box {
    text-align: right;
    
  }
  .delete {
    display: inline-block;
    font-size: 14px;
    color: #000;
    cursor: pointer;
    margin-right: 70px;
    margin-top: 20px;
  }
  .modals {
    width: 300px;
    height: 150px;
    background-color: #fff;
    position: absolute;
    top: 20%;
    left: 40%;
    z-index: 11;
    box-shadow: 1px 1px 1px rgba(0,0,0,.3) , -1px -1px 1px rgba(0,0,0,.1);
  }
  .hello {
    width: 650px;
    height: 545px;
    float: left;
  }
  .w-sm {
    width: 120px;
  }
</style>
