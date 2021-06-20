import Layout from '@/routers/Layout/index'
const lazyLoading = (path) => () => import(`@/routers/${path}.vue`)

const router = {
  path: '/mine',
  name: 'Mine',
  component: Layout,
  children: [
    // 账户信息
    {
      name: 'mine-accountInfo',
      path: 'accountInfo',
      component: lazyLoading('Mine/accountInfo'),
      meta: {
        auth: true
      }
    },
    // 点击我的中审批设置跳转到审批设置页面
    {
      name: 'mine-management',
      path: 'management',
      component: lazyLoading('Mine/management'),
      meta: {
        auth: true
      }
    },
    // 我的模块中审批码设置 此处是我的模块开始
    {
      name: 'mine-approvalSettings',
      path: 'approvalSettings',
      component: lazyLoading('Mine/approvalSettings'),
      meta: {
        auth: true
      }
    },
    // 审批码重置页面
    {
      name: 'mine-resetting',
      path: 'resetting',
      component: lazyLoading('Mine/resetting'),
      meta: {
        auth: true
      }
    },
    // 发送短信时审批码重置校验
    {
      name: 'mine-resetVerification',
      path: 'resetVerification',
      component: lazyLoading('Mine/resetVerification'),
      meta: {
        auth: true
      }
    },
    // 输入登录密码重置校验
    {
      name: 'mine-applicationCode',
      path: 'applicationCode',
      component: lazyLoading('Mine/applicationCode'),
      meta: {
        auth: true
      }
    },
    // 新审批码设置页面 这个是启动审批校验调后端接口跳转的新审批码设置页面
    {
      name: 'mine-newApplication',
      path: 'newApplication',
      component: lazyLoading('Mine/newApplication'),
      meta: {
        auth: true
      }
    },
    // 审批码设置 激活上个页面中启用审批校验开关跳转的页面
    {
      name: 'mine-newApplication1',
      path: 'newApplication1',
      component: lazyLoading('Mine/newApplication1'),
      meta: {
        auth: true
      }
    },
    // 审批码设置
    {
      name: 'mine-newApplication2',
      path: 'newApplication2',
      component: lazyLoading('Mine/newApplication2'),
      meta: {
        auth: true
      }
    },
    // 审批码重置校验页面
    {
      name: 'mine-resetVerification1',
      path: 'resetVerification1',
      component: lazyLoading('Mine/resetVerification1'),
      meta: {
        auth: true
      }
    },
    // 审批码模块验证跳转页面
    {
      name: 'mine-resetVerification2',
      path: 'resetVerification2',
      component: lazyLoading('Mine/resetVerification2'),
      meta: {
        auth: true
      }
    },
    {
      name: 'mine-applicationCode1',
      path: 'applicationCode1',
      component: lazyLoading('Mine/applicationCode1'),
      meta: {
        auth: true
      }
    },
    {
      name: 'mine-approvalCode',
      path: 'approvalCode',
      component: lazyLoading('Mine/approvalCode'),
      meta: {
        auth: true
      }
    }
  ]
}

export default router
