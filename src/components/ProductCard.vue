<template>
  <div>
    <a v-for="(item, index) in list" :key="index" @click="toLink(item)" class="product-card">
      <div class="icon-wrap">
        <img :src="item.icon_url" alt="">
      </div>
      <div class="link-wrap">
        <span>最快{{item.lending_time}}{{item.lending_time_unit}}放款</span>
        <span class="link-tag">去申请借款</span>
      </div>
      <div class="name">
        {{item.name}}
      </div>
      <div class="detail-wrap">
        <div class="detail-item">
          <div class="detail-title">日利率</div>
          <div class="detail-value">{{item.daily_rate}}%</div>
        </div>
        <div class="line"></div>
        <div class="detail-item">
          <div class="detail-title">额度范围(元)</div>
          <div class="detail-value">{{item.min_quota}}-{{item.max_quota}}</div>
        </div>
        <div class="line"></div>
        <div class="detail-item">
          <div class="detail-title">借款期限({{item.term_unit}})</div>
          <div class="detail-value">{{item.min_term}}-{{item.max_term}}</div>
        </div>
      </div>
    </a>
  </div>
</template>
<script>
import storageUtil from '@/util/storageUtil.js'
export default {
  name: 'ProductCard',
  data () {
    return {}
  },
  computed: {},
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  mounted () {
  },
  methods: {
    toLink (item) {
      const query = this.$router.history.current.query
      const deviceInfo = storageUtil.getDeviceInfo()
      const userInfo = storageUtil.getUserInfo()
      this.$http.post('log/addUrlClickLog', {
        ...deviceInfo,
        product_id: item._id,
        source_channel_id: query.cc || 'sys',
        mobile: userInfo.mobile || '-'
      })
      window.location.href = item.url
    }
  }
}
</script>
<style>
</style>
