import Http from '@/util/httpUtil'
import storageUtil from '@/util/storageUtil'
import Vue from 'vue'

const orgBook = storageUtil.getData('orgBook') || {}
const orgInfo = storageUtil.getData('orgInfo') || {}
const bookInfo = storageUtil.getData('bookInfo') || {}

const app = {
  state: {
    appTopTitle: '',
    appBottomTitle: '',
    menuList: [],
    menuListFlat: [],
    menuListLast: [],
    orgInfo: orgInfo || {},
    // 第一级别组织
    firstOrgList: [],
    // 用户组织树
    userOrgTree: [],
    // 用户组织列表
    userOrgList: [],
    ifGetUserOrg: false,
    keepaliveNames: [],
    bookInfo: bookInfo || {},
    // 账本列表
    userBookList: orgBook.book || []
  },
  mutations: {
    SET_APP_TOP_TITLE(state, value) {
      state.appTopTitle = value
    },
    SET_ORG_INFO(state, value) {
      state.orgInfo = value
    },
    SET_FIRST_ORG_LIST(state, value) {
      state.firstOrgList = value
    },
    SET_APP_BOTTOM_TITLE(state, value) {
      state.appBottomTitle = value
    },
    SET_MENU_LIST(state, value) {
    },
    SET_USER_ORG(state, value) {
      state.userOrgTree = value
      // 有组织才算成功
      if (value.length > 0) {
        state.ifGetUserOrg = true
      }
    },
    SET_KEEP_ALIVE_NAMES(state, value) {
      if (state.keepaliveNames.indexOf(value) === -1) {
        state.keepaliveNames.push(value)
      }
    },
    CLEAR_KEEP_ALIVE_NAMES(state) {
      state.keepaliveNames = []
    },
    // 设置用户账本列表
    SET_USER_BOOK_LIST(state, value) {
      state.userBookList = value
      storageUtil.setData('orgBook', {
        book: value
      })
    },
    // 设置当前选择账本
    SET_BOOK_INFO(state, value) {
      state.bookInfo = value
      storageUtil.setData('bookInfo', value)
    }
  },
  actions: {
    getUserOrg({ commit }, userId) {
      return Http.get(`villageapp/org/findAllOrgByUserId/${userId}`).then((res) => {
        commit('SET_USER_ORG', res.data)
        return res.data
      }).catch((err) => {
        console.log('err', err)
      })
    },
    setOrgInfo({ commit, state }, orgInfo) {
      storageUtil.setData('orgInfo', orgInfo)
      storageUtil.setData('appConfig', 'orgId', orgInfo.phid)
      Vue.prototype.$commonQueryParam = {
        ...(Vue.prototype.$commonQueryParam || {}),
        phCurorgid: orgInfo.phid,
        orgId: orgInfo.phid,
        orgCode: orgInfo.encode,
        orgName: orgInfo.name
      }
      commit('SET_ORG_INFO', orgInfo)
      return orgInfo
    },
    // 查询用户账本
    getUserBooksCache({ commit, state }, orgId) {
      // if (state.userBookList.length) {
      //   return state.userBookList
      // }
      return Http.postFormData(`villageapp/accountBook/listByOrg`, {
        orgId: orgId
      }).then((res) => {
        const bookList = res.data || []
        bookList.forEach((book) => {
          const nowPeriod = book.nowPeriod.split('-')
          book.nowYear = parseInt(nowPeriod[0])
          book.nowMonth = parseInt(nowPeriod[1])
        })
        commit('SET_USER_BOOK_LIST', res.data || [])
        commit('SET_BOOK_INFO', res.data[0] || [])
        return res.data || []
      }).catch((err) => {
        console.log('err', err)
      })
    },
    addKeepaliveName({ commit }, name) {
      commit('SET_KEEP_ALIVE_NAMES', name)
    },
    clearKeepaliveName({ commit }, name) {
      commit('CLEAR_KEEP_ALIVE_NAMES', name)
    }
  }
}

export default app
