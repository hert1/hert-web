import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/hert-auth/login',
    method: 'post',
    data: data
  })
}

export function checkLogin(data) {
  return request({
    url: '/hert-auth/checkLogin',
    method: 'post',
    data: data

  })
}

export function refreshToken(data) {
  return request({
    url: '/hert-auth/refreshToken',
    method: 'post',
    data: data

  })
}

export function detail(data) {
  return request({
    url: '/hert-base/user/detail',
    method: 'get',
    params: data
  })
}

export function logout() {
  return request({
    url: '/hert-auth/logout',
    method: 'post'
  })
}

export function fetchList(data) {
  return request({
    url: '/hert-base/user/list',
    method: 'get',
    params: data
  })
}

export function submit(data) {
  return request({
    url: '/hert-base/user/submit',
    method: 'post',
    data: data
  })
}

export function remove(data) {
  return request({
    url: '/hert-base/user/remove',
    method: 'delete',
    data: { ids: data }
  })
}

export function resetPassword(data) {
  return request({
    url: '/hert-base/user/reset-password',
    method: 'post',
    data: { ids: data }
  })
}
