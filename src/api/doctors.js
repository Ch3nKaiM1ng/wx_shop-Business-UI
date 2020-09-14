import request from '@/utils/request'

export function DoctorSelect(data) {
  // 所有医生列表
  return request({
    url: '/Doctor/select',
    method: 'post',
    data
  })
}

export function Deldoctor(data) {
  // 删除医生
  return request({
    url: '/Doctor/delObj',
    method: 'post',
    data
  })
}

export function findObjdoctor(data) {
  // 查询医生
  return request({
    url: '/Doctor/findObj',
    method: 'post',
    data
  })
}

export function addObjdoctor(data) {
  // 添加医生
  return request({
    url: '/Doctor/addObj',
    method: 'post',
    data
  })
}

export function updateObjdoctor(data) {
  // 修改医生
  return request({
    url: '/Doctor/updateObj',
    method: 'post',
    data
  })
}
