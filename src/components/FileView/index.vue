<template>
  <van-popup
    v-model="show"
    :style="{ height: '100%', width: '100%' }"
    position="left"
  >
    <van-nav-bar title="查看附件" left-arrow @click-left="close" />
    <div class="b-b-i">
      <van-row>
        <!--图片部分-->
        <van-col
          v-for="(value, index) in imgList"
          :key="index"
          span="8">
          <div
            class="link-w"
            @click="openImgView(index)"
          >
            <div class="img-w">
              <img :src="value.url" alt >
            </div>
          </div>
        </van-col>
        <!--其他-->
        <van-col
          v-for="(value, index) in otherList"
          :key="index"
          span="8">
          <div
            class="link-w"
            @click="openFile(value)"
          >
            <div class="img-w">
              <div class="f-n ellipsis-text">{{ value.name }}</div>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
  </van-popup>
</template>

<script>
import { ImagePreview } from 'vant'
import setting from '@/setting'

export default {
  name: 'FileView',
  components: {
  },
  data() {
    return {
      fileList: [],
      fileIp: setting.fileIp,
      show: false,
      imgList: [],
      otherList: []
    }
  },
  created() {
  },
  // 关闭
  deactivated() {
    this.show = false
  },
  methods: {
    getNewUrl(url) {
      url = url || ''
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url
      } else if (url.startsWith('/')) {
        return this.fileIp + url
      } else {
        return `${this.fileIp}/${url}`
      }
    },
    open(fileList) {
      fileList = fileList || []
      const newFileList = []
      fileList.forEach((item) => {
        newFileList.push({
          ...item,
          url: this.getNewUrl(item.url)
        })
      })
      const imgList = []
      const otherList = []
      newFileList.forEach((item) => {
        if (this.$isImage(item.url)) {
          imgList.push(item)
        } else {
          otherList.push(item)
        }
      })
      this.imgList = imgList
      this.otherList = otherList
      this.show = true
    },
    close() {
      this.show = false
      this.$emit('close')
    },
    openImgView(index) {
      ImagePreview({
        images: this.imgList.map((item) => {
          return item.url
        }),
        startPosition: index,
        onClose() {
          // do something
        }
      })
    },
    openFile(row) {
      window.open(row.url)
    },
    toPath(path) {
      this.$router.push(path)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/style/_var.scss";
@import "~@/style/theme/theme-color.scss";
.b-b-i {
  margin-top: 12px;
  padding: 0 12px;
  background-color: #fff;
}
.link-w {
  text-align: center;
  margin-bottom: 4px;
  width: 111px;
  height: 64px;
  background-color: #eee;
  .f-n {
    padding: 0 4px;
    margin-top: 20px;
  }
  .img-w {
    display: inline-block;
    width: 111px;
    height: 64px;
    img {
      width: 111px;
      height: 64px;
    }
  }
  .l-t {
    font-size: 14px;
  }
}
</style>
