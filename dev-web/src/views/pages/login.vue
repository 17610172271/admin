<template>
  <div>
    <alert ref="alert"></alert>
    <nav-header></nav-header>
  <div class="app container">
  <div class="wrapper table-wrapper">
    <div class="login-form-container">
      <form class="form login-form" @submit.stop.prevent="onSubmit">
        <div class="nav-bar row">
          <div class="col-xs-6 active">
            <a>管理员登录</a>
            <div class="active-line"></div>
          </div>
          <div class="col-xs-6">
            <a>快捷登录</a>
            <div class="active-line"></div>
          </div>
        </div>
        <div class="form-group">
          <label>管理账号</label>
          <input type="text" name="" v-model="formData.username" class="form-input">
        </div>
        <div class="form-group">
          <label>密码</label>
          <input type="password" name="" v-model="formData.passwd" class="form-input">
        </div>
        <div class="form-group">
          <div class="pull-right">
            <a href="#">忘记密码？</a>
          </div>
          <label>
            <input type="checkbox" name="" v-model="remember"> 30天内自动登录
          </label>
        </div>
        <div class="form-group">
          <div class="submit-group">
            <button
              type="submit"
              name="button"
              class="btn btn-orange text-lg btn-block"
              :disabled="loading"
              >登录</button>
          </div>
        </div>
        <div class="line"></div>
        <div class="login-form-footer">
          北京露营者房车科技有限公司
        </div>
      </form>
      </div>
  </div>
  </div>

  </div>
</template>
<script>
import NavHeader from '../common/nav-header'

import { mapActions, mapGetters } from 'vuex'
import { Alert } from '@/components'
import api from '@/api'

export default {
  name: 'login',
  components: {
    NavHeader,
    Alert
  },
  data () {
    return {
      formData: {
        username: '',
        passwd: ''
      },
      remember: true,
      loading: false
    }
  },
  computed: mapGetters({
    isLoggedin: 'isLoggedin'
  }),
  methods: {
    ...mapActions([
      'saveToken'
    ]),
    onSubmit () {
      this.axios.post(api.account.login, this.formData)
      .then(response => {
        if (response.data.code === 200 && response.data.data.role > 0 && response.headers.authorization) {
          this.saveToken({ token: response.headers.authorization }) // save token
        } else {
          this.showAlert(response.data.msg)
        }
      })
      .catch(() => {
        this.showAlert('服务器错误')
      })
    },
    showAlert (msg) {
      this.$refs['alert'].show(msg)
    }
  },
  watch: {
    isLoggedin (val) {
      val ? this.$router.replace({ path: this.$route.query.from || '/' }) : false
    }
  }
}
</script>
<style lang="scss">
.table-wrapper{
  display: block;
  width: 100%;
  height: 100%;
}
.login-form-container {
  width: 388px;
  display: block;
  margin: 0 auto;
  overflow: hidden;
}
.login-form{
  background: #FFFFFF;
  width: 388px;
  padding: 0 44px;
  margin: 0 auto;
  .form-group label {
    font-weight: normal;
  }
  .line {
    margin: 0 0;
  }
  .nav-bar {
    font-family: 'PingFangSC-Medium';
    color: #2E3E4C;
    font-weight: normal;
    font-size: 18px;
    text-align: center;
    line-height: 25px;
    padding: 24px 0;
  }
  .nav-bar a{
    color: #2E3E4C;
  }
  .active {
    position: relative;
    text-align: center;
    background: none;
  }
  .active a{
    color: #FE7C1E;
  }
  .active .active-line {
    width: 16px;
    border: 1px solid #FE7C1E;
    height: 2;
    position: absolute;
    left: 50% - 5;
    bottom:-8px;

    box-shadow: 0 2px 4px 0 rgba(254,124,30,0.24);
  }
  label {
    font-family: 'HelveticaNeue';
    font-size: 12px;
    color: #8D9DB0;
  }
  .msg {
    text-align: center;
  }

  .or-line {
    padding: 15px 0;
    position: relative;



    .or-text {
      width: 50px;
      background: #fff;
      margin: 0 auto;
      color: #8D9DB0;
      text-align: center;
      position: absolute;
      top: 5px;
      left: 50%-10;
    }
  }
  .login-form-footer {
    padding: 24px 0;
    text-align: center;
    font-family: 'HelveticaNeue';
    font-size: 12px;
    color: #8D9DB0;
  }
}
.login-image {
  width: 572px;
  overflow: hidden;
}
.login-image img {
  width: 572px;
  width: 100%;
}
.bg-success,{
  background: #09BB07;
}
.bg-info {
  background: #75D4F7;
}
.bg-warning {
  background: #E89214;
}

.btn-success,{
  border-color: #09BB07;
  background: #09BB07;
}
.btn-info {
  border-color: #75D4F7;
  background: #75D4F7;
}
.btn-warning {
  border-color: #E89214;
  background: #E89214;
}

.login-form .btn-icon {
  float: left;
  width: 20px;
  height: auto;
}
.login-form .btn-icon img{
  width: 100%;
}
</style>
