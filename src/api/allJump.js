import request from '@/utils/request'

export function JumpFindAll(data) {
  // 所有单位跳转列表
  return request({
    url: '/ClassObj/findBackList',
    method: 'post',
    data
  })
}

export function WebFindAllClass(data) {
  // 所有单位跳转列表
  return request({
    url: '/ClassObj/WebFindAllClass',
    method: 'post',
    data
  })
}

export function DeleteDelObj(data) {
  // 删除跳转列表
  return request({
    url: '/ClassObj/delObj',
    method: 'post',
    data
  })
}

export function updateObjJump(data) {
  // 编辑跳转列表
  return request({
    url: '/ClassObj/updateObj',
    method: 'post',
    data
  })
}

export function addObjJump(data) {
  // 添加跳转列表
  return request({
    url: '/ClassObj/addObj',
    method: 'post',
    data
  })
}

export function findObjJump(data) {
  // 查询跳转列表
  return request({
    url: '/ClassObj/findObj',
    method: 'post',
    data
  })
}
