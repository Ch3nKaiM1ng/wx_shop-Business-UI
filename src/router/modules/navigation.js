import Layout from '@/layout'
const navigation = {
  path: '/navigation',
  component: Layout,
  meta: { title: '导航管理', icon: 'navigation' },
  children: [
    {
      path: 'navigation',
      name: 'navigation',
      component: () => import('@/views/navigation/navigation'),
      meta: { title: '导航管理' }
    },
    {
      path: 'addnavigation',
      name: 'addnavigation',
      component: () => import('@/views/navigation/addnavigation'),
      meta: { title: '导航-添加、修改' },
      hidden: true
    },
    {
      path: 'modifyNav',
      name: 'modifyNav',
      component: () => import('@/views/navigation/modifyNav'),
      meta: { title: '导航修改' },
      hidden: true
    }
  ]
}
export default navigation
