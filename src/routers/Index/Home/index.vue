<template>
  <div class="view-home">
    <van-nav-bar title="随借花" />
    <van-swipe :autoplay="3000" class="my-swipe" indicator-color="white">
      <van-swipe-item v-for="(item, index) in rList" :key="index">
        <div class="top-block">
          <div class="t-b-title">
            <img :src="item.icon_url" alt="">
            <span class="t-t">{{ item.name }}</span>
            <van-tag color="#ffe1e1" text-color="#ad0000">申请最多</van-tag>
          </div>
          <van-divider>
            <div class="sub-e">日息低至{{ item.daily_rate }}% | 最长可分{{ item.max_term }}个月</div>
          </van-divider>
          <div class="money-t">{{ $formatWan(item.min_quota) }} - {{ $formatWan(item.max_quota) }}</div>
          <div class="b-button">
            <van-button round block type="info" @click="toHandler(item)">立即申请</van-button>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <div class="tag-wrap">
      <van-row>
        <van-col span="6">
          <div class="tag-item" @click="toRItem">
            <div class="i-w" style="background-color: rgb(95,160,255)">
              <img src="../../../assets/home/盾牌.png" alt="">
            </div>
            <div class="i-t">黑名单检测</div>
          </div>
        </van-col>
        <van-col span="6">
          <div class="tag-item" @click="toRItem">
            <div class="i-w" style="background-color: rgb(255,205,100)">
              <img src="../../../assets/home/快.png" alt="">
            </div>
            <div class="i-t">下款快</div>
          </div>
        </van-col>
        <van-col span="6">
          <div class="tag-item" @click="toRItem">
            <div class="i-w" style="background-color: rgb(255,115,100)">
              <img src="../../../assets/home/通过.png" alt="">
            </div>
            <div class="i-t">通过率高</div>
          </div>
        </van-col>
        <van-col span="6">
          <div class="tag-item" @click="toRItem">
            <div class="i-w" style="background-color: rgb(200,120,255)">
              <img src="../../../assets/home/ji.png" alt="">
            </div>
            <div class="i-t">极速放款</div>
          </div>
        </van-col>
      </van-row>
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
      <div v-for="(item, index) in list" :key="index" class="item-c">
        <div class="item-title">
          <img :src="item.icon_url" alt="">
          <span class="t-t">{{ item.name }}</span>
          <!--<span style="float: right;color: #bbb">1090808人下款</span>-->
        </div>
        <div class="item-detail">
          <van-row>
            <van-col span="15">
              <div class="i-text">
                <van-row>
                  <van-col span="14">
                    <div class="money-t">{{ $formatWan(item.min_quota) }} - {{ $formatWan(item.max_quota) }}</div>
                  </van-col>
                  <van-col span="10">
                    <div class="month">{{ item.min_term }} ~ {{ item.max_term }} 月</div>
                  </van-col>
                </van-row>
              </div>
              <div class="sub-e">日息低至{{ item.daily_rate }}% | 最长可分{{ item.max_term }}个月</div>
            </van-col>
            <van-col span="9">
              <div class="b-button">
                <van-button round block type="info" @click="toHandler(item)">立即申请</van-button>
              </div>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import appMixins from '@/mixins/app'
// import { Toast } from 'vant'

export default {
  name: 'IndexHome',
  components: {
  },
  mixins: [appMixins],
  data() {
    return {
      rList: [],
      list: []
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  created() {
    this.queryList()
  },
  methods: {
    toHandler(row) {
      this._addClick(row).then(() => {
        window.location = row.url
      })
    },
    queryList() {
      this.$http.get('tuiServer/h5/getProducts').then((res) => {
        const data = res.data || {}
        const list = data.list || []
        const rList = []
        list.forEach((v) => {
          if (v.is_recommend) {
            rList.push(v)
          }
        })
        this.rList = rList
        this.list = list
      })
    },
    toRItem() {
      const index = Math.floor(Math.random() * this.rList.length)
      this.toHandler(this.rList[index])
    }
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
    padding: 15px;
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
      margin: 0 15px;
    }
  }
  .item-l {
    margin: 8px 0;
    padding-bottom: 50px;
  }
  .item-c {
    padding: 0 15px;
    background-color: #fff;
    margin-bottom: 8px;
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
    .item-detail {
      position: relative;
      padding: 10px 0 14px 0;
      .i-text {
        line-height: 24px;
      }
      .money-t {
        margin-bottom: 10px;
        color: rgb(253,81,72);
        font-size: 20px;
      }
      .month {
        font-size: 18px;
        color: #000;
      }
      .b-button {
        width: 100px;
        position: absolute;
        right: 0;
        top: 20px;
      }
      /deep/ {
        .van-button--block {
          line-height: 28px;
          height: 28px;
          font-size: 12px;
          border-radius: 28px;
        }
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
