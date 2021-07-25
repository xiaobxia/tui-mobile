import Cookies from 'js-cookie'
import AES from 'crypto-js/aes'
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
    const str = AES.encrypt('' + Date.now(), setting.psidKey).toString()
    // 1天过期
    return Cookies.set(key, str, { expires: 1 })
  },
  removeId() {
    return Cookies.remove(key)
  },
  getInfo(key) {
    return Cookies.get(key)
  },
  setInfo(key, str) {
    return Cookies.set(key, str, { expires: 1 })
  },
  setClick(phone, row) {
    return AES.encrypt(`${phone}+${row._id}`, setting.psidKey).toString()
  }
}
