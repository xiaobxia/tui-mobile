import { asyncRouterMap, constantRouterMap } from '@/router'
import permissionUtil from '@/util/permission'

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
    ifAdd: false,
    phid: '',
    status1: '1',
    amount: ''
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = routers.concat(constantRouterMap)
      state.ifAdd = true
    },
    statusChange(status1) {
      this.state.status1 = status1.value
      console.log(this.state.status1)
    }
  },
  actions: {
    Change({ commit }, status1) {
      commit('statusChange', status1)
    },
    generateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        commit('SET_ROUTERS', permissionUtil.filterAsyncRouter(asyncRouterMap, roles))
        resolve()
      })
    },
    generateRoutesWithMenu({ commit }, data) {
      return new Promise(resolve => {
        const { menu } = data
        commit('SET_ROUTERS', permissionUtil.filterAsyncRouterWithMenu(asyncRouterMap, menu))
        resolve()
      })
    }
  }
}

export default permission
