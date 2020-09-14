import Layout from '@/layout'
const complaint = {
  path: '/complaint',
  component: Layout,
  meta: { title: '投诉建议', icon: 'navigation' },
  children: [
    {
      path: 'complaint',
      name: 'complaint',
      component: () => import('@/views/complaint/complaint'),
      meta: { title: '投诉建议' }
    },
    {
      path: 'modifycomplaint',
      name: 'modifycomplaint',
      component: () => import('@/views/complaint/modifycomplaint'),
      meta: { title: '投诉编辑' },
      hidden: true
    }
  ]
}
export default complaint
