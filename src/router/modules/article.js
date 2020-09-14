import Layout from '@/layout'
const article = {
  path: '/article',
  component: Layout,
  meta: { title: '文章列表', icon: 'form' },
  children: [
    {
      path: 'article',
      name: 'article',
      component: () => import('@/views/article/article'),
      meta: { title: '文章列表' }
    },
    {
      path: 'addarticle',
      name: 'addarticle',
      component: () => import('@/views/article/addarticle'),
      meta: { title: '文章编辑' },
      hidden: true
    },
    {
      path: 'artComment',
      name: 'artComment',
      component: () => import('@/views/artComment/artComment'),
      meta: { title: '评论列表' },
      hidden: true
    },
    {
      path: 'addArtComment',
      name: 'addArtComment',
      component: () => import('@/views/artComment/addArtComment'),
      meta: { title: '添加评论' },
      hidden: true
    },
    {
      path: 'userComment',
      name: 'userComment',
      component: () => import('@/views/artComment/userComment'),
      meta: { title: '用户评论' },
      hidden: true
    },
    {
      path: 'addUserComment',
      name: 'addUserComment',
      component: () => import('@/views/artComment/addUserComment'),
      meta: { title: '用户评论' },
      hidden: true
    },
    {
      path: 'modifyComment',
      name: 'modifyComment',
      component: () => import('@/views/artComment/modifyComment'),
      meta: { title: '回复评论' },
      hidden: true
    }

  ]
}
export default article
