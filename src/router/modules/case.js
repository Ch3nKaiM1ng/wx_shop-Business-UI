import Layout from '@/layout'
// 首页跳转

const caseList = {
  path: '/case',
  component: Layout,
  redirect: 'noRedirect',
  name: 'case',
  meta: {
    title: '案例',
    icon: 'example'
  },
  children: [
    {
      path: 'caseList',
      component: () => import('@/views/case/index'),
      name: 'caseList',
      meta: { title: '案例', noCache: true }
    },
    {
      path: 'editCase',
      component: () => import('@/views/case/editCase/editCase.vue'),
      name: 'editCase',
      hidden: true,
      meta: { title: '编辑案例' }
    },
    {
      path: 'caseItem',
      component: () => import('@/views/case/caseItem/index'),
      name: 'caseItem',
      hidden: true,
      meta: { title: '案例分期' }
    },
    {
      path: 'editCaseItem',
      component: () => import('@/views/case/caseItem/editCaseItem.vue'),
      name: 'editCaseItem',
      hidden: true,
      meta: { title: '编辑案例分期' }
    },
    {
      path: 'LevelComment',
      component: () => import('@/views/case/comment/LevelComment.vue'),
      name: 'LevelComment',
      hidden: true,
      meta: { title: '评论列表' }
    },
    {
      path: 'TwoComment',
      component: () => import('@/views/case/comment/TwoComment.vue'),
      name: 'TwoComment',
      hidden: true,
      meta: { title: '二级评论' }
    }
  ]
}

export default caseList

