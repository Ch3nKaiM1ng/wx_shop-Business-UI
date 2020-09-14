import request from '@/utils/request'

// 查看所有文章
export function articleAll(data) {
  return request({
    url: '/article/findAll',
    method: 'post',
    data
  })
}

// 创建文章
export function addArticle(data) {
  return request({
    url: '/article/addObj',
    method: 'post',
    data
  })
}

// 查看单条文章
export function findArticle(data) {
  return request({
    url: '/article/findObj',
    method: 'post',
    data
  })
}
// 文章修改
export function modifyArticle(data) {
  return request({
    url: '/article/updateObj',
    method: 'post',
    data
  })
}
// 文章删除
export function delArticle(data) {
  return request({
    url: '/article/delObj',
    method: 'post',
    data
  })
}
// 查看所有评论
export function commentAll(data) {
  return request({
    url: '/articleComment/findAll',
    method: 'post',
    data
  })
}

// 查看单条评论
export function artCommentA(data) {
  return request({
    url: '/articleComment/findObj',
    method: 'post',
    data
  })
}
// 添加萍评论
export function addComment(data) {
  return request({
    url: '/articleComment/addObj',
    method: 'post',
    data
  })
}
// 删除文章评论
export function delComment(data) {
  return request({
    url: '/articleComment/delObj',
    method: 'post',
    data
  })
}
// 修改评论
export function modifyComment(data) {
  return request({
    url: '/articleComment/updateObj',
    method: 'post',
    data
  })
}

