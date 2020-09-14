import Layout from '@/layout'
// 广告模块

const mainOrder = {
  path: '/mainOrder',
  component: Layout,
  redirect: 'noRedirect',
  name: 'mainOrder',
  meta: {
    title: '订单管理',
    icon: 'form'
  },
  children: [
    {
      path: 'mainOrder',
      component: () => import('@/views/mainOrder/mainOrder.vue'),
      name: 'mainOrder',
      meta: { title: '订单管理', noCache: true }
    },
    {
      path: 'orderDetail',
      component: () => import('@/views/mainOrder/orderDetail.vue'),
      name: 'orderDetail',
      meta: { title: '订单详情', noCache: true },
      hidden: true
    }
  ]
}
export default mainOrder
