<template>
  <div class="home-dashboard">
    <nav-header></nav-header>
    <div class="app container">
      <div class="wrapper">
        <div class="row">
          <div class="col-xs-8">
            <div class="panel panel-default">
              <div class="panel-body b-b">
                <!-- chat form -->
                <div>
                  <a class="pull-left thumb-xs avatar"><div class="text-avater">{{currentUser.name | firstChar}}</div></a>
                  <form class="m-b-none m-l-xl ng-pristine ng-valid">
                    <div class="input-group">
                      <input class="form-control" placeholder="发布公告" type="text">
                      <span class="input-group-btn">
                        <button class="btn btn-default" type="button">发布</button>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
              <div class="panel-body">
                <div class="m-b">
                  <a href="" class="pull-left thumb-sm avatar">
                    <div class="text-avater bg-colored">L</div>
                  </a>
                  <div class="m-l-xxl">
                    <div class="pos-rlt wrapper b b-light r r-2x">
                      <span class="arrow left pull-up"></span>
                      <p class="m-b-none">在使用租赁业务管理后台过程中，请谨慎操作，错误操作可能会影响商家正常使用系统。</p>
                    </div>
                    <small class="text-muted"><i class="fa fa-ok text-success"></i> 8 天前</small>
                  </div>
                </div>
                <div class="m-b"  v-for="i in 3">
                  <a href="" class="pull-left thumb-sm avatar">
                    <div class="text-avater bg-colored">W</div>
                  </a>
                  <div class="m-l-xxl">
                    <div class="pos-rlt wrapper b b-light r r-2x">
                      <span class="arrow left pull-up"></span>
                      <p class="m-b-none">Hi Jianboo, What's up...</p>
                    </div>
                    <small class="text-muted"><i class="fa fa-ok text-success"></i> {{i + i}} 分钟前</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-4">
            <div class="row row-sm text-center">
                <div class="col-xs-6">
                  <router-link :to="{name: 'agency', query: {status: 1}}" class="block panel padder-v item">
                    <div class="h1 text-info font-thin h1">13</div>
                    <span class="text-muted text-xs">待审商家</span>
                  </router-link>
                </div>
                <div class="col-xs-6">
                  <router-link :to="{name: 'rv', query: {status: 1}}" class="block panel padder-v bg-primary item">
                    <span class="text-white font-thin h1 block">30</span>
                    <span class="text-muted text-xs">待审车辆</span>
                  </router-link>
                </div>
                <div class="col-xs-6">
                  <router-link :to="{name: 'order', query: {status: 4}}" class="block panel padder-v bg-danger item">
                    <span class="text-white font-thin h1 block">42</span>
                    <span class="text-muted text-xs">待确认订单</span>
                  </router-link>
                </div>
                <div class="col-xs-6">
                  <router-link :to="{name: 'financial', query: {status: 1}}" class="block panel padder-v item">
                    <div class="font-thin h1">8</div>
                    <span class="text-muted text-xs">退款申请</span>
                  </router-link>
                </div>
                <div class="col-xs-12 m-b-md">
                    <div class="padder-v r-r bg-light dk">
                      <div class="text-primary-dk font-thin"><span class=" h1">25%</span></div>
                      <span class="text-muted text-xs">当日已取车比例</span>
                    </div>
                </div>
              </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavHeader from '../common/nav-header'
import {mapGetters} from 'vuex'

export default {
  components: {
    NavHeader
  },
  filters: {
    firstChar: str => {
      return str ? str.substring(0, 1) : ''
    }
  },
  computed: mapGetters({
    currentUser: 'currentUser'
  }),
  data: () => ({

  })
}
</script>
<style lang="scss">
  .home-dashboard > .app{
    min-height: 600px;
  }
  .text-avater {
    background: #FE7C1E;
    color: #FFF;
    height: 32px;
    width: 32px;
    text-align: center;
    line-height: 32px;
    font-size: 14px;
    border-radius: 50%;
  }
</style>
