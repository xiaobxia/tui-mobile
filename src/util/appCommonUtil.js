import storageUtil from '@/util/storageUtil'
import authUtil from '@/util/authUtil'

export default {
  // 设置登录，为应对不同平台抽象
  setLoginToken(token) {
    authUtil.setToken(token)
  },
  // 设置登录，为应对不同平台抽象
  setLoginInfo(userInfo) {
    storageUtil.setData('UserInfo', userInfo)
  },
  // 退出登录，为应对不同平台抽象
  removeLoginAuth() {
    authUtil.removeToken()
    storageUtil.clearAll()
  }
}
