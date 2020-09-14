import request from '@/utils/request'

// 查看所有文章
export function commodityTypeAll(data) {
  return request({
    url: '/commodityType/findAll',
    method: 'post',
    data
  })
}

// 查看所有文章
export function queryAllNotState(data) {
  return request({
    url: '/commodityType/queryAllNotState',
    method: 'post',
    data
  })
}

// 创建文章
export function addcommodityType(data) {
  return request({
    url: '/commodityType/addObj',
    method: 'post',
    data
  })
}

// 查看单条文章
export function findcommodityType(data) {
  return request({
    url: '/commodityType/findObj',
    method: 'post',
    data
  })
}
// 文章修改
export function modifycommodityType(data) {
  return request({
    url: '/commodityType/updateObj',
    method: 'post',
    data
  })
}
// 文章删除
export function delcommodityType(data) {
  return request({
    url: '/commodityType/delObj',
    method: 'post',
    data
  })
}
