import Cookies from 'js-cookie'

const TokenKey = 'DT'
const TokenID = 'DTID'
const ShopID = 'ShopId'
export function getToken() {
  return Cookies.get(TokenKey)
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function getID() {
  return Cookies.get(TokenID)
}
export function setID(id) {
  return Cookies.set(TokenID, id)
}

export function getShopId() {
  return Cookies.get(ShopID)
}
export function setShopId(id) {
  return Cookies.set(ShopID, id)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function removeID() {
  return Cookies.remove(TokenID)
}
