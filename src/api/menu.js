import request from '@/utils/request'
import qs from 'qs'

export function fetchTree() {
  return request({
    url: '/hert-base/menu/tree',
    method: 'get'
  })
}

export function submit(data) {
  return request({
    url: '/hert-base/menu/submit',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function remove(data) {
  return request({
    url: '/hert-base/menu/remove',
    method: 'post',
    data: qs.stringify({ids: data})
  })
}

export function router() {
  return request({
    url: '/hert-base/menu/router',
    method: 'get',
  })
}

