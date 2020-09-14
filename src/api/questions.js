import request from '@/utils/request'
// 问答列表
export function askList(data) {
  return request({
    url: '/ask/findAll',
    method: 'post',
    data
  })
}
// 创建问答主题
export function addask(data) {
  return request({
    url: '/ask/addObj',
    method: 'post',
    data
  })
}
// 删除问答主题
export function delask(data) {
  return request({
    url: '/ask/delObj',
    method: 'post',
    data
  })
}
// 修改问答主题
export function modifyask(data) {
  return request({
    url: '/ask/updateObj',
    method: 'post',
    data
  })
}
// 问答主题详情查询
export function fineask(data) {
  return request({
    url: '/ask/findObj',
    method: 'post',
    data
  })
}
// 问题评论列表
export function responseList(data) {
  return request({
    url: '/askAnswer/findAll',
    method: 'post',
    data
  })
}
// 问题评论添加
export function addResponse(data) {
  return request({
    url: '/askAnswer/addObj',
    method: 'post',
    data
  })
}
// 查看单条问题回复
export function findResponse(data) {
  return request({
    url: '/askAnswer/findObj',
    method: 'post',
    data
  })
}
// 问题评论修改
export function modifyResponse(data) {
  return request({
    url: '/askAnswer/updateObj',
    method: 'post',
    data
  })
}
// 问题评论删除
export function delResponse(data) {
  return request({
    url: '/askAnswer/delObj',
    method: 'post',
    data
  })
}
// 回复评论列表
export function ResponseComAll(data) {
  return request({
    url: '/askComment/findAll',
    method: 'post',
    data
  })
}
// 添加评论
export function addResponseCom(data) {
  return request({
    url: '/askComment/addObj',
    method: 'post',
    data
  })
}
// 删除回复评论列表
export function DelResponseCom(data) {
  return request({
    url: '/askComment/delObj',
    method: 'post',
    data
  })
}
// 查看单条评论详情
export function findOneResponseCom(data) {
  return request({
    url: '/askComment/findObj',
    method: 'post',
    data
  })
}
// 修改评论
export function modifyResponseCom(data) {
  return request({
    url: '/askComment/updateObj',
    method: 'post',
    data
  })
}
