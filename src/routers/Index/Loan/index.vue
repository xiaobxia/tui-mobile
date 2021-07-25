<template>
  <div class="view-home">
    <van-nav-bar title="超市" />
    <div class="item-l">
      <div v-for="(item, index) in list" :key="index" class="item-c">
        <div class="item-title">
          <img :src="item.icon_url" alt="">
          <span class="t-t">{{ item.name }}</span>
        </div>
        <div class="item-detail">
          <van-row>
            <van-col span="15">
              <van-row>
                <van-col span="15">
                  <div class="i-text">
                    <div class="money-t">{{ $formatWan(item.min_quota) }} - {{ $formatWan(item.max_quota) }}</div>
                  </div>
                  <div class="sub-e">额度(元)</div>
                </van-col>
                <van-col span="9">
                  <div class="i-text">
                    <div class="month">{{ item.min_term }} ~ {{ item.max_term }} 月</div>
                  </div>
                  <div class="sub-e">24小时放款</div>
                </van-col>
              </van-row>
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
  name: 'IndexLoan',
  components: {
  },
  mixins: [appMixins],
  data() {
    return {
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
        // const rList = []
        // list.forEach((v) => {
        //   if (v.is_recommend) {
        //     rList.push(v)
        //   }
        // })
        // this.rList = rList
        this.list = list
      })
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
    margin-bottom: 8px;
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
    margin-bottom: 8px;
    &:last-child {
      border-bottom: none;
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
        margin-bottom: 10px;
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
