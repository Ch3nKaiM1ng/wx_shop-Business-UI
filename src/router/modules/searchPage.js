import Layout from '@/layout'
/* 搜索页面数据 */

const searchPage = {
  path: '/searchPage',
  component: Layout,
  redirect: 'noRedirect',
  name: 'searchPage',
  meta: {
    title: '搜索页面',
    icon: 'ad'
  },
  children: [
    {
      path: 'TopData',
      component: () => import('@/views/SearchPage/TopData.vue'),
      name: 'TopData',
      meta: { title: '顶部Data', noCache: true }
    },
    {
      path: 'HotData',
      component: () => import('@/views/SearchPage/HotData.vue'),
      name: 'HotData',
      meta: { title: '推荐Data' }
    },
    {
      path: 'HistoryData',
      component: () => import('@/views/SearchPage/HistoryData.vue'),
      name: 'HistoryData',
      meta: { title: '历史Data', noCache: true }
    },
    {
      path: 'editData',
      name: 'editData',
      component: () => import('@/views/SearchPage/editData.vue'),
      meta: { title: '编辑Data' },
      hidden: true
    }
  ]
}

export default searchPage
