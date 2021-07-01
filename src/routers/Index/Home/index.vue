<template>
  <div class="view-home">
    <van-nav-bar title="随借花" />
    <div class="tag-wrap">
      <van-row>
        <van-col span="6">
          <div class="tag-item">
            <div class="i-w" style="background-color: rgb(95,160,255)">
              <img src="../../../assets/home/盾牌.png" alt="">
            </div>
            <div class="i-t">黑名单检测</div>
          </div>
        </van-col>
        <van-col span="6">
          <div class="tag-item">
            <div class="i-w" style="background-color: rgb(255,205,100)">
              <img src="../../../assets/home/快.png" alt="">
            </div>
            <div class="i-t">下款快</div>
          </div>
        </van-col>
        <van-col span="6">
          <div class="tag-item">
            <div class="i-w" style="background-color: rgb(255,115,100)">
              <img src="../../../assets/home/通过.png" alt="">
            </div>
            <div class="i-t">通过率高</div>
          </div>
        </van-col>
        <van-col span="6">
          <div class="tag-item">
            <div class="i-w" style="background-color: rgb(200,120,255)">
              <img src="../../../assets/home/贷款.png" alt="">
            </div>
            <div class="i-t">极速放款</div>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="top-block">
      <div class="t-b-title">
        <img src="../../../assets/home/ai.png" alt="">
        <span class="t-t">金域签报</span>
        <van-tag color="#ffe1e1" text-color="#ad0000">申请最多</van-tag>
      </div>
      <div class="sub-e">日息低至0.03% | 最长可分36个月</div>
      <div class="money-t">5000 - 8万</div>
      <div class="b-button">
        <van-button round block type="info">立即申请</van-button>
      </div>
    </div>
    <van-notice-bar color="#000" background="#FAFAF0">
      <img
        slot="left-icon"
        src="../../../assets/home/礼物.png"
        class="n-b-i"
        alt=""
      >
      <span>建议申请两个产品以上 <span style="color: #ed6a0c">通过率可达90%</span></span>
    </van-notice-bar>
    <div class="item-l">
      <div class="item-c">
        <div class="item-title">
          <img src="../../../assets/home/ai.png" alt="">
          <span class="t-t">金域签报</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import { Toast } from 'vant'

export default {
  name: 'IndexHome',
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  created() {
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/style/_var.scss";
  @import "~@/style/mixin.scss";
  @import "~@/style/theme/theme-color.scss";
  .view-home {
    height: 100vh;
    background-color: $grey-body-color;
  }
  .t-t {
    letter-spacing: 0.1em;
  }
  .n-b-i {
    height: 20px;
    width: 20px;
    margin-right: 10px;
  }
  .top-block {
    margin: 8px 0;
    background-color: #fff;
    padding: 15px 0;
    text-align: center;
    /deep/ {
      .van-tag{
        position: relative;
        top: -0.1em;
      }
    }
    .t-b-title {
      text-align: center;
      line-height: 24px;
      margin-bottom: 10px;
      img {
        width: 24px;
        height: 24px;;
        vertical-align: top;
      }
      .t-t {
        margin: 0 5px;
        font-size: 16px;
        color: #000;
      }
    }
    .sub-e {
      color: $main-text-color;
    }
    .money-t {
      margin: 20px 0;
      color: rgb(253,81,72);
      font-size: 30px;
    }
    .b-button {
      margin: 0 30px;
    }
  }
  .item-l {
    margin: 8px 0;
  }
  .item-c {
    padding: 0 15px;
    background-color: #fff;
    &:last-child{
      .item-title {
        border-bottom: none;
      }
    }
    .item-title {
      padding: 10px 0;
      line-height: 24px;
      border-bottom: 1px solid #eee;
      img {
        width: 24px;
        height: 24px;
        vertical-align: top;
        margin-right: 5px;
      }
      .t-t{
        font-size: 16px;
        color: #000;
      }
    }
  }
  .tag-wrap {
    padding: 10px 0;
    background-color: #fff;
    .tag-item {
      text-align: center;
      .i-w {
        display: inline-block;
        width: 50px;
        height: 50px;
        border-radius: 16px;
        text-align: center;
        line-height: 50px;
        img{
          height: 30px;
          width: 30px;
          vertical-align: middle;
        }
      }
      .i-t {
        margin-top: 10px;
      }
    }
  }
</style>
