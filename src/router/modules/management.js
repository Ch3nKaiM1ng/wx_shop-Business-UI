import Layout from '@/layout'
// 广告模块

const management = {
  path: '/management',
  component: Layout,
  redirect: 'noRedirect',
  name: 'management',
  meta: {
    title: '分类管理',
    icon: 'classification'
  },
  children: [
    {
      path: 'articleSort',
      component: () => import('@/views/management/article/levelone.vue'),
      name: 'articleSort',
      meta: { title: '案例分类', noCache: true }
    },
    {
      path: 'listSort',
      component: () => import('@/views/management/list/levelone.vue'),
      name: 'listSort',
      meta: { title: '榜单分类', noCache: true }
    },
    {
      path: 'homeSort',
      component: () => import('@/views/management/home/levelone.vue'),
      name: 'homeSort',
      meta: { title: '首页分类', noCache: true }
    },
    {
      path: 'listor',
      component: () => import('@/views/management/listor/index'),
      name: 'listor',
      meta: { title: '预约选择分类', noCache: true }
    },
    {
      path: 'editSort',
      component: () => import('@/views/management/editSort/index'),
      name: 'editSort',
      hidden: true,
      meta: { title: '编辑分类', noCache: false }
    },
    {
      path: 'children',
      component: () => import('@/views/management/children/index'),
      name: 'children',
      hidden: true,
      meta: { title: '查看子级分类', noCache: false, breadcrumb: false }
    },
    {
      path: 'PcList',
      component: () => import('@/views/management/PcList/index'),
      name: 'PcList',
      meta: { title: 'pc底部分类', noCache: true }
    },
    {
      path: 'PcSubclass',
      component: () => import('@/views/management/PcList/Subclass.vue'),
      name: 'PcSubclass',
      hidden: true,
      meta: { title: 'pc底部子分类', noCache: true }
    },
    {
      path: 'editList',
      component: () => import('@/views/management/PcList/editList.vue'),
      name: 'editList',
      hidden: true,
      meta: { title: '编辑pc底部子分类', noCache: true }
    }
  ]
}

export default management
