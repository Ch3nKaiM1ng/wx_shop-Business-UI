import request from '@/utils/request'

export function trackFindAll(data) {
  // 所有后台管理列表
  return request({
    url: '/trackUser/findAll',
    method: 'post',
    data
  })
}
