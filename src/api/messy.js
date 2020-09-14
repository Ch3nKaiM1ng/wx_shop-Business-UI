import request from '@/utils/request'

export function SubscribeSelectAll(data) {
  // 查询所有预约
  return request({
    url: '/subscribe/selectAll',
    method: 'post',
    data
  })
}

export function SubscribeUpdateById(data) {
  // 修改预约状态
  return request({
    url: '/subscribe/updateById',
    method: 'post',
    data
  })
}

export function SubscribeSelectById(data) {
  // 查询预约
  return request({
    url: '/subscribe/selectById',
    method: 'post',
    data
  })
}
