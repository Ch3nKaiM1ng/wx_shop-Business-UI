import request from '@/utils/request'

export function delObj(data) {
  // 删除医生
  return request({
    url: '/wxAppdata/delObj',
    method: 'post',
    data
  })
}

export function findObj(data) {
  // 查询医生
  return request({
    url: '/wxAppdata/findObj',
    method: 'post',
    data
  })
}

export function addObj(data) {
  // 添加医生
  return request({
    url: '/wxAppdata/addObj',
    method: 'post',
    data
  })
}

export function updateObj(data) {
  // 修改医生
  return request({
    url: '/wxAppdata/updateObj',
    method: 'post',
    data
  })
}
