import Layout from '@/layout'
// 广告模块

const Advertising = {
  path: '/advertising',
  component: Layout,
  redirect: 'noRedirect',
  name: 'advertising',
  meta: {
    title: '广告',
    icon: 'ad'
  },
  children: [
    {
      path: 'AdvertisingTop',
      component: () => import('@/views/advertising/advertisingTop/advertisingtop.vue'),
      name: 'advertisingtop',
      meta: { title: '顶部广告', noCache: true }
    },
    {
      path: 'increase',
      component: () => import('@/views/advertising/advertisingTop/increase.vue'),
      name: 'increase',
      hidden: true,
      meta: { title: '顶部广告添加' }
    },
    {
      path: 'centralSection',
      component: () => import('@/views/advertising/advertisingCentral/centralSection.vue'),
      name: 'centralSection',
      meta: { title: '中部广告添加', noCache: true }
    },
    {
      path: 'addpicture',
      name: 'addpicture',
      component: () => import('@/views/advertising/advertisingCentral/addpicture'),
      meta: { title: 'benner图片编辑' },
      hidden: true
    },
    {
      path: 'HotAd',
      component: () => import('@/views/advertising/HotAd/index'),
      name: 'HotAd',
      meta: { title: '热搜广告', noCache: true }
    },
    {
      path: 'editHotad',
      component: () => import('@/views/advertising/HotAd/editHotad.vue'),
      name: 'editHotad',
      hidden: true,
      meta: { title: '热搜广告', noCache: true }
    },
    {
      path: 'Carousel',
      component: () => import('@/views/advertising/PcAdvertising/Carousel/index'),
      name: 'Carousel',
      meta: { title: 'pc轮播广告', noCache: true }
    },
    {
      path: 'editCarousel',
      component: () => import('@/views/advertising/PcAdvertising/Carousel/edit.vue'),
      name: 'editHotad',
      hidden: true,
      meta: { title: 'pc轮播广告编辑', noCache: true }
    },
    {
      path: 'theme',
      component: () => import('@/views/advertising/PcAdvertising/theme/index'),
      name: 'theme',
      meta: { title: 'pc主题图片', noCache: true }
    },
    {
      path: 'editTheme',
      component: () => import('@/views/advertising/PcAdvertising/theme/edit.vue'),
      name: 'editHotad',
      hidden: true,
      meta: { title: 'pc主题图片编辑', noCache: true }
    }
  ]
}

export default Advertising
