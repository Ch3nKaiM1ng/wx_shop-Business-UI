import Layout from '@/layout'
// 广告模块

const commodity = {
  path: '/commodity',
  component: Layout,
  redirect: 'noRedirect',
  name: 'commodity',
  meta: {
    title: '商品管理',
    icon: 'ad'
  },
  children: [
    {
      path: 'commodityType',
      component: () => import('@/views/commodity/commodityType.vue'),
      name: 'commodityType',
      meta: { title: '商品分类', noCache: true }
    },
    {
      path: 'commodity',
      component: () => import('@/views/commodity/commodity.vue'),
      name: 'commodity',
      meta: { title: '商品列表', noCache: true }
    },
    {
      path: 'commodityDetail',
      component: () => import('@/views/commodity/commodityDetail.vue'),
      name: 'commodityDetail',
      meta: { title: '商品详情', noCache: true },
      hidden: true
    },
    {
      path: 'commodityTypeDetail',
      component: () => import('@/views/commodity/commodityTypeDetail.vue'),
      name: 'commodityTypeDetail',
      meta: { title: '商品分类详情' },
      hidden: true
    }
  ]
}
export default commodity
