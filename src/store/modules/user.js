import { login, logout, checkLogin, refreshToken } from '@/api/user'
import { getToken, setToken, removeToken,
  getRefreshToken, setRefreshToken, removeRefreshToken,
  getCode, setCode, removeCode } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  refreshToken: getRefreshToken(),
  code: getCode(),
  userInfo: '',
  introduction: '',
  permissions: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_REFRESH_TOKEN: (state, token) => {
    state.refreshToken = token
  },
  SET_CODE: (state, token) => {
    state.code = token
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ account: account, password: password }).then(response => {
        const { data } = response
        commit('SET_CODE', data)
        setCode(data)
        resolve()
      }).catch(error => {
        reject(error || "服务器超时")
      })
    })
  },

  // get user info
  checkLogin({ commit, state }) {
    return new Promise((resolve, reject) => {
      checkLogin({"grantType": "check_login", "code": getCode()}).then(response => {
        const { data } = response
        if (!data) {
          reject('验证过期，请重新登录！！！')
          return
        }

        if (!data.permissions || data.permissions.length < 0) {
          reject('权限必须是数组！！')
          return
        }
        commit('SET_TOKEN', data.accessToken)
        commit('SET_REFRESH_TOKEN', data.refreshToken)
        commit('SET_PERMISSIONS', data.permissions)
        commit('SET_USER_INFO', data)
        setToken(data.accessToken)
        setRefreshToken(data.refreshToken)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // refreshToken
  refreshToken({ commit, state }) {
    return new Promise((resolve, reject) => {
      refreshToken({"grantType": "refresh_token", "refreshToken": getRefreshToken()}).then(response => {
        const { data } = response
        if (!data) {
          reject('验证过期，请重新登录！！！')
          return
        }

        if (!data.permissions || data.permissions.length < 0) {
          reject('权限必须是数组！！')
          return
        }
        commit('SET_TOKEN', data.accessToken)
        commit('SET_REFRESH_TOKEN', data.refreshToken)
        commit('SET_PERMISSIONS', data.permissions)
        commit('SET_USER_INFO', data)
        setToken(data.accessToken)
        setRefreshToken(data.refreshToken)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_USER_INFO', '')
        commit('SET_CODE', '')
        commit('SET_PERMISSIONS', '')
        removeToken()
        removeCode()
        removeRefreshToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_CODE', '')
      removeToken()
      resolve()
    })
  },

}



export default {
  namespaced: true,
  state,
  mutations,
  actions
}

