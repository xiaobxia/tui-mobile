<template>
  <div class="page-my">
    <van-nav-bar title="村情动态" />
    <!--<div class="banner">-->
    <!--<div class="top">-->
    <!--<div class="top1">-->
    <!--<div class="smallTu"/>-->
    <!--<p>惠民政策</p>-->
    <!--</div>-->
    <!--<p @click="detail()">更多</p>-->
    <!--</div>-->
    <!--<div class="top">-->
    <!--<div class="tu">-->
    <!--<img src="../../../assets/user-n.png" alt >-->
    <!--</div>-->
    <!--<div class="banner1">-->
    <!--<p class="zi1">强化组织建设 优化组织功能 领导乡村振兴备份</p>-->
    <!--<p class="zi2">2020/05/04 12:21备份</p>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="top">-->
    <!--<div class="tu">-->
    <!--<img src="../../../assets/user-n.png" alt >-->
    <!--</div>-->
    <!--<div class="banner1">-->
    <!--<p class="zi1">强化组织建设 优化组织功能 领导乡村振兴备份</p>-->
    <!--<p class="zi2">2020/05/04 12:21备份</p>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="banner">-->
    <!--<div class="top">-->
    <!--<div class="top1">-->
    <!--<div class="smallTu"/>-->
    <!--<p>村务动态</p>-->
    <!--</div>-->
    <!--<p @click="detail()">更多</p>-->
    <!--</div>-->
    <!--<div class="top">-->
    <!--<div class="tu">-->
    <!--<img src="../../../assets/user-n.png" alt >-->
    <!--</div>-->
    <!--<div class="banner1">-->
    <!--<p class="zi1">强化组织建设 优化组织功能 领导乡村振兴备份</p>-->
    <!--<p class="zi2">2020/05/04 12:21备份</p>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="top">-->
    <!--<div class="tu">-->
    <!--<img src="../../../assets/user-n.png" alt >-->
    <!--</div>-->
    <!--<div class="banner1">-->
    <!--<p class="zi1">强化组织建设 优化组织功能 领导乡村振兴备份</p>-->
    <!--<p class="zi2">2020/05/04 12:21备份</p>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="banner">-->
    <!--<div class="top">-->
    <!--<div class="top1">-->
    <!--<div class="smallTu"/>-->
    <!--<p>通知公告</p>-->
    <!--</div>-->
    <!--<p @click="detail()">更多</p>-->
    <!--</div>-->
    <!--<div class="top">-->
    <!--<div class="tu">-->
    <!--<img src="../../../assets/user-n.png" alt >-->
    <!--</div>-->
    <!--<div class="banner1">-->
    <!--<p class="zi1">强化组织建设 优化组织功能 领导乡村振兴备份</p>-->
    <!--<p class="zi2">2020/05/04 12:21备份</p>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <van-empty description="该功能未上线" />
  </div>
</template>

<script>
export default {
  name: 'IndexVillageSentiment',
  data() {
    return {
    }
  },
  computed: {},
  created() {
    console.log('VillageSentiment-render')
  },
  methods: {
    detail() {
      this.$router.push({ name: 'village-detail' })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
.banner {
  margin-left: 16px;
  margin-right: 16px;
  display: flex;
  flex-direction:  column;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .top1 {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .smallTu {
        width: 4px;
        height: 14px;
        background: rgba(50, 150, 250, 1);
        border-radius: 3px;
        margin-right: 3px;
      }
    }
  }

  .tu {
    display: flex;
    justify-items: center;
    align-items: center;
    width: 100px;
    height: 68px;
    border: 1px solid #eee;
    img {
      background-size: 100% 100%;
      background-position: center;
      width: 56px;
      height: 56px;
    }
  }

  .banner1 {
    .zi1 {
      width: 220px;
      height: 42px;
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(72, 72, 72, 1);
    }
    .zi2 {

      height: 16px;
      font-size: 11px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #484848;
     margin-top:-10px;
    }
  }
}
</style>
