<template>
  <div>
    <a v-for="(item, index) in list" :key="index" @click="toLink(item)" class="product-card-simple">
      <div class="main-wrap">
        <div class="icon-wrap">
          <img :src="item.icon_url" alt="">
        </div>
        <div class="title-wrap">
          <div class="name">
            <span class="app-name">{{item.name}}</span>
            <span v-if="type === 'new'" class="right">{{upDay(item)}}</span>
            <span v-else-if="type === 'hot'" class="right"><span class="yellow-text">{{count(item)}}</span>人申请</span>
            <span v-else-if="type === 'big'" class="right">最高额度<span class="yellow-text">{{item.max_quota}}</span>元</span>
            <span v-else class="right">最快{{item.lending_time}}{{item.lending_time_unit}}放款</span>
          </div>
          <div class="link-wrap">
            <span class="introduction">{{item.introduction}}</span>
            <span class="link-tag">去申请借款</span>
          </div>
        </div>
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
import moment from 'moment'
import storageUtil from '@/util/storageUtil.js'
export default {
  name: 'ProductCard',
  data () {
    return {}
  },
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    },
    type: {
      type: String,
      default: 'normal'
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    toLink (item) {
      const query = this.$router.history.current.query
      const deviceInfo = storageUtil.getDeviceInfo()
      const userInfo = storageUtil.getUserInfo()
      if (!userInfo.mobile) {
        this.$router.push({
          path: '/page/login',
          query: {
            ...this.$router.history.current.query
          }
        })
      }
      this.$http.post('log/addUrlClickLog', {
        ...deviceInfo,
        product_id: item._id,
        source_channel_id: query.cc || 'sys',
        mobile: userInfo.mobile || '-'
      })
      let channelName = '自然渠道'
      if (query.cc && localStorage.getItem(query.cc)) {
        channelName = localStorage.getItem(query.cc)
      }
      if (window._hmt) {
        _hmt.push(['_trackEvent', channelName, '点击', item.name])
      }
      setTimeout(() => {
        window.location.href = item.url
      }, 400)
    },
    upDay (item) {
      if (this.type === 'new' && item) {
        const diff = moment().diff(item.create_at, 'days')
        if (diff === 0) {
          return '上架24小时以内'
        } else {
          return moment().diff(item.create_at, 'days') + '天前上架'
        }
      }
    },
    count (item) {
      if (this.type === 'hot' && item) {
        let count = item.history_click_count * 10
        count = count + parseInt(Math.random() * 10)
        return count
      }
    }
  }
}
</script>
<style>
</style>
