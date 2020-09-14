import request from '@/utils/request'

// 导航栏列表查询
export function navFindAll(data) {
  return request({
    url: '/TopMenu/findAll',
    method: 'post',
    data
  })
}
// 导航栏修改
export function updateObj(data) {
  return request({
    url: '/TopMenu/updateObj',
    method: 'post',
    data
  })
}
// 导航栏查询单个
export function findObj(data) {
  return request({
    url: '/TopMenu/findObj',
    method: 'post',
    data
  })
}
// 导航栏删除
export function delObj(data) {
  return request({
    url: '/TopMenu/delObj',
    method: 'post',
    data
  })
}
// 导航栏添加
export function addObj(data) {
  return request({
    url: '/TopMenu/addObj',
    method: 'post',
    data
  })
}
// 医生所有分类
export function findList(data) {
  return request({
    url: '/DoctorClass/findAll',
    method: 'post',
    data
  })
}
// 查看医生分类详情
export function findDoc(data) {
  return request({
    url: '/DoctorClass/findObj',
    method: 'post',
    data
  })
}
// 修改医生分类
export function modifyDoc(data) {
  return request({
    url: '/DoctorClass/updateObj',
    method: 'post',
    data
  })
}
// 新增医生分类***
export function addDoc(data) {
  return request({
    url: '/DoctorClass/addObj',
    method: 'post',
    data
  })
}
// 删除医生分类
export function deleteDoc(data) {
  return request({
    url: '/DoctorClass/delObj',
    method: 'post',
    data
  })
}
// 查看所有图片
export function imgList(data) {
  return request({
    url: '/Banner/findAll',
    method: 'post',
    data
  })
}
// 图片添加
export function addImg(data) {
  return request({
    url: '/Banner/addObj',
    method: 'post',
    data
  })
}
// bnner图片修改
export function modifyImg(data) {
  return request({
    url: '/Banner/updateObj',
    method: 'post',
    data
  })
}
// 删除bnner图片
export function delImg(data) {
  return request({
    url: '/Banner/delObj',
    method: 'post',
    data
  })
}
// bnner图获取详情
export function finImg(data) {
  return request({
    url: '/Banner/findObj',
    method: 'post',
    data
  })
}
// 查看所有文章
export function articleAll(data) {
  return request({
    url: '/article/findAll',
    method: 'post',
    data
  })
}
// 评论分页
export function usercommentAll(data) {
  return request({
    url: '/articleComment/findAll',
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
// 修改文章
export function modifyArticle(data) {
  return request({
    url: '/article/updateObj',
    method: 'post',
    data
  })
}
// 查看单条文章详情
export function findArticle(data) {
  return request({
    url: '/article/findObj',
    method: 'post',
    data
  })
}

// pc端
// 轮播and主题图片
export function pcBanner(data) {
  return request({
    url: '/pcBanner/findAll',
    method: 'post',
    data
  })
}

// 删除
export function pcDelObj(data) {
  return request({
    url: '/pcBanner/delObj',
    method: 'post',
    data
  })
}

// 详情
export function pcfindObj(data) {
  return request({
    url: '/pcBanner/findObj',
    method: 'post',
    data
  })
}

// 添加
export function pcAddObj(data) {
  return request({
    url: '/pcBanner/addObj',
    method: 'post',
    data
  })
}
// 修改
export function pcUpdateObj(data) {
  return request({
    url: '/pcBanner/updateObj',
    method: 'post',
    data
  })
}
