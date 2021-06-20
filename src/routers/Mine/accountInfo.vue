<template>
  <div class="page-my">
    <van-nav-bar
      title="账户信息"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="page-grey-bg">
      <div class="b-b">
        <van-cell
          :value="userInfo.userName"
          title="姓名"
        />
        <van-cell
          :value="userInfo.cardNumber"
          title="身份证号"
        />
        <van-cell
          :value="userInfo.phone"
          title="手机号"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AccountInfo',
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {},
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
.b-b {
  margin-top: 12px;
}
</style>
