<template>
  <van-popup
    v-model="show"
    :style="{ height: '100%', width: '100%' }"
    position="left"
  >
    <van-nav-bar title="支出明细" left-arrow @click-left="close" />
    <div class="common-view-wrap" style="overflow-x: scroll">
      <van-row class="common-info-block" type="flex" justify="space-between" style="background-color: #F7F8F9;">
        <div class="ellipsis-text">本期总支出</div>
        <div>¥ {{ $formatMoney(sumInfo.spendingTotalPeriod) }}</div>
      </van-row>
      <div class="common-block">
        <table cellspacing="0" cellpadding="0" border="1">
          <thead>
            <tr>
              <th width="25%">总账科目</th>
              <th width="25%">明细科目</th>
              <th width="25%">摘要说明</th>
              <th width="25%">金额</th>
            </tr>
          </thead>
          <tr v-for="(item, i) in spendingBVOList" :key="i">
            <td style="text-align: left;font-size: .32rem;">{{ item.subCode }} - {{ item.subName }}</td>
            <td style="text-align: left;font-size: .32rem;">{{ item.subCode }} - {{ item.subName }}</td>
            <td style="text-align: left;font-size: .32rem;">{{ item.subAbstract }}</td>
            <td style="text-align: right;font-size: .32rem;">{{ $formatMoney(item.subMny) }}</td>
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
    open(spendingBVOList, detailData) {
      this.sumInfo = detailData
      const newList = []
      spendingBVOList.forEach((item) => {
        if (item.bvos && item.bvos.length) {
          item.bvos.forEach((sub) => {
            newList.push({
              ...sub,
              sumSubCode: item.subCode,
              sumSubName: item.subName,
              sumSubAbstract: item.subAbstract,
              sumSubMny: item.subMny
            })
          })
        }
      })
      this.spendingBVOList = newList
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
