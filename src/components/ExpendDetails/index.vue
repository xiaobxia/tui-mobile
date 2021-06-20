<template>
  <van-popup
    v-model="show"
    :style="{ height: '100%', width: '100%' }"
    position="left"
  >
    <van-nav-bar title="支出明细" left-arrow @click-left="close" />
    <div class="common-view-wrap">
      <van-row class="common-info-block" type="flex" justify="space-between">
        <div class="ellipsis-text">本期总支出</div>
        <div>¥ {{ $formatMoney(sumInfo.loanCountAmount) }}</div>
      </van-row>
      <div class="common-block">
        <table width="100%" cellspacing="0" cellpadding="0" border="2">
          <thead>
            <tr>
              <th>科目</th>
              <th>本期发生额</th>
              <th>累计发生额</th>
            </tr>
          </thead>
          <tr
            v-for="(item, i) in spendingBVOList"
            v-if="item.loanSubName"
            :key="i"
          >
            <td style="text-align: center">{{ item.loanSubName }}</td>
            <td style="text-align: center">{{ $formatMoney(item.loanCurrentAmount) }}</td>
            <td style="text-align: center">{{ $formatMoney(item.loanCountAmount) }}</td>
          </tr>
        </table>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: 'ExpendDetails',
  components: {
  },
  data() {
    return {
      show: false,
      sumInfo: {},
      spendingBVOList: []
    }
  },
  computed: {
  },
  created() {
  },
  // 关闭
  deactivated() {
    this.show = false
  },
  methods: {
    open(spendingBVOList) {
      this.sumInfo = spendingBVOList[0]
      this.spendingBVOList = spendingBVOList
      this.show = true
    },
    close() {
      this.show = false
      this.$emit('close')
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
.common-view-wrap {
  background-color: $grey-body-color;
}
.common-info-block {
  margin: 12px 0;
}
.s-w {
  padding: 12px 16px;
}
</style>
