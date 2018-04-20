import Vue from 'vue'
import Vuex from 'vuex'

import * as types from './mutation-types'

import JWT from '@/tools/jwt'

import { AUTH_TOKEN_KEY } from '@/config'

Vue.use(Vuex)

export const state = {
  token: window.localStorage.getItem(AUTH_TOKEN_KEY)
}

export const getters = {
  token: state => {
    return state.token
  },
  // 当前登录用户
  currentUser: state => {
    return JWT.payload(state.token) || {}
  },
  // 用户登录状态
  isLoggedin: state => {
    return JWT.payload(state.token) && JWT.payload(state.token).role > 0 // 判断用户ID
  }
}

export const actions = {
  // 保存 token
  saveToken ({ commit }, { token }) {
    commit(types.CLEAR_TOKEN)

    if (JWT.valid(token)) {
      commit(types.SAVE_TOKEN, { token: token })
      return true
    } else {
      return false
    }
  },
  clearToken ({ commit }) {
    commit(types.CLEAR_TOKEN)
  },
  // 退出登录
  doLogout ({ commit }) {
    commit(types.CLEAR_TOKEN)
  }
}

export const mutations = {
  // 清空 auth token
  [types.CLEAR_TOKEN] (state) {
    window.localStorage.removeItem(AUTH_TOKEN_KEY)
    state.token = null
  },
  // 保存 token 到本地
  [types.SAVE_TOKEN] (state, { token }) {
    if (token !== state.token) {
      window.localStorage.setItem(AUTH_TOKEN_KEY, token)
      state.token = token
    }
  }
}

export default new Vuex.Store({
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
})
