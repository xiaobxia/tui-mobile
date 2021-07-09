const lazyLoading = (path) => () => import(`@/routers/${path}.vue`)

const router = {
  path: '/index',
  component: lazyLoading('Index/index'),
  name: 'Index',
  meta: {
    noCache: true,
    auth: true
  },
  redirect: '/index/home',
  children: [
    {
      path: 'home',
      component: lazyLoading('Index/Home/index'),
      name: 'IndexHome',
      meta: {
        noCache: true,
        auth: true
      }
    },
    {
      path: 'my',
      component: lazyLoading('Index/My/index'),
      name: 'IndexMy',
      meta: {
        noCache: true,
        auth: true
      }
    },
    {
      path: 'loan',
      component: lazyLoading('Index/Loan/index'),
      name: 'IndexLoan',
      meta: {
        noCache: true,
        auth: true
      }
    }
  ]
}

export default router
