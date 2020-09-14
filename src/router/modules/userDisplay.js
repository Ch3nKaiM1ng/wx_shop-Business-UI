import Layout from '@/layout'
// 用户信息

const userDisplay = {
  path: '/userDisplay',
  component: Layout,
  redirect: 'noRedirect',
  name: 'userDisplay',
  meta: {
    title: '用户信息',
    icon: 'user'
  },
  children: [
    {
      path: 'internalUser',
      component: () => import('@/views/userDisplay/internalUser.vue'),
      name: 'internalUser',
      meta: { title: '内部工作用户', noCache: true }
    },
    {
      path: 'realUser',
      component: () => import('@/views/userDisplay/realUser.vue'),
      name: 'realUser',
      meta: { title: '注册用户', noCache: true }
    },
    {
      path: 'editUser',
      component: () => import('@/views/userDisplay/edit/editUser.vue'),
      name: 'editUser',
      hidden: true,
      meta: { title: '编辑用户' }
    }
  ]
}

export default userDisplay
