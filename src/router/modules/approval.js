import Layout from '@/routers/Layout/index'
const lazyLoading = (path) => () => import(`@/routers/${path}.vue`)

const router = {
  path: '/approval',
  name: 'Approval',
  component: Layout,
  children: [
    {
      name: 'ApprovalDetail',
      path: 'approvalDetail',
      component: lazyLoading('Approval/ApprovalDetail/index'),
      meta: {
        auth: true
      }
    },
    {
      name: 'ApprovalDetailHas',
      path: 'ApprovalDetailHas',
      component: lazyLoading('Approval/ApprovalDetailHas/index'),
      meta: {
        auth: true
      }
    }
  ]
}

export default router
