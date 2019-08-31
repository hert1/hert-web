import request from '@/utils/request'
import qs from 'qs'

export function error_list(data) {
  return request({
    url: '/hert-base/error/list',
    method: 'get',
    params: data
  })
}

export function api_list(data) {
  return request({
    url: '/hert-base/api/list',
    method: 'get',
    params: data
  })
}

export function usual_list(data) {
  return request({
    url: '/hert-base/usual/list',
    method: 'get',
    params: data
  })
}
