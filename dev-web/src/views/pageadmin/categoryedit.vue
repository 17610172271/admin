<template>
  <div class="hello">
    <div class="wrapper padder-md">
      <form @submit.prevent="onSubmit">
        <div class="form-group" v-if="isAdd">
          <label class="check-button">
          <span class="required-icon">*</span> I D：&nbsp;&nbsp;&nbsp;
            <input type="text" v-model="data.id" placeholder="ID" disabled v-if="isAdd" class="form-input">
          </label>
        </div>
        <div class="form-group">
          <label class="check-button">
          <span class="required-icon">*</span> 名字：&nbsp;
            <input type="text" v-model="data.name" placeholder="名字" class="form-input">
          </label>
        </div>
        <div class="form-group">
          <label class="check-button">
          <span class="required-icon">*</span> 类型：&nbsp;
            <input type="text" v-model="data.cname" placeholder="类型" class="form-input">
          </label>
        </div>
        <br>
        <input type="submit" class="sub btn btn-md w-sm btn-orange" value="提交">
        <router-link :to="{ name: 'pageadmin'}" class="btn btn-md w-sm btn-orange">取消</router-link><br>
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
      data: '',
      id: '',
      name: '',
      cname: '',
      isAdd: false
    }
  },
  created () {
    this.getDetail()
    this.showId()
  },
  methods: {
    getDetail () {
      this.axios.get(api.pageadmin.category_detail, {
        params: {
          id: this.$route.params.type_id
        }
      })
      .then(response => {
        if (response.data.code === 200) {
          this.data = response.data.data || []
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
    },
    onSubmit (status) {
      if (this.$route.params.type_id) {
        this.axios.post(api.pageadmin.category_edit, {
          id: this.data.id,
          name: this.data.name,
          cname: this.data.cname
        })
        .then(response => {
          if (response.data.code === 200) {
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
        this.axios.post(api.pageadmin.category_add, {
          name: this.data.name,
          cname: this.data.cname
        })
        .then(response => {
          if (response.data.code === 200) {
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
      }
    },
    next () {
      if (this.$route.params.type_id) {
        this.$router.replace({name: 'article_list'})
      } else {
        this.$router.replace({name: 'pageadmin'})
      }
    },
    alert (msg, config) {
      this.$refs['alert'].show(msg, config)
    },
    showId () {
      // if (this.$route.params.type_id) {
      //   // this.isAdd = true
      // } else {
      //   this.isAdd = false
      // }
    },
    onRouteChange () {
      this.getDetail()
    }
  },
  watch: {
    '$route': 'onRouteChange'
  }
}
</script>
<style scoped>
  .hello {
    width: 650px;
    height: 545px;
    float: left;
  }
  .w-sm {
    width: 120px;
    margin-left: 20px;
  }
  .form-input {
    width: 40%;
  }
  .wrapper {
    padding: 40px 30px;
  }
</style>
