<template>
  <div class="wfc__demo-container">
    <div class="aside">
      <div class="info">
        <p>玩房车UI</p>
        <p>Developer: @Jianbo</p>
        <p>Design: @谢雨峰</p>
      </div>
      <ul>
        <li class="title">
          Components
        </li>
        <li v-for="link in routes">
          <router-link :to="{name: link.name}">{{link.path ? link.path : 'Home'}}</router-link>
        </li>
      </ul>
    </div>
    <div class="body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Routes from '../router/demo'

export default {
  data () {
    return {
      routes: Routes.children
    }
  }
}
</script>

<style lang="scss">
$demo-width: 100%;
$demo-aside-width: 200px;

.wfc__demo-container {
  width: $demo-width;
  position: relative;

  font-size: 16px;
  line-height: 1.5em;
  color: #2E3E4C;

  .info{
    color: #8D9DB0;
    border-bottom: 1px solid #EDEDED;
    font-size: 12px;
  }

  .aside {
    width: $demo-aside-width;
    float: left;
    padding: 10px 15px;

    ul {
      padding: 10px 0;

      .title {
        font-size: 18px;
        color: #8D9DB0;
        padding-left: 5px;
        padding-right: 5px;
      }
      li {
        list-style: none;
        padding: 5px 25px;

        a{
          display: block;
        }
      }
    }
  }

  .body {
    margin-left: $demo-aside-width;
    background: #fff;
    position: relative;
    min-height: 1000px;
    padding: 15px 15px;
  }
}
</style>
