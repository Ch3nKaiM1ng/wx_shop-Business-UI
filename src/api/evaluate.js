import request from '@/utils/request'

// 查看单条文章
export function findObj(data) {
  return request({
    url: '/evaluate/findObj',
    method: 'post',
    data
  })
}
// 文章修改
export function modifyObj(data) {
  return request({
    url: '/evaluate/updateObj',
    method: 'post',
    data
  })
}
