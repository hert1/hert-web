import Cookies from 'js-cookie'

const code = 'code'
const accessToken = 'accessToken'
const refreshToken = 'refreshToken'

export function getToken() {
  return Cookies.get(accessToken)
}

export function setToken(data) {
  return Cookies.set(accessToken, data)
}

export function removeToken() {
  return Cookies.remove(accessToken)
}

export function getRefreshToken() {
  return Cookies.get(refreshToken)
}

export function setRefreshToken(data) {
  return Cookies.set(refreshToken, data)
}

export function removeRefreshToken() {
  return Cookies.remove(refreshToken)
}

export function getCode() {
  return Cookies.get(code)
}

export function setCode(data) {
  return Cookies.set(code, data)
}

export function removeCode() {
  return Cookies.remove(code)
}
