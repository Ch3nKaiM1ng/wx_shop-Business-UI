import Layout from '@/layout'
// 广告模块

const reservation = {
  path: '/reservation',
  component: Layout,
  redirect: 'noRedirect',
  name: 'reservation',
  meta: {
    title: '预约',
    icon: 'reservation'
  },
  children: [
    {
      path: 'reservation',
      component: () => import('@/views/reservation/index'),
      name: 'reservation',
      meta: { title: '预约列表', noCache: true }
    },
    {
      path: 'Smallchannel',
      component: () => import('@/views/reservation/Smallchannel.vue'),
      name: 'reservation',
      meta: { title: '小渠道预约', noCache: true }
    },
    {
      path: 'dealReser',
      component: () => import('@/views/reservation/dealReser.vue'),
      name: 'dealReser',
      hidden: true,
      meta: { title: 'deal预约', noCache: true }
    }
  ]
}

export default reservation
