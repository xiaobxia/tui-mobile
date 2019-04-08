<template>
  <div class="tab-view tab-view-index">
    <div class="banner-wrap">
      <mt-swipe :auto="6000">
        <mt-swipe-item><img src="../../assets/banner1.jpg" alt=""></mt-swipe-item>
        <mt-swipe-item><img src="../../assets/banner2.jpg" alt=""></mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="title-bar">
      <span>热门推荐</span>
      <div class="ad">
        <mt-swipe :show-indicators="false">
          <mt-swipe-item v-for="(adItem, index) in adList" :key="index" v-html="'<span>' + adItem + '</span>'"></mt-swipe-item>
        </mt-swipe>
      </div>
    </div>
    <div class="product-list">
      <product-card-simple :list="list"></product-card-simple>
    </div>
    <a href="#/page/tuiguang">/page/tuiguang</a>
  </div>
</template>

<script>
import ProductCardSimple from '@/components/ProductCardSimple.vue'
import storageUtil from '@/util/storageUtil.js'

function createAd (nameList) {
  nameList = nameList || ['']
  const numArray = ['139', '138', '137', '136', '135', '134', '159', '158', '157', '150', '151', '152', '188', '187', '182', '183', '184', '178', '130', '131', '132', '156', '155', '186', '185', '176', '133', '153', '189', '180', '181', '177']
  const index = Math.round((numArray.length - 1) * Math.random())
  const last = parseInt(Math.random() * 10000)
  // let moneyList = [5000, 1000, 2000, 3000, 4000]
  // const moneyIndex = Math.round((moneyList.length - 1) * Math.random())
  const nameIndex = Math.round((nameList.length - 1) * Math.random())
  return `${numArray[index]}****${last}成功申请<i class="red-text">${nameList[nameIndex]}</i>`
}
function createAdList (number, nameList) {
  let list = []
  for (let i = 0; i < number; i++) {
    list.push(createAd(nameList))
  }
  return list
}
export default {
  name: 'Index',
  data () {
    return {
      adList: [],
      list: []
    }
  },
  components: {ProductCardSimple},
  created () {
    this.initPage()
  },
  methods: {
    initPage () {
      const query = this.$router.history.current.query
      const deviceInfo = storageUtil.getDeviceInfo()
      const userInfo = storageUtil.getUserInfo()
      // 添加浏览记录
      this.$http.post('log/addViewLog', {
        ...deviceInfo,
        page: 'home',
        source_channel_id: query.cc || 'sys',
        mobile: userInfo.mobile
      })
      this.$http.get('customer/getUserProducts', {
        is_recommend: true
      }).then((res) => {
        let list = res.data.list
        this.list = list
        let nameList = []
        list.map((item) => {
          nameList.push(item.name)
        })
        this.adList = createAdList(20, nameList)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
