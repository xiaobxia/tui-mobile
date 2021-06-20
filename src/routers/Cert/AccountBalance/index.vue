<template>
  <div class="page-cert-list">
    <van-nav-bar title="科目余额表" left-arrow @click-left="backHandler" />
    <div class="s-w">
      <div class="fake-input one">
        <book-select :current-book="currentBook" @change="bookChange"/>
      </div>
      <div class="fake-input two" @click="openDateRangeSelect">
        <div class="ellipsis-text">{{ dateRangeShowName }}</div>
      </div>
      <div class="fake-input three" @click="openFilter">
        <div>
          <i class="iconfont icon-shaixuan" />
        </div>
      </div>
    </div>
    <div class="view-loading-wrap">
      <view-loading v-if="viewLoading"/>
      <div class="c-l-w">
        <div class="a-b">
          <div class="title">合计</div>
          <div class="dtl-s">
            <van-row>
              <van-col span="16">
                <span>借期初余额</span>
              </van-col>
              <van-col span="8">
                <span class="m-t">¥ {{ $formatMoney(sumInfo.initialDebit) }}</span>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="16">
                <span>贷期初余额</span>
              </van-col>
              <van-col span="8">
                <span class="m-t">¥ {{ $formatMoney(sumInfo.initialLender) }}</span>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="16">
                <span>借期末余额</span>
              </van-col>
              <van-col span="8">
                <span class="m-t">¥ {{ $formatMoney(sumInfo.endDebit) }}</span>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="16">
                <span>贷期末余额</span>
              </van-col>
              <van-col span="8">
                <span class="m-t">¥ {{ $formatMoney(sumInfo.endDebit) }}</span>
              </van-col>
            </van-row>
          </div>
        </div>
        <div v-for="(item,index) in list" v-if="index>=2" :key="index" class="a-b">
          <div class="title">{{ item.encode+item.name }}</div>
          <div class="dtl-s">
            <van-row>
              <van-col span="16">
                <span>期初余额</span>
              </van-col>
              <van-col span="8">
                <span class="m-t">¥ {{ $formatMoney(item.initialBalance) }}</span>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="16">
                <span>本期借方</span>
              </van-col>
              <van-col span="8">
                <span class="m-t">¥ {{ $formatMoney(item.debit) }}</span>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="16">
                <span>本期贷方</span>
              </van-col>
              <van-col span="8">
                <span class="m-t">¥ {{ $formatMoney(item.lender) }}</span>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="16">
                <span>期末余额</span>
              </van-col>
              <van-col span="8">
                <span class="m-t">¥ {{ $formatMoney(item.endBalance) }}</span>
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
    </div>
    <van-popup v-model="show" :style="{ height: '100%', width: '85%' }" position="right">
      <div class="f-w">
        <div>
          <better-pick
            :form-data="searchForm"
            :columns="$SHI_FOU_SELECT"
            value-key="showAllSubLevel"
            title="展开所有次级"
          >
            <van-cell
              :value="$SHI_FOU_LIST[searchForm.showAllSubLevel].label"
              title="展开所有次级"
              is-link
              arrow-direction="down"
            />
          </better-pick>
          <better-pick
            :form-data="searchForm"
            :columns="$SHI_FOU_SELECT"
            value-key="showAssist"
            title="显示辅助核算项"
          >
            <van-cell
              :value="$SHI_FOU_LIST[searchForm.showAssist].label"
              title="显示辅助核算项"
              is-link
              arrow-direction="down"
            />
          </better-pick>
          <better-pick
            :form-data="searchForm"
            :columns="$SHI_FOU_SELECT"
            value-key="containNoAcco"
            title="包含未审核凭证"
          >
            <van-cell
              :value="$SHI_FOU_LIST[searchForm.containNoAcco].label"
              title="包含未审核凭证"
              is-link
              arrow-direction="down"
            />
          </better-pick>
          <better-pick
            :form-data="searchForm"
            :columns="$SHI_FOU_SELECT"
            value-key="showZero"
            title="余额为0不显示"
          >
            <van-cell
              :value="$SHI_FOU_LIST[searchForm.showZero].label"
              title="余额为0不显示"
              is-link
              arrow-direction="down"
            />
          </better-pick>
          <better-pick
            :form-data="searchForm"
            :columns="$SHI_FOU_SELECT"
            value-key="delCarryCert"
            title="剔除结转凭证"
          >
            <van-cell
              :value="$SHI_FOU_LIST[searchForm.delCarryCert].label"
              title="剔除结转凭证"
              is-link
              arrow-direction="down"
            />
          </better-pick>
        </div>
        <div class="b-b-w">
          <van-button
            type="default"
            size="small"
            class="b-b-i"
            @click="setOldSearchFrom"
          >重置</van-button>
          <van-button
            :loading="filterLoading"
            type="primary"
            size="small"
            class="b-b-i"
            @click="filterOK"
          >确定</van-button>
        </div>
      </div>
    </van-popup>
    <year-month-range-select
      ref="yearMonthRangeSelect"
      :same-year="true"
      format="YYYY-MM-DD"
      @ok="dateRangeSelectOk"
    />
  </div>
</template>

<script>
import moment from 'moment'
import YearMonthRangeSelect from '@/components/YearMonthRangeSelect'
import ViewLoading from '@/components/ViewLoading'
import BookSelect from '@/components/BookSelect'
import BetterPick from '@/components/BetterPick'
import { Toast } from 'vant'
import { mapGetters } from 'vuex'

function createSearchForm(tar) {
  let raw = {
    accountType: 0, // 0:全部、1：财务会计、2：预算会计、3：未启用新政府制度,即没有分类
    containNoAcco: 0, // 包含未审核凭证【默认0：不开启/1：开启】
    delCarryCert: 0, // 剔除结转凭证【默认0：不开启/1：开启】
    foreignKey: '人民币', // 币别
    isStand: '0', // 是否本位币
    endSubEncode: '', // 结束科目编码
    showAllSubLevel: 0, // 展开所有科目级次【默认0：不开启/1：开启】
    showAssist: 0, // 显示辅助核算项【默认0：不开启/1：开启】
    showHapZero: 0, // 无发生额且余额为0不显示,以期末余额为准【默认0：不开启、勾上1：开启】
    showZero: 0, // 余额为0不显示,以期末余额为准【默认0：不开启、勾上1：开启】
    startSubEncode: '', // 起始科目编码
    startDate: '',
    endDate: ''
  }
  if (tar) {
    raw = Object.assign(raw, tar)
  }
  return raw
}

export default {
  name: 'AccountBalance',
  components: {
    YearMonthRangeSelect,
    BookSelect,
    ViewLoading,
    BetterPick
  },
  mixins: [],
  data() {
    return {
      currentBook: {},
      searchForm: createSearchForm(),
      oldSearchFrom: {},
      list: [],
      isFirstTimes: true,
      show: false,
      sumInfo: {
        initialDebit: '',
        initialLender: '',
        endDebit: '',
        endLender: ''
      },
      filterLoading: false,
      viewLoading: false,
      minDate: ''
    }
  },
  computed: {
    dateRangeShowName() {
      return `${moment(this.searchForm.startDate).format(
        'YYYY年M月'
      )}-${moment(this.searchForm.endDate).format('YYYY年M月')}`
    },
    ...mapGetters([
      'userBookList'
    ])
  },
  created() {
    if (this.userBookList.length === 0) {
      Toast.fail('用户无关联账本！')
      this.$router.replace('/index/home')
      return false
    }
    this.currentBook = this.userBookList[0]
    this.searchForm.startDate = moment(this.currentBook.nowPeriod).startOf('month').format('YYYY-MM-DD')
    this.searchForm.endDate = moment(this.currentBook.nowPeriod).endOf('month').format('YYYY-MM-DD')
    // 设置最小日期  起账日期
    const enableDate = this.currentBook.enableDate
    this.minDate = new Date(enableDate.split('-')[0], enableDate.split('-')[1] - 1, enableDate.split('-')[2])
    this.queryList()
  },
  // 进页面需要刷新数据
  activated() {
    // created那次不会请求
    if (!this.isFirstTimes) {
      this.queryList()
    }
    this.isFirstTimes = false
  },
  methods: {
    // 切换账本
    bookChange(book) {
      this.currentBook = book
      this.searchForm.startDate = moment(this.currentBook.nowPeriod).startOf('month').format('YYYY-MM-DD')
      this.searchForm.endDate = moment(this.currentBook.nowPeriod).endOf('month').format('YYYY-MM-DD')
      this.queryList()
    },
    // 打开搜索
    openFilter() {
      this.oldSearchFrom = this.$deepClone(this.searchForm)
      this.show = true
      this.filterLoading = false
    },
    // 搜索条件重置
    setOldSearchFrom() {
      this.searchForm.containNoAcco = 0
      this.searchForm.delCarryCert = 0
      // this.searchForm = this.$deepClone(this.oldSearchFrom)
    },
    // 搜索确定
    filterOK() {
      this.filterLoading = true
      this.show = false
      this.queryList()
        .then(() => {
          this.filterLoading = false
        })
        .catch((err) => {
          console.log(err)
          this.filterLoading = false
        })
    },
    // 打开年月选择
    openDateRangeSelect() {
      this.$refs.yearMonthRangeSelect.open([
        new Date(moment(this.searchForm.startDate).format('YYYY/MM/DD')),
        new Date(moment(this.searchForm.endDate).format('YYYY/MM/DD'))
      ])
    },
    dateRangeSelectOk(date) {
      console.log(date, 'datedatedatedatedate')
      this.searchForm.startDate = moment(date[0]).startOf('month').format('YYYY-MM-DD')
      this.searchForm.endDate = moment(date[1]).endOf('month').format('YYYY-MM-DD')
      this.queryList()
    },
    backHandler() {
      this.$router.history.go(-1)
    },
    // 科目余额表查询
    queryList() {
      this.viewLoading = true
      return this.$http
        .postFormData('villageapp/subject/getSubBalanceForm', {
          ...this.searchForm,
          bookId: this.currentBook.phid,
          phCurorgid: this.$commonQueryParam.phCurorgid
        })
        .then((res) => {
          this.viewLoading = false
          this.list = res.data || []
          if (this.list.length >= 1) {
            this.sumInfo.initialDebit = this.list[0].initialBalance
            this.sumInfo.initialLender = this.list[1].initialBalance
            this.sumInfo.endDebit = this.list[0].endBalance
            this.sumInfo.endLender = this.list[1].endBalance
          }
        }).catch((err) => {
          console.log(err)
          this.viewLoading = false
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/style/_var.scss";
@import "~@/style/theme/theme-color.scss";
//   .tab{
//       display: flex;
//   }
.page-cert-list {
  background-color: $grey-body-color;
}
.s-w {
  background-color: #fff;
  padding: 8px 16px;
  .fake-input {
    display: inline-block;
    vertical-align: top;
  }
  .one {
    width: 100px;
  }
  .two {
    margin-left: 6px;
    width: 180px;
  }
  .three {
    margin-left: 6px;
    padding: 0;
    width: 36px;
    text-align: center;
  }
}
.c-l-w {
  position: relative;
  margin-top: 12px;
  height: calc(100vh - 110px);
  overflow-x: hidden;
  overflow-y: auto;
  background-color: $grey-body-color;
  padding: 0;
   .tag-icon {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 22px;
    height: 22px;
    border-radius: 100%;
    line-height: 22px;
    text-align: center;
    font-size: 12px;
    color: #fff;
    &.blue {
      background-color: #3296fa;
    }
    &.red {
      background-color: #ef3f3f;
    }
  }
  .m-t {
    margin-left: 32px;
    color: #484848;
  }
  /deep/ {
    .van-cell__title {
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .van-cell__title {
      -webkit-box-flex: 3;
      -webkit-flex: 3;
      flex: 3;
    }
    .van-cell__value {
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      flex: 1;
    }
    .van-cell__label {
      font-size: 11px;
    }
  }
}
  .a-b {
    background-color: #fff;
    padding: 12px 16px;
    margin-bottom: 12px;
    .title {
      font-size: 16px;
      color: #484848;
      margin-bottom: 12px;
    }
    .dtl-s {
      font-size: 14px;
      color: $light-text-color;
      /deep/ {
        .van-row {
          margin-bottom: 12px;
          &:last-child{
            margin-bottom: 0;
          }
        }
        .van-col--8 {
          color: #484848;
          text-align: right;
        }
      }
    }
  }
</style>
