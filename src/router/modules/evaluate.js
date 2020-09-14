import Layout from '@/layout'
// 广告模块

const evaluate = {
  path: '/evaluate',
  component: Layout,
  redirect: 'noRedirect',
  name: 'evaluate',
  meta: {
    title: '评论管理',
    icon: 'reservation'
  },
  children: [
    {
      path: 'evaluate',
      component: () => import('@/views/mainOrder/evaluate.vue'),
      name: 'evaluate',
      meta: { title: '评论详情', noCache: true },
      hidden: true
    }

  ],
  hidden: true
}
export default evaluate
