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
        title: '营地',
        to: {name: 'camp'},
        exact: false
      },
      {
        title: '停车点',
        to: {name: 'park'},
        exact: false
      },
      {
        title: '景点',
        to: {name: 'scenic'},
        exact: false
      },
      {
        title: '美食',
        to: {name: 'cate'},
        exact: false
      },
      {
        title: '修理厂',
        to: {name: 'depot'},
        exact: false
      },
      {
        title: '加气站',
        to: {name: 'aerate'},
        exact: false
      }
    ]
  })
}

</script>
