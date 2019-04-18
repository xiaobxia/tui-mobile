<template>
  <div class="page-app-download">
    <div v-if="isWechat" class="open-warn">
      <div class="text">请点击右上角</div>
      <div class="text">选择“浏览器中打开”</div>
      <div class="tag"></div>
    </div>
    <div class="img-wrap">
      <img src="../../assets/app-icon.png" alt="">
    </div>
    <div v-if="isWechat" class="wechat-text">微信/QQ 内无法下载应用</div>
    <div v-if="!isWechat" class="download-btn" @click="toDownload">下载安装</div>
  </div>
</template>

<script>
import environmentUtil from '@/util/environmentUtil.js'
export default {
  name: 'AppDownload',
  data () {
    return {
    }
  },
  computed: {
    isWechat () {
      return environmentUtil.ifWechat()
    }
  },
  mounted () {
    setTimeout(() => {
      if (!this.isWechat) {
        this.toDownload()
      }
    }, 500)
  },
  methods: {
    toDownload () {
      const type = environmentUtil.getDeviceType()
      if (type === '安卓') {
        alert('下载安卓')
      } else if (type === '苹果') {
        alert('下载苹果')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
