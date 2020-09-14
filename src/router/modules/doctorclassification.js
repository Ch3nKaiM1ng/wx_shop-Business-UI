import Layout from '@/layout'
const doctorclassification = {
  path: '/doctors',
  component: Layout,
  meta: { title: '医生', icon: 'doctorc' },
  children: [
    {
      path: 'doctorclassification',
      name: 'doctorclassification',
      component: () => import('@/views/doctorclassification/doctorclassification'),
      meta: { title: '医生分类' }
    },
    {
      path: 'doctorsList',
      name: 'doctorsList',
      component: () => import('@/views/doctorclassification/doctorsList/doctors.vue'),
      meta: { title: '医生列表' }
    },
    {
      path: 'checkdoctor',
      name: 'checkdoctor',
      component: () => import('@/views/doctorclassification/checkdoctor'),
      meta: { title: '医生分类详情' },
      hidden: true
    },
    {
      path: 'editdoctors',
      name: 'doctorsList',
      hidden: true,
      component: () => import('@/views/doctorclassification/doctorsList/editDoctors.vue'),
      meta: { title: '编辑医生' }
    }
  ]
}
export default doctorclassification
