import Cookies from 'js-cookie'
import CryptoJS from 'crypto-js'
import setting from '@/setting'

const key = 'psid-tui'

export default {
  getId() {
    return Cookies.get(key)
  },
  setId() {
    if (this.getId()) {
      return true
    }
    // 加上时间，每个都是唯一的
    const str = CryptoJS.AES.encrypt('' + Date.now(), setting.psidKey).toString()
    // 7天过期
    return Cookies.set(key, str, { expires: 7 })
  },
  removeId() {
    return Cookies.remove(key)
  },
  getInfo(key) {
    return Cookies.get(key)
  },
  setInfo(key, str) {
    return Cookies.set(key, str, { expires: 7 })
  },
  setClick(phone, row) {
    return CryptoJS.AES.encrypt(`${phone}+${row._id}`, setting.psidKey).toString()
  }
}
