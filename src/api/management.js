import request from '@/utils/request'

export function FindListSort(data) {
  // 查询分类
  return request({
    url: '/TalkClass/findAll',
    method: 'post',
    data
  })
}

export function AddObjSort(data) {
  // 添加分类
  return request({
    url: '/TalkClass/addObj',
    method: 'post',
    data
  })
}

export function UpdateObjSort(data) {
  // 添加分类
  return request({
    url: '/TalkClass/updateObj',
    method: 'post',
    data
  })
}

export function FindObjSort(data) {
  // 查询分类详情
  return request({
    url: '/TalkClass/findObj',
    method: 'post',
    data
  })
}

export function findParentListSort(data) {
  // 查看关联父级
  return request({
    url: '/TalkClass/findParentList',
    method: 'post',
    data
  })
}

export function DelObjSort(data) {
  // 删除分类
  return request({
    url: '/TalkClass/delObj',
    method: 'post',
    data
  })
}

export function pcClassFindAll(data) {
  // pc分类列表
  return request({
    url: '/pcClass/findAll',
    method: 'post',
    data
  })
}

export function pcClassDelObj(data) {
  // pc分类删除
  return request({
    url: '/pcClass/delObj',
    method: 'post',
    data
  })
}

export function pcClassFindObj(data) {
  // pc查询分类详情
  return request({
    url: '/pcClass/findObj',
    method: 'post',
    data
  })
}

export function pcClassAddObj(data) {
  // pc添加分类
  return request({
    url: '/pcClass/addObj',
    method: 'post',
    data
  })
}

export function pcClassUpdateObj(data) {
  // pc修改分类
  return request({
    url: '/pcClass/updateObj',
    method: 'post',
    data
  })
}
