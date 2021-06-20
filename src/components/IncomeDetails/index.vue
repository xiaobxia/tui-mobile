<template>
  <van-popup
    v-model="show"
    :style="{ height: '100%', width: '100%' }"
    position="left"
  >
    <van-nav-bar title="收入明细" left-arrow @click-left="close" />
    <div class="common-view-wrap">
      <van-row class="common-info-block" type="flex" justify="space-between">
        <div class="ellipsis-text">本期总收入</div>
        <div>¥ {{ $formatMoney(sumInfo.incomeCountAmount) }}</div>
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
            v-for="(item, i) in incomeBVOList"
            v-if="item.incomeSubName"
            :key="i"
          >
            <td style="text-align: center">{{ item.incomeSubName }}</td>
            <td style="text-align: center">{{ $formatMoney(item.incomeCurrentAmount) }}</td>
            <td style="text-align: center">{{ $formatMoney(item.incomeCountAmount) }}</td>
          </tr>
        </table>
      </div>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: 'IncomeDetails',
  components: {
  },
  data() {
    return {
      show: false,
      sumInfo: {},
      incomeBVOList: []
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
    open(incomeBVOList) {
      this.sumInfo = incomeBVOList[0]
      this.incomeBVOList = incomeBVOList
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
