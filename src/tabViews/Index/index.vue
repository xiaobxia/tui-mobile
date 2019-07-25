<template>
  <div class="tab-view tab-view-index">
    <div class="banner-wrap">
      <mt-swipe :auto="6000">
        <mt-swipe-item><img src="../../assets/banner12.png" alt=""></mt-swipe-item>
        <mt-swipe-item><img src="../../assets/banner11.png" alt=""></mt-swipe-item>
        <mt-swipe-item><img src="../../assets/banner13.png" alt=""></mt-swipe-item>
        <mt-swipe-item><img src="../../assets/banner14.png" alt=""></mt-swipe-item>
        <mt-swipe-item><img src="../../assets/banner15.png" alt=""></mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="entry-wrap" style="display: none">
      <div class="entry-item" @click="toHot">
        <div class="img-wrap red">
          <img src="../../assets/热门.png" alt="">
        </div>
        <div class="text">热门申请</div>
      </div>
      <div class="entry-item" @click="toQuick">
        <div class="img-wrap p">
          <img src="../../assets/极速响应.png" alt="">
        </div>
        <div class="text">极速下款</div>
      </div>
      <div class="entry-item" @click="toNew">
        <div class="img-wrap blue">
          <img src="../../assets/新品.png" alt="">
        </div>
        <div class="text">新品专区</div>
      </div>
      <div class="entry-item" @click="toBig">
        <div class="img-wrap g">
          <img src="../../assets/钱袋.png" alt="">
        </div>
        <div class="text">大额低息</div>
      </div>
    </div>
    <div class="white-block">
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
    </div>
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
      const userInfo = storageUtil.getUserInfo()
      const query = this.$router.history.current.query
      // 添加浏览记录
      this.$addBaiDu('/home', query.cc)
      this.$addViewLog('/home', query)
      if (query.app && query.app === 'true' && userInfo.mobile) {
        this.$http.get('customer/setHasApp', {
          mobile: userInfo.mobile
        })
      }
      this.$http.get('customer/getUserProducts', {
        platform: 2,
        type: 1
      }).then((res) => {
        let list = res.data.list
        this.list = list
        let nameList = []
        list.map((item) => {
          nameList.push(item.name)
        })
        this.adList = createAdList(20, nameList)
      })
    },
    toNew () {
      this.$router.push({
        path: '/page/newProduct',
        query: {
          ...this.$router.history.current.query
        }
      })
    },
    toQuick () {
      this.$router.push({
        path: '/page/quickProduct',
        query: {
          ...this.$router.history.current.query
        }
      })
    },
    toHot () {
      this.$router.push({
        path: '/page/hotProduct',
        query: {
          ...this.$router.history.current.query
        }
      })
    },
    toBig () {
      this.$router.push({
        path: '/page/bigProduct',
        query: {
          ...this.$router.history.current.query
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
