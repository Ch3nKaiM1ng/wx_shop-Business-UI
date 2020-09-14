import Layout from '@/layout'
const questions = {
  path: '/questions',
  component: Layout,
  meta: { title: '问答列表', icon: 'form' },
  children: [
    {
      path: 'questions',
      name: 'questions',
      component: () => import('@/views/questions/questions'),
      meta: { title: '问答主题' }
    },
    {
      path: 'addquestions',
      name: 'addquestions',
      component: () => import('@/views/questions/addquestions'),
      meta: { title: '问答编辑' },
      hidden: true
    },
    {
      path: 'questionresponse',
      name: 'questionresponse',
      component: () => import('@/views/questions/questionresponse'),
      meta: { title: '问答回复' },
      hidden: true
    },
    {
      path: 'addquestionresponse',
      name: 'addquestionresponse',
      component: () => import('@/views/questions/addquestionresponse'),
      meta: { title: '回复编辑' },
      hidden: true
    },
    {
      path: 'respondtocomments',
      name: 'respondtocomments',
      component: () => import('@/views/questions/respondtocomments'),
      meta: { title: '回复评论' },
      hidden: true
    },
    {
      path: 'addrespondtocomments',
      name: 'addrespondtocomments',
      component: () => import('@/views/questions/addrespondtocomments'),
      meta: { title: '评论编辑' },
      hidden: true
    },
    {
      path: 'replyRes',
      name: 'replyRes',
      component: () => import('@/views/questions/replyRes'),
      meta: { title: '回复评论' },
      hidden: true
    }

  ]
}
export default questions
