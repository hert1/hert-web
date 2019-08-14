import request from '@/utils/request'
import qs from 'qs'

export function fetchTree() {
  return request({
    url: '/hert-base/dept/tree',
    method: 'get'
  })
}

export function submit(data) {
  return request({
    url: '/hert-base/dept/submit',
    method: 'post',
    data: data
  })
}

export function remove(data) {
  return request({
    url: '/hert-base/dept/remove',
    method: 'get',
    data: qs.stringify({ids: data})
  })
}


