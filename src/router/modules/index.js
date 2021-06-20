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
      path: 'villageSentiment',
      component: lazyLoading('Index/VillageSentiment/index'),
      name: 'IndexVillageSentiment',
      meta: {
        noCache: true,
        auth: true
      }
    },
    {
      path: 'approval',
      component: lazyLoading('Index/Approval/index'),
      name: 'IndexApproval',
      redirect: '/index/approval/pre',
      meta: {
        auth: true
      },
      children: [
        {
          path: 'pre',
          component: lazyLoading('Index/Approval/pre'),
          name: 'IndexApprovalPre',
          meta: {
            auth: true,
            noCache: true,
            activePath: '/index/approval'
          }
        },
        {
          path: 'has',
          component: lazyLoading('Index/Approval/has'),
          name: 'IndexApprovalHas',
          meta: {
            auth: true,
            noCache: true,
            activePath: '/index/approval'
          }
        },
        {
          path: 'mine',
          component: lazyLoading('Index/Approval/mine'),
          name: 'IndexApprovalMine',
          meta: {
            auth: true,
            noCache: true,
            activePath: '/index/approval'
          }
        }
      ]
    }
  ]
}

export default router
