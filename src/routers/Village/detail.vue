<template>
  <div class="banner">
    <van-nav-bar title="文章详情" left-arrow @click-left="onClickLeft" />
    <p class="top1">我国修改农村土地承包法加大农民权益保障</p>
    <p class="top2">村公共事业部 2020/05/04 12</p>
    <div class="tu"/>
    <div
      class="top3"
    >2015年8月，国务院办公厅下发《关于进一步促进旅游投资和消费的若干意见》，首次鼓励“周五下午与周末结合”的2.5天休假模式。 中新经纬客户端注意到，今年以来，已有江西九江、呼伦贝尔、浙江嵊州、湖北宜昌等地宣布实施2.5天弹性休假制度的具体实施日期。 4月8日，江西省九江市发布《关于打好“组合拳”提振旅游消费的通知》明确，落实江西省政府提出的今年二季度试行周末2.5天弹性作息，鼓励干部职工周五下午合并周末时间外出休闲度假。江西省文化和旅游厅相关负责人表示，此次试行2.5天假期制只是在今年二季度的三个月内，时间并不长，所以预计惠及的群体中，起到带头作用的机关事业单位等有望率先受益。 6月10日，呼伦贝尔市人民政府官方消息称，2020年6月10日至9月30日，呼伦贝尔市党政机关及国有企事业单位在职干部职工在严格遵守相关法律、不影响正常工作和生产生活的前提下，可根据实际情况，暂行周末2.5天弹性休假工作制度。</div>
  </div>
</template>

<script>

export default {
  name: 'VillageDetail',
  data() {
    return {
      value: '123',
      showKeyboard: true
    }
  },
  computed: {},
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
.banner {
  width: 100%;
  height: 100%;
  margin-right: 20px; display: flex;
flex-direction:  column;

  .top1 {
    width: 285px;
    height: 21px;
    font-size: 15px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(72, 72, 72, 1);
    line-height: 21px;
    margin-left: 16px;
  }
  .tu {
    width: 343px;
    height: 160px;
    background: red;
     margin-left: 16px;
  }
  .top2 {
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(72, 72, 72, 1);
    line-height: 17px;
     margin-left: 16px;
  }
  .top3 {
    width: 343px;
    height: 320px;
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(72, 72, 72, 1);
    line-height: 20px;
     margin-left: 16px;
  }
}
</style>
