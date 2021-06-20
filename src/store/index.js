import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import permission from './modules/permission'
import approval from './modules/approval'
import user from './modules/user'
import state from './state'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations,
  modules: {
    app,
    permission,
    user,
    approval
  },
  getters
})

export default store
