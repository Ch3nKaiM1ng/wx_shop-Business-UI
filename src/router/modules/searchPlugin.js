import Layout from '@/layout'
// 首页搜索

const search = {
  path: '/search',
  component: Layout,
  redirect: 'search',
  name: 'search',
  meta: {
    title: '热搜',
    icon: 'search'
  },
  children: [
    {
      path: 'searchList',
      component: () => import('@/views/searchPlugin/searchList.vue'),
      name: 'searchList',
      meta: { title: '首页热搜版', noCache: true }
    },
    {
      path: 'LastSearch',
      component: () => import('@/views/searchPlugin/LastSearch.vue'),
      name: 'LastSearch',
      meta: { title: '底部热搜版', noCache: true }
    },
    {
      path: 'boardSearch',
      component: () => import('@/views/searchPlugin/boardSearch.vue'),
      name: 'boardSearch',
      meta: { title: '热搜管理', noCache: true }
    },
    {
      path: 'editSearch',
      component: () => import('@/views/searchPlugin/editSearch.vue'),
      name: 'editSearch',
      hidden: true,
      meta: { title: '编辑热搜版' }
    },
    {
      path: 'editBoard',
      component: () => import('@/views/searchPlugin/editBoard.vue'),
      name: 'editBoard',
      hidden: true,
      meta: { title: '编辑管理' }
    }
  ]
}

export default search
