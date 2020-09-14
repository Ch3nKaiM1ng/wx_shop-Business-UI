import request from '@/utils/request'

// 投诉建议查询
export function checkFindAll(data) {
  return request({
    url: '/complaint/select',
    method: 'post',
    data
  })
}
// 修改投诉建议
export function modifycomplaint(data) {
  return request({
    url: '/complaint/update',
    method: 'post',
    data
  })
}
// 删除修改建议
export function deletecomplaint(data) {
  return request({
    url: '/complaint/delete',
    method: 'post',
    data
  })
}
// 查询单个
export function findcomplaint(data) {
  return request({
    url: '/complaint/selectById',
    method: 'post',
    data
  })
}

// 查询小渠道预约
export function selectAll(data) {
  return request({
    url: '/surveyMedia/findAll',
    method: 'post',
    data
  })
}

// 删除小渠道预约
export function surveyMediaDelObj(data) {
  return request({
    url: '/surveyMedia/delObj',
    method: 'post',
    data
  })
}
