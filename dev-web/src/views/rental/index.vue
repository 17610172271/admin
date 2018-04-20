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
        title: '商家管理',
        to: {name: 'agency'},
        exact: false
      },
      {
        title: '车辆管理',
        to: {name: 'rv'},
        exact: false
      },
      {
        title: '订单管理',
        to: {name: 'order'},
        exact: false
      },
      {
        title: '店铺管理',
        to: {name: 'store'},
        exact: false
      },
      {
        title: '评价管理',
        to: {name: 'comment'},
        exact: false
      }
    ]
  })
}

</script>
