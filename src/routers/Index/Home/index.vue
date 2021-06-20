<template>
  <div class="view-home">
    <van-nav-bar
      title="村级事务"
    />
    <div class="b-b-t">
      <div class="o-b" @click="openOrgSelect">
        <div class="s-t">
          <i class="iconfont icon-zuzhijiagou"/>
          <span>选择组织</span>
        </div>
        <div class="o-t">
          <span class="ellipsis-text">{{ orgInfo.name }}</span>
          <van-icon name="arrow-down" />
        </div>
      </div>
      <!-- <div class="s-b">
        <van-search v-model="value" placeholder="搜索事务" />
      </div> -->
    </div>
    <div class="b-b-w">
      <van-row>
        <van-col v-if="pz" span="6">
          <div class="link-w" @click="toCertPath('/certList')">
            <div class="img-w">
              <img src="../../../assets/home/1.png" alt="">
            </div>
            <div class="l-t">凭证查看</div>
          </div>
        </van-col>
        <van-col v-if="kmye" span="6">
          <div class="link-w" @click="toCertPath('/accountBalance')">
            <div class="img-w">
              <img src="../../../assets/home/2.png" alt="">
            </div>
            <div class="l-t">科目余额表</div>
          </div>
        </van-col>
        <van-col v-if="hbzj" span="6">
          <div class="link-w" @click="toCertPath('/expenditureDetails')">
            <div class="img-w">
              <img src="../../../assets/home/3.png" alt="">
            </div>
            <div class="l-t">货币资金表</div>
          </div>
        </van-col>
        <van-col v-if="srqk" span="6">
          <div class="link-w" @click="toCertPath('/incomeExpendInfo')">
            <div class="img-w">
              <img src="../../../assets/home/4.png" alt="">
            </div>
            <div class="l-t">收入情况表</div>
          </div>
        </van-col>
        <van-col v-if="zcqk" span="6">
          <div class="link-w" @click="toCertPath('/incomeExpendInfo?type=1')">
            <div class="img-w">
              <img src="../../../assets/home/5.png" alt="">
            </div>
            <div class="l-t">支出情况表</div>
          </div>
        </van-col>
        <van-col v-if="szmx" span="6">
          <div class="link-w" @click="toCertPath('/incomeExpendDetail')">
            <div class="img-w">
              <img src="../../../assets/home/6.png" alt="">
            </div>
            <div class="l-t">收支明细表</div>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="b-b-w-l">
      <div class="l-title">
        <span>村务公开</span>
        <span style="float: right;color: #3296FA" @click="toMore">更多</span>
      </div>
      <!-- <div class="b-b-w">
        <van-row>
          <van-col span="6">
            <div class="link-w" @click="goUrl('https://app.xm.abchina.com/xmfd/')">
              <div class="img-w">
                <img src="../../../assets/home/6.png" alt="">
              </div>
              <div class="l-t">金穗助农</div>
            </div>
          </van-col>
        </van-row>
      </div> -->
      <van-empty description="内容更新中" />
    </div>
    <org-select ref="orgSelect"/>
  </div>
</template>

<script>
import OrgSelect from '@/components/OrgSelect'
import { mapGetters } from 'vuex'
import { Toast } from 'vant'
import storageUtil from '@/util/storageUtil.js'
export default {
  name: 'IndexHome',
  components: {
    OrgSelect
  },
  data() {
    return {
      value: '',
      pz: storageUtil.getData('pageConfig', 'pz') || false,
      kmye: storageUtil.getData('pageConfig', 'kmye') || false,
      hbzj: storageUtil.getData('pageConfig', 'hbzj') || false,
      srqk: storageUtil.getData('pageConfig', 'srqk') || false,
      zcqk: storageUtil.getData('pageConfig', 'zcqk') || false,
      szmx: storageUtil.getData('pageConfig', 'szmx') || false
    }
  },
  computed: {
    ...mapGetters([
      'userBookList',
      'orgInfo'
    ])
  },
  created() {
    console.log('home-render')
    // 查询账本
    this.$store.dispatch('getUserBooksCache', this.$commonQueryParam.orgId)
  },
  methods: {
    // 调用封装选择组织与社区弹窗的方法
    openOrgSelect() {
      this.$refs.orgSelect.open()
    },
    // 去凭证路由，需要检查是否有账本
    toCertPath(path) {
      if (this.userBookList.length === 0) {
        Toast.fail('用户无关联账本！')
        return false
      }
      this.$router.push(path)
    },
    toPath(path) {
      this.$router.push(path)
    },
    goUrl(url) {
      window.location.href = url
    },
    toMore() {
      Toast.fail('内容更新中！')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/style/_var.scss";
  @import "~@/style/mixin.scss";
  @import "~@/style/theme/theme-color.scss";
  .view-home {
    // height: 100vh;
    background-color: $grey-body-color;
  }
  .b-b-t {
    padding: 8px 16px;
    background-color: #fff;
    /deep/ {
      .van-search {
        padding: 0;
      }
    }
    .o-b {
      vertical-align: top;
      display: inline-block;
      width: 80px;
      .s-t {
        margin-bottom: 2px;
        i {
          font-size: 10px;
        }
        font-size: 10px;
        color: $original-theme;
      }
      .o-t {
        font-size: 14px;
        span {
          display: inline-block;
          width: 60px;
        }
        /deep/ {
          i {
            margin-left: 4px;
            font-size: 12px;
          }
        }
      }
    }
    .s-b {
      vertical-align: top;
      display: inline-block;
      width: 250px;
    }
  }
  .b-b-w {
    margin-top: 10px;
    padding: 16px 0 0 0;
    background-color: #fff;
  }
  .b-b-w-l {
    margin-top: 10px;
    padding: 0 0 0 16px;
    background-color: #fff;
    .l-title {
      line-height: 40px;
      font-size: 15px;
      padding-right: 16px;
      border-bottom: 1px solid #eeeeee;
    }
  }
  .link-w {
    text-align: center;
    margin-bottom: 16px;
    .img-w {
      display: inline-block;
      width: 40px;
      height: 40px;
      margin-bottom: 8px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .l-t {
      font-size: 14px;
    }
  }
</style>
