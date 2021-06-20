import Layout from '@/routers/Layout/index'
const lazyLoading = (path) => () => import(`@/routers/${path}.vue`)

const router = {
  path: '/village',
  name: 'Village',
  component: Layout,
  children: [
    // 这个是村情模块的详情对于页面
    {
      name: 'village-detail',
      path: 'detail',
      component: lazyLoading('Village/detail'),
      meta: {
        auth: true
      }
    }
  ]
}

export default router
