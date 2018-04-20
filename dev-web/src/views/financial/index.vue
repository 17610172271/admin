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
        title: '财务',
        to: {name: 'financial'},
        exact: true
      },
      {
        title: '退款申请',
        to: {name: 'refund'},
        exact: false
      },
      {
        title: '提现申请',
        to: {name: 'withdraw'},
        exact: false
      }
    ]
  })
}

</script>
