import psidUtil from '@/util/psidUtil'
export default {
  data() {
    return {
    }
  },
  methods: {
    _addClick(row) {
      const phone = psidUtil.getInfo('phone')
      const channelCode = psidUtil.getInfo('channelCode')
      return this.$http.get('tuiServer/h5/userClick', {
        psid: psidUtil.getId(),
        phone: phone || '',
        channel_code: channelCode || '',
        product_id: row._id,
        psid_click: psidUtil.setClick(this.phone, row),
        platform: 'h5'
      })
    }
  }
}
