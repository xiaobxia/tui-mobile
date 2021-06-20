<template>
  <div class="page-index">
    <div>
      <keep-alive :include="keepaliveNames">
        <router-view :key="key"/>
      </keep-alive>
    </div>
    <van-tabbar v-model="active">
      <!--<van-tabbar-item-->
      <!--name="/index/home"-->
      <!--@click="toPath('/index/home')"-->
      <!--&gt;-->
      <!--<span>首页</span>-->
      <!--<template #icon="props">-->
      <!--<img v-if="props.active" src="../../assets/tabbarIcon/home-a.png" >-->
      <!--<img v-else src="../../assets/tabbarIcon/home-n.png" >-->
      <!--</template>-->
      <!--</van-tabbar-item>-->
      <van-tabbar-item
        name="/index/approval"
        @click="toPath('/index/approval')"
      >
        <span>审批</span>
        <template #icon="props">
          <img v-if="props.active" src="../../assets/tabbarIcon/approval-a.png" >
          <img v-else src="../../assets/tabbarIcon/approval-n.png" >
        </template>
      </van-tabbar-item>
      <!--<van-tabbar-item-->
      <!--name="/index/villageSentiment"-->
      <!--@click="toPath('/index/villageSentiment')"-->
      <!--&gt;-->
      <!--<span>村情</span>-->
      <!--<template #icon="props">-->
      <!--<img v-if="props.active" src="../../assets/tabbarIcon/v-a.png" >-->
      <!--<img v-else src="../../assets/tabbarIcon/v-n.png" >-->
      <!--</template>-->
      <!--</van-tabbar-item>-->
      <van-tabbar-item
        name="/index/my"
        @click="toPath('/index/my')"
      >
        <span>我的</span>
        <template #icon="props">
          <img v-if="props.active" src="../../assets/tabbarIcon/mine-a.png" >
          <img v-else src="../../assets/tabbarIcon/mine-n.png" >
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Index',
  data() {
    return {
      active: '/index/approval'
    }
  },
  computed: {
    // TODO 写的有问题，最好不要出现嵌套缓存的情况
    // 当前组件是父组件，父组件keep-alive，那就会一直监听key的变化，导致和key相关的子组件重新刷新
    // 最后决定不缓存当前组件
    key() {
      // if (this.$route.path.startsWith('/index/')) {
      //   // 这里不需要full
      //   return this.$route.path
      // } else {
      //   return 'other'
      // }
      return this.$route.meta.activePath || this.$route.path
    },
    ...mapGetters([
      'keepaliveNames'
    ])
  },
  watch: {
    '$route.fullPath'() {
      this.active = this.$route.meta.activePath || this.$route.path
    }
  },
  created() {
    console.log('index-render')
    this.getActive()
  },
  methods: {
    getActive() {
      this.active = this.$route.meta.activePath || this.$route.path
    },
    backHandler() {
      this.$router.history.go(-1)
    },
    toPath(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/style/_var.scss";
</style>
