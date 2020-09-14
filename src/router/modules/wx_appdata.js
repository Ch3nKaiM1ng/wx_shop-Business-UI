import Layout from '@/layout'

const evaluate = {
  path: '/wxappdata',
  component: Layout,
  redirect: 'noRedirect',
  name: 'wxappdata',
  meta: {
    title: '小程序信息完善',
    icon: 'Setting'
  },
  children: [
    {
      path: 'wxappdata',
      component: () => import('@/views/wxappdata/appDetail.vue'),
      name: 'wxappdata',
      meta: { title: '小程序信息完善', noCache: true }
    }
  ]
}

export default evaluate
