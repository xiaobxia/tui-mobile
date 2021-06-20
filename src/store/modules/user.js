import Http from '@/util/httpUtil'
import storageUtil from '@/util/storageUtil'
import authUtil from '@/util/authUtil'
import Vue from 'vue'
// import Base64 from '@/lib/base64'

const userInfo = storageUtil.getData('UserInfo') || {}

const user = {
  state: {
    userInfo: userInfo || {}
  },
  mutations: {
    SET_USER_INFO: (state, info) => {
      state.userInfo = {
        ...state.userInfo,
        ...info
      }
      storageUtil.setData('UserInfo', state.userInfo)
      Vue.prototype.$commonQueryParam = {
        ...(Vue.prototype.$commonQueryParam || {}),
        phCreator: info.userName,
        phCurorgid: '' + info.orgId,
        phEditorId: '',
        phEditorName: '',
        phUserId: '' + info.phid,
        // orgId: '' + info.orgId,
        creator: '' + info.phid
      }
    }
  },
  actions: {
    appLogin({ commit }, userInfo) {
      // const base64 = new Base64()
      const param = {
        usersName: userInfo.username.trim(),
        passWord: userInfo.password.trim()
      }
      // 'villageapp/users-local-oauth-app/login'
      let url = 'villageapp/users/login'
      // 钉钉使用的登录
      if (process.env.ENV_CONFIG === 'dingding') {
        url = 'villageapp/dingtalk/login'
        param.dingTalkUserVO = JSON.parse(sessionStorage.getItem('dingdingAuth') || '{}')
      }
      return Http.postFormData(url, {
        ...param
      }).then((data) => {
        window._token = data.data // data.data.token
        authUtil.setToken(data.data)
      })
    },
    getUserInfo({ commit }, noAuth) {
      return Http.get('villageapp/users/getUserInfoByToken', {}, { noAuth: !!noAuth }).then((res) => {
        // debugger
        commit('SET_USER_INFO', res.data)
        return res.data
      }).catch((err) => {
        console.log('err', err)
      })
    }
  }
}

export default user
