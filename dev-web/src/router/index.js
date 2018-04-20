import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import Rental from './rental'
import Camp from './camp'
import Travel from './travel'
import Feed from './feed'
import System from './System'
import Financial from './financial'
import Extends from './extends'
import Demo from './demo'
import Questions from './questions'

import Home from '@/views/home' // 首页
const Login = resolve => require(['@/views/pages/login'], resolve) // 登录
const NotFound = resolve => require(['@/views/pages/404'], resolve) // 404

Vue.use(Router)

const router = new Router({
  routes: [
    Demo,
    Rental,
    Camp,
    Travel,
    Feed,
    System,
    Financial,
    Extends,
    Questions,
    {
      path: '/login',
      component: Login,
      name: 'login'
    },
    {
      path: '/',
      component: Home,
      name: 'home',
      meta: { requireAuth: true }
    },
    { path: '*', component: NotFound }
  ]
})

router.beforeEach((to, from, next) => {
  // 判断去往的页面是否需要登录
  if (to.matched.some(record => record.meta.requireAuth) && !store.getters.isLoggedin) {
    console.log(store.getters.isLoggedin)
    next({
      path: '/login', // 未登录时跳转到该页面
      query: { from: to.fullPath }
    })
  } else {
    next()
  }
})

export default router
