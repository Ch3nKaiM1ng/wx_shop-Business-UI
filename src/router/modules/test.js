import Layout from '@/layout'
// 用户信息

const test = {
  path: '/test',
  component: Layout,
  redirect: 'noRedirect',
  name: 'test',
  meta: {
    title: '测试',
    icon: 'Setting'
  },
  children: [
    {
      path: 'test',
      component: () => import('@/views/test/index'),
      name: 'test',
      meta: { title: '测试', noCache: true }
    },
    {
      path: 'UploadExcel',
      component: () => import('@/views/test/UploadExcel.vue'),
      name: 'UploadExcel',
      meta: { title: '上传Excel', noCache: true }
    }
  ]
}

export default test
