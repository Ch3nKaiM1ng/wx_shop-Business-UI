import request from '@/utils/request'

export function UploadImg(data) {
  // 顶部广告列表
  return request({
    url: '/file/uploading',
    method: 'post',
    data
  })
}
