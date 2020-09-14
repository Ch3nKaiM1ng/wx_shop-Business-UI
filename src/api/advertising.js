import request from '@/utils/request'

export function AdvertisingFindAll(data) {
  // 顶部广告列表
  return request({
    url: '/TopImg/findAll',
    method: 'post',
    data
  })
}

export function AdvertisingDelObj(data) {
  // 顶部广告删除
  return request({
    url: '/TopImg/delObj',
    method: 'post',
    data
  })
}

export function AdvertisingAddObj(data) {
  // 顶部广告添加
  return request({
    url: '/TopImg/addObj',
    method: 'post',
    data
  })
}

export function AdvertisingUpdateObj(data) {
  // 顶部广告修改
  return request({
    url: '/TopImg/updateObj',
    method: 'post',
    data
  })
}

export function AdvertisingFindObj(data) {
  // 顶部广告详情
  return request({
    url: '/TopImg/findObj',
    method: 'post',
    data
  })
}

export function HomselectHot(data) {
  // 首页热搜列表查询
  return request({
    url: '/classAskArticle/selectHot',
    method: 'post',
    data
  })
}

export function HomLnset(data) {
  // 首页热搜添加
  return request({
    url: '/classAskArticle/inset',
    method: 'post',
    data
  })
}

export function HomUpdate(data) {
  // 首页热搜修改
  return request({
    url: '/classAskArticle/update',
    method: 'post',
    data
  })
}

export function HomSelectById(data) {
  // 首页热搜查询
  return request({
    url: '/classAskArticle/selectById',
    method: 'post',
    data
  })
}

export function HotfindAll(data) {
  // 热搜广告
  return request({
    url: '/advertisement/findAll',
    method: 'post',
    data
  })
}

export function HotDelObj(data) {
  // 删除热搜广告
  return request({
    url: '/advertisement/delObj',
    method: 'post',
    data
  })
}

export function HotAddObj(data) {
  // 添加热搜广告
  return request({
    url: '/advertisement/addObj',
    method: 'post',
    data
  })
}

export function HotUpdateObj(data) {
  // 修改热搜广告
  return request({
    url: '/advertisement/updateObj',
    method: 'post',
    data
  })
}

export function HotFindObj(data) {
  // 查询热搜广告详情
  return request({
    url: '/advertisement/findObj',
    method: 'post',
    data
  })
}
/* 搜索页面接口 */

export function searchPageAll(data) {
  // 查询所有
  return request({
    url: '/search/selectall',
    method: 'post',
    data
  })
}

export function searchPageDelete(data) {
  // 删除
  return request({
    url: '/search/delete',
    method: 'post',
    data
  })
}

export function searchPageSelectOne(data) {
  // 查询单个详情
  return request({
    url: '/search/selectOne',
    method: 'post',
    data
  })
}

export function searchPageUpdate(data) {
  // 修改单个详情
  return request({
    url: '/search/update',
    method: 'post',
    data
  })
}

export function searchPageInset(data) {
  // 添加单个详情
  return request({
    url: '/search/inset',
    method: 'post',
    data
  })
}
