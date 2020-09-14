import request from '@/utils/request'

export function getUserSession(data) {
  // 查询所有预约
  return request({
    url: '/Admin/getUserSession',
    method: 'post',
    data
  })
}
