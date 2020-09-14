import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sysUser/shopLogin',
    method: 'post',
    data
  })
}

export function getInfo() {
  /** 根据token获取用户信息 */
  return request({
    url: '/sysUser/getUserSession',
    method: 'post'
  })
}

export function logout() {
  /** 后台退出登陆 */
  return request({
    url: '/sysUser/outLogin',
    method: 'post'
  })
}

export function findAllUser(data) {
  // 获取用户列表
  return request({
    url: '/user/findAll',
    method: 'post',
    data
  })
}

export function findOurList() {
  // 获取内部员工用户列表
  return request({
    url: '/user/findOurList',
    method: 'post'
  })
}

export function AddObj(data) {
  // 添加用户
  return request({
    url: '/user/addObj',
    method: 'post',
    data
  })
}

export function updateObjUser(data) {
  // 修改用户
  return request({
    url: '/user/updateObj',
    method: 'post',
    data
  })
}

export function findObjUser(data) {
  // 查看用户详情
  return request({
    url: '/user/findObj',
    method: 'post',
    data
  })
}

export function adminUpdateObj(data) {
  // 修改后台管理员
  return request({
    url: '/Admin/updateObj',
    method: 'post',
    data
  })
}
