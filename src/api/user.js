import request from '@/utils/request'
import qs from 'qs'

export function login(data) {
  return request({
    url: '/hert-auth/login',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function checkLogin(token) {
  return request({
    url: '/hert-auth/checkLogin',
    method: 'post'
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
    headers: {"Content-Type": 'application/json'},
    data: data
  })
}

