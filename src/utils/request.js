import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, removeToken, removeCode, removeRefreshToken } from '@/utils/auth'
import { clientId, clientSecret } from './defaultSettings'
import { Base64 } from 'js-base64'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 50000, // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Basic ${Base64.encode(`${clientId}:${clientSecret}`)}`
    if (store.getters.token) {
      config.headers['hert-auth'] = 'bearer ' + getToken()
    }
    if(config.method === 'post') {
      config.headers['Content-Type'] =  'application/json'
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      if (res.code === 4001 ) {
        // to re-login
        MessageBox.confirm('签名验证失败！重新授权', {
          confirmButtonText: '重新授权',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/refreshToken')
        })
      }
      if (res.code === 4002 ) {
        removeToken();
        removeCode();
        removeRefreshToken();
        location.reload()
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log("err",error.response) // for debug
    Message({
      message: error.response.data.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
