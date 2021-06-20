<template>
  <div class="page-my">
    <van-nav-bar title="首页管理" left-arrow @click-left="onClickLeft" />
    <van-cell-group>
      <van-switch-cell v-model="pz" title="查看凭证" @change="configChange"/>
    </van-cell-group>
    <van-cell-group>
      <van-switch-cell v-model="kmye" title="科目余额表" @change="configChange"/>
    </van-cell-group>
    <van-cell-group>
      <van-switch-cell v-model="hbzj" title="货币资金表" @change="configChange"/>
    </van-cell-group>
    <van-cell-group>
      <van-switch-cell v-model="srqk" title="收入情况表" @change="configChange"/>
    </van-cell-group>
    <van-cell-group>
      <van-switch-cell v-model="zcqk" title="支出情况表" @change="configChange"/>
    </van-cell-group>
    <van-cell-group>
      <van-switch-cell v-model="szmx" title="收支明细表" @change="configChange"/>
    </van-cell-group>
  </div>
</template>

<script>
import storageUtil from '@/util/storageUtil.js'
export default {
  name: 'Management',
  data() {
    return {
      pz: storageUtil.getData('pageConfig', 'pz') || false,
      kmye: storageUtil.getData('pageConfig', 'kmye') || false,
      hbzj: storageUtil.getData('pageConfig', 'hbzj') || false,
      srqk: storageUtil.getData('pageConfig', 'srqk') || false,
      zcqk: storageUtil.getData('pageConfig', 'zcqk') || false,
      szmx: storageUtil.getData('pageConfig', 'szmx') || false
    }
  },
  computed: {},
  created() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    configChange() {
      storageUtil.setData('pageConfig', 'pz', this.pz)
      storageUtil.setData('pageConfig', 'kmye', this.kmye)
      storageUtil.setData('pageConfig', 'hbzj', this.hbzj)
      storageUtil.setData('pageConfig', 'srqk', this.srqk)
      storageUtil.setData('pageConfig', 'zcqk', this.zcqk)
      storageUtil.setData('pageConfig', 'szmx', this.szmx)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
.banner {
}
</style>
