import request from '@/utils/request'

// 查看所有文章
export function mainOrderAll(data) {
  return request({
    url: '/mainOrder/findAll',
    method: 'post',
    data
  })
}

// 查看所有文章
export function findAllByLimit(data) {
  return request({
    url: '/mainOrder/findAllByLimit',
    method: 'post',
    data
  })
}

// 创建文章
export function addmainOrder(data) {
  return request({
    url: '/mainOrder/addObj',
    method: 'post',
    data
  })
}

// 查看单条文章
export function findmainOrder(data) {
  return request({
    url: '/mainOrder/findObj',
    method: 'post',
    data
  })
}
// 文章修改
export function modifymainOrder(data) {
  return request({
    url: '/mainOrder/updateObj',
    method: 'post',
    data
  })
}
// 文章删除
export function delmainOrder(data) {
  return request({
    url: '/mainOrder/delObj',
    method: 'post',
    data
  })
}

