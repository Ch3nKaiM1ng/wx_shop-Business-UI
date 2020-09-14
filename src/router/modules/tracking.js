import Layout from '@/layout'
/* 首页搜索*/

const track = {
  path: '/track',
  component: Layout,
  redirect: 'track',
  name: 'track',
  meta: {
    title: '流量跟踪',
    icon: 'search'
  },
  children: [
    {
      path: 'tracking',
      component: () => import('@/views/tracking/index'),
      name: 'tracking',
      meta: { title: '流量跟踪', noCache: true }
    },
    {
      path: 'trackingDetails',
      component: () => import('@/views/tracking/trackingDetails.vue'),
      name: 'trackingDetails',
      hidden: true,
      meta: { title: '流量跟踪详情', noCache: true }
    }
  ]
}

export default track
