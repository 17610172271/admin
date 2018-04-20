<template>
  <div class="not-print">
    <div class="top-nav">
      <div class="container">
        <div class="pull-right ">
          <span  v-if="isLoggedin">
            <a class="m-l">{{currentUser.name}}</a>
            <a class="m-l" @click="logout">退出登录</a>
          </span>
          <!-- <span  v-if="!isLoggedin">
            <a class="m-l">登录</a>
            <a class="m-l">注册</a>
          </span> -->
          <a class="m-l">个人中心</a>
          <a class="m-l">商家中心</a>
        </div>
        <div class="">
          <i class="fa fa-phone"></i> 24小时客服电话: 400-100-10010
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="navbar-brand logo pull-left">
          <router-link :to="{ name: 'home'}"><img src="../../assets/logo.png" alt="玩房车" title="玩房车"></router-link>
        </div>
        <div class="">
          <div class="slot"  v-if="!isLoggedin">
            <div class="slot-line"></div>
            后台管理系统
          </div>

          <ul class="navbar-nav nav" v-if="isLoggedin">
            <li><router-link :to="{ name: 'rental'}">房车租赁</router-link></li>
            <li><router-link :to="{ name: 'camp'}">露营地</router-link></li>
            <li><router-link :to="{ name: 'feed'}">房车圈</router-link></li>
            <li><router-link :to="{ name: 'questions'}">问答</router-link></li>
            <li><router-link :to="{ name: 'travel'}">旅行服务</router-link></li>
            <li><router-link :to="{ name: 'financial'}">财务</router-link></li>
            <li><router-link :to="{ name: 'system'}">系统</router-link></li>
            <li><router-link :to="{ name: 'extends'}">扩展</router-link></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'doLogout'
    ]),
    logout () {
      this.doLogout().then(() => {
        this.$router.replace('/login')
      })
    }
  },
  computed: mapGetters({
    currentUser: 'currentUser',
    isLoggedin: 'isLoggedin'
  })
}
</script>
