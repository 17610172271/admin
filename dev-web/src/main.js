// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from './axios'

// css
import './css/bootstrap.min.css'
import './css/animate.css'
import './css/font-awesome.min.css'
import './css/simple-line-icons.css'
import './css/font.css'
import './css/font-wanfangche.css'
import './css/app.css'
import './css/style.css'

Vue.config.productionTip = false

// 挂载 axios, 可以使用 this.axios
Vue.prototype.axios = axios

// oss图片裁切规则
import ossResize from './filters/oss-resize.js'
Vue.filter('ossResize', ossResize)

// 文件大小显示转换
import formatSize from './filters/format-size.js'
Vue.filter('formatSize', formatSize)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  template: '<App/>',
  components: { App }
})
