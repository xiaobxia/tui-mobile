<template>
  <div id="app">
    <keep-alive :include="keepaliveNames">
      <router-view :key="key" />
    </keep-alive>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import storageUtil from '@/util/storageUtil'

export default {
  name: 'App',
  data() {
    return {}
  },
  computed: {
    key() {
      return this.$route.meta.activePath || this.$route.fullPath
    },
    ...mapGetters(['keepaliveNames'])
  },
  watch: {},
  created() {
    console.log('App-render')
    const userInfo = storageUtil.getData('UserInfo') || {}
    const orgInfo = storageUtil.getData('orgInfo') || {}
    Vue.prototype.$commonQueryParam = {
      ...(Vue.prototype.$commonQueryParam || {}),
      phCreator: userInfo.userName,
      phEditorId: '',
      phEditorName: '',
      phUserId: '' + userInfo.phid,
      creator: '' + userInfo.phid,
      phCurorgid: orgInfo.phid,
      orgCode: orgInfo.encode,
      orgId: orgInfo.phid,
      orgName: orgInfo.name
    }
  },
  mounted() {
    if (process.env.ENV_CONFIG === 'dingding') {
      // 单页应用 或 “单个页面”需异步补充PV日志参数还需进行如下埋点：
      // window.aplus_queue.push({
      //   action: 'aplus.setMetaInfo',
      //   arguments: ['aplus-waiting', 'MAN']
      // })
    }
  },
  methods: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/style/_var.scss";
.loading-c {
  margin-top: 40vh;
}
</style>
