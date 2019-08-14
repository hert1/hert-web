import request from '@/utils/request'
import qs from 'qs'

export function fetchTree() {
  return request({
    url: '/hert-base/role/tree',
    method: 'get'
  })
}

export function submit(data) {
  return request({
    url: '/hert-base/role/submit',
    method: 'post',
    headers: {"Content-Type": 'application/json'},
    data: data
  })
}

export function remove(data) {
  return request({
    url: '/hert-base/role/remove',
    method: 'get',
    data: qs.stringify({ids: data})
  })
}

