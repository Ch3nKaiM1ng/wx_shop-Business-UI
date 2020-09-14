import Layout from '@/layout'
// 广告模块

const shop = {
  path: '/shop',
  component: Layout,
  redirect: 'noRedirect',
  name: 'shop',
  meta: {
    title: '商家设置',
    icon: 'navigation'
  },
  children: [
    {
      path: 'shop',
      component: () => import('@/views/shop/shopDetail.vue'),
      name: 'shop',
      meta: { title: '商家设置', noCache: true }
    }
  ]
}
export default shop
