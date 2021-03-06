import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import state from './state'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations,
  modules: {
    user
  },
  getters
})

export default store
