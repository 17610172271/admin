// auth module
import auth from '@/api/auth'
import * as types from '../mutation-types'
import JWT from '@/tools/jwt'

import { AUTH_TOKEN_KEY } from '@/config'
// export const AUTH_TOKEN_KEY = 'AGENCY_TOKEN' // auth key name for local storage

export const state = {
  authToken: window.localStorage.getItem(AUTH_TOKEN_KEY),
  msg: null,
  loading: false
}

export const getters = {
  authToken: state => {
    return state.authToken
  },
  // 当前登录用户
  currentUser: state => {
    return JWT.payload(state.authToken) || {}
  },
  // 验证用户登录状态
  // 需要补充: 用户是否有商家权限
  // 商家是否存在
  isLoggedin: state => {
    // return JWT.payload(state.authToken) && JWT.payload(state.authToken).id > 0 // 判断用户ID
    return JWT.payload(state.authToken) && JWT.payload(state.authToken).user_id > 0 // 判断用户ID
  },
  isAgency: state => {
    console.log(JWT.payload(state.authToken).status === '3')
    return JWT.payload(state.authToken) && (JWT.payload(state.authToken).status === '3')
  },
  loading: state => {
    return state.loading
  },
  msg: state => {
    return state.msg
  }
}

export const actions = {
  // 检查登录状态
  // 用于刷新，或第一次访问的时候处理
  refreshAuth ({ commit }) {
    auth.check(response => {
      if (response.headers.authorization) {
        commit(types.SAVE_AUTH_TOKEN, { token: response.headers.authorization }) // set token
      } else {
        commit(types.CLEAR_AUTH_TOEKN)
      }
    })
  },
  // 处理登录
  doLogin ({ commit }, user) {
    commit(types.CLEAR_AUTH_TOEKN, {}) // clear auth token
    commit(types.SERVER_ERROR, {}) // clear message

    if (user.name.length < 2) {
      commit(types.SERVER_ERROR, { msg: '用户名不能小于2位' })
    } else if (user.password.length < 6) {
      commit(types.SERVER_ERROR, { msg: '密码不能少于6位' })
    } else {
      commit(types.ON_LOADING, { status: true }) // on loading
      auth.login(user,
        response => {
          commit(types.ON_LOADING, { status: false }) // loading done
          if (response.headers.authorization) {
            commit(types.SAVE_AUTH_TOKEN, { token: response.headers.authorization }) // set token
          } else {
            commit(types.SERVER_ERROR, { msg: '用户名或密码不正确' }) // error data
          }
        },
        err => {
          commit(types.ON_LOADING, { status: false })
          if (err.request) {
            commit(types.SERVER_ERROR, { msg: '无法连接到服务器' })
          }
        }
      )
    }
  },
  // 处理退出登录
  doLogout ({ commit }) {
    commit(types.CLEAR_AUTH_TOEKN)
  }
}

export const mutations = {
  // 清空 auth token
  [types.CLEAR_AUTH_TOEKN] (state) {
    window.localStorage.removeItem(AUTH_TOKEN_KEY)
    state.authToken = null
  },
  // 保存 token 到本地
  [types.SAVE_AUTH_TOKEN] (state, { token }) {
    if (JWT.valid(token)) {
      window.localStorage.setItem(AUTH_TOKEN_KEY, token)
      state.authToken = token
    }
  },
  // 错误信息
  [types.SERVER_ERROR] (state, { msg }) {
    state.msg = msg || null
  },
  // 加载中
  [types.ON_LOADING] (state, { status }) {
    state.loading = status
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
