import request from '@/utils/request'

// 查看所有文章
export function commodityAll(data) {
  return request({
    url: '/commodity/findAll',
    method: 'post',
    data
  })
}

// 创建文章
export function addcommodity(data) {
  return request({
    url: '/commodity/addObj',
    method: 'post',
    data
  })
}

// 查看单条文章
export function findcommodity(data) {
  return request({
    url: '/commodity/findObj',
    method: 'post',
    data
  })
}
// 文章修改
export function modifycommodity(data) {
  return request({
    url: '/commodity/updateObj',
    method: 'post',
    data
  })
}
// 文章删除
export function delcommodity(data) {
  return request({
    url: '/commodity/delObj',
    method: 'post',
    data
  })
}

// 修改评论
export function modifyComment(data) {
  return request({
    url: '/commodityComment/updateObj',
    method: 'post',
    data
  })
}

