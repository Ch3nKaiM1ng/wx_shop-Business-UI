import request from '@/utils/request'

export function CaseFindAll(data) {
  // 案例列表
  return request({
    url: '/case/findAll',
    method: 'post',
    data
  })
}

export function deleteFindAll(data) {
  // 删除案例
  return request({
    url: '/case/delObj',
    method: 'post',
    data
  })
}

export function CaseAddObj(data) {
  // 案例创建
  return request({
    url: '/case/addObj',
    method: 'post',
    data
  })
}

export function CaseFindObj(data) {
  // 案例查询
  return request({
    url: '/case/findObj',
    method: 'post',
    data
  })
}

export function CaseUpdateObj(data) {
  // 案例编辑
  return request({
    url: '/case/updateObj',
    method: 'post',
    data
  })
}

export function caseDetailFindAll(data) {
  // 案例分期列表
  return request({
    url: '/caseDetail/findAll',
    method: 'post',
    data
  })
}

export function caseDetaildelObj(data) {
  // 删除案例分期列表
  return request({
    url: '/caseDetail/delObj',
    method: 'post',
    data
  })
}

export function caseDetailFindObj(data) {
  // 案例分期详情
  return request({
    url: '/caseDetail/findObj',
    method: 'post',
    data
  })
}

export function caseDetailAddObj(data) {
  // 案例分期增加
  return request({
    url: '/caseDetail/addObj',
    method: 'post',
    data
  })
}

export function caseDetailUpdateObj(data) {
  // 案例分期修改
  return request({
    url: '/caseDetail/updateObj',
    method: 'post',
    data
  })
}

export function caseCommentFindAll(data) {
  // 评论主列表
  return request({
    url: '/caseComment/findAll',
    method: 'post',
    data
  })
}

export function caseCommentFindObj(data) {
  // 查看评论详情
  return request({
    url: '/caseComment/findObj',
    method: 'post',
    data
  })
}

export function caseCommentDelObj(data) {
  // 评论删除
  return request({
    url: '/caseComment/delObj',
    method: 'post',
    data
  })
}

export function caseCommentUpdateObj(data) {
  // 评论修改
  return request({
    url: '/caseComment/updateObj',
    method: 'post',
    data
  })
}

export function caseCommentAddObj(data) {
  // 评论添加
  return request({
    url: '/caseComment/addObj',
    method: 'post',
    data
  })
}
