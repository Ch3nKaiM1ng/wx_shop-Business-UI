import request from '@/utils/request'

// 查看所有文章
export function wxUserAll(data) {
  return request({
    url: '/wxUser/findAll',
    method: 'post',
    data
  })
}

// 查看所有文章
export function findAllByLimit(data) {
  return request({
    url: '/wxUser/findAllByLimit',
    method: 'post',
    data
  })
}

// 创建文章
export function addwxUser(data) {
  return request({
    url: '/wxUser/addObj',
    method: 'post',
    data
  })
}

// 查看单条文章
export function findwxUser(data) {
  return request({
    url: '/wxUser/findObj',
    method: 'post',
    data
  })
}
// 文章修改
export function modifywxUser(data) {
  return request({
    url: '/wxUser/updateObj',
    method: 'post',
    data
  })
}
// 文章删除
export function delwxUser(data) {
  return request({
    url: '/wxUser/delObj',
    method: 'post',
    data
  })
}

