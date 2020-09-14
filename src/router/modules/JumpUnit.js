import Layout from '@/layout'
// 首页跳转

const JumpUnit = {
  path: '/JumpUnit',
  component: Layout,
  redirect: 'noRedirect',
  name: 'JumpUnit',
  meta: {
    title: '跳转单位',
    icon: 'example'
  },
  children: [
    {
      path: 'AllJumpUnit',
      component: () => import('@/views/JumpUnit/index'),
      name: 'AllJumpUnit',
      meta: { title: '首页跳转单位', noCache: true }
    },
    {
      path: 'AddJumpUnit',
      component: () => import('@/views/JumpUnit/addTo/index'),
      name: 'AddJumpUnit',
      hidden: true,
      meta: { title: '编辑跳转单位' }
    }
  ]
}

export default JumpUnit
