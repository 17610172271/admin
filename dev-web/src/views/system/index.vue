<template>
  <div class="">
    <nav-header></nav-header>
    <div class="app container">
      <div class="app-aside">
        <nav-aside :list="navAside"></nav-aside>
      </div>
      <div class="app-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import NavHeader from '../common/nav-header'
import NavAside from '../common/nav-aside'

export default {
  components: {
    NavHeader,
    NavAside
  },
  data: () => ({
    navAside: [
      {
        title: '用户管理',
        to: {name: 'user'},
        exact: false
      },
      {
        title: '公告管理',
        to: {name: 'notice'},
        exact: false
      },
      {
        title: '广告管理',
        to: {name: 'adv'},
        exact: false
      },
      {
        title: '页面管理',
        to: {name: 'pageadmin'},
        exact: false
      },
      {
        title: '城市管理',
        to: {name: 'city'},
        exact: false
      },
      {
        title: '车型库管理',
        to: {name: 'car_model', query: {key: '全部'}},
        exact: false
      },
      {
        title: '爱车认证管理',
        to: {name: 'car_certify'},
        exact: false
      }
    ]
  })
}

</script>
<style scoped>
  .container {
    position: relative;
    
  }
</style>
