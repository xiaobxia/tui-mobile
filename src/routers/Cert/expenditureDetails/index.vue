<template>
  <div class="page-cert-list">
    <van-nav-bar title="货币资金收支明细表" left-arrow @click-left="backHandler" />
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
        <div class="b-b">
          <div class="no-border">
            <p>上期结存货币资金合计</p>
            <p>¥ {{ $formatMoney(detailData.beginPeriodTotal) }}</p>
          </div>
          <div class="b-b-s">
            <p style="text-indent: 2em">其中：现金</p>
            <p>¥ {{ $formatMoney(detailData.beginPeriodCash) }}</p>
          </div>
          <div class="b-b-s">
            <p style="text-indent: 4em">银行存款</p>
            <p>¥ {{ $formatMoney(detailData.beginPeriodBankDeposit) }}</p>
          </div>
        </div>
        <van-cell
          :value="`¥ ${ $formatMoney(detailData.incomeTotalPeriod) }`"
          title="本期收入合计"
          is-link
          @click="toIncomeDetail"
        />
        <van-cell
          :value="`¥ ${ $formatMoney(detailData.spendingTotalPeriod) }`"
          title="本期支出合计"
          is-link
          @click="toExpendDetail"
        />
        <div class="b-b">
          <!--<div @click="toIncomeDetail">-->
          <!--<p>本期收入合计</p>-->
          <!--<p>¥ {{ $formatMoney(detailData.incomeTotalPeriod) }}</p>-->
          <!--</div>-->
          <!--<div @click="toExpendDetail">-->
          <!--<p>本期支出合计</p>-->
          <!--<p>¥ {{ $formatMoney(detailData.spendingTotalPeriod) }}</p>-->
          <!--</div>-->
          <div class="no-border">
            <p>本期结存货币资金合计</p>
            <p>¥ {{ $formatMoney(detailData.endPeriodTotal) }}</p>
          </div>
          <div class="b-b-s">
            <p style="text-indent: 2em">其中：现金</p>
            <p>¥ {{ $formatMoney(detailData.endPeriodCash) }}</p>
          </div>
          <div class="b-b-s">
            <p style="text-indent: 4em">银行存款</p>
            <p>¥ {{ $formatMoney(detailData.endPeriodBankDeposit) }}</p>
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
            value-key="isDelUnAudit"
            title="剔除未审核凭证"
          >
            <van-cell
              :value="$SHI_FOU_LIST[searchForm.isDelUnAudit].label"
              title="剔除未审核凭证"
              is-link
              arrow-direction="down"
            />
          </better-pick>
          <better-pick
            :form-data="searchForm"
            :columns="$SHI_FOU_SELECT"
            value-key="isDelClose"
            title="剔除结转凭证"
          >
            <van-cell
              :value="$SHI_FOU_LIST[searchForm.isDelClose].label"
              title="剔除结转凭证"
              is-link
              arrow-direction="down"
            />
          </better-pick>
          <better-pick
            :form-data="searchForm"
            :columns="$SHI_FOU_SELECT"
            value-key="isUsedSub"
            title="剔除未启用科目"
          >
            <van-cell
              :value="$SHI_FOU_LIST[searchForm.isUsedSub].label"
              title="剔除未启用科目"
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
    <income-details ref="incomeDetails"/>
    <expend-details ref="expendDetails"/>
  </div>
</template>

<script>
import moment from 'moment'
import YearMonthRangeSelect from '@/components/YearMonthRangeSelect'
import BookSelect from '@/components/BookSelect'
import ViewLoading from '@/components/ViewLoading'
import BetterPick from '@/components/BetterPick'
import IncomeDetails from './incomeDetail'
import ExpendDetails from './expendDetail'
import { mapGetters } from 'vuex'
import { Toast } from 'vant'

function createSearchForm(tar) {
  let raw = {
    certStartYearMonth: '',
    certEndYearMonth: '',
    isDelClose: 0,
    isDelUnAudit: 0,
    isUsedSub: 0
  }
  if (tar) {
    raw = Object.assign(raw, tar)
  }
  return raw
}

export default {
  name: 'ExpenditureDetails',
  components: {
    YearMonthRangeSelect,
    BookSelect,
    ViewLoading,
    IncomeDetails,
    ExpendDetails,
    BetterPick
  },
  data() {
    return {
      searchForm: createSearchForm(),
      oldSearchFrom: {},
      currentBook: {},
      detailData: {},
      isFirstTimes: true,
      incomeBVOList: [],
      spendingBVOList: [],
      show: false,
      filterLoading: false,
      viewLoading: false
    }
  },
  computed: {
    dateRangeShowName() {
      return `${moment(this.searchForm.certStartYearMonth).format(
        'YYYY年M月'
      )}-${moment(this.searchForm.certEndYearMonth).format('YYYY年M月')}`
    },
    ...mapGetters([
      'userBookList'
    ])
  },
  created() {
    // console.log(this.bookInfo, 'bookInfobookInfobookInfobookInfo')
    if (this.userBookList.length === 0) {
      Toast.fail('用户无关联账本！')
      this.$router.replace('/index/home')
      return false
    }
    // 设置账本和当前时间
    this.currentBook = this.userBookList[0]
    this.searchForm.certStartYearMonth = moment(this.currentBook.nowPeriod).startOf('month').format('YYYY-MM')
    this.searchForm.certEndYearMonth = moment(this.currentBook.nowPeriod).endOf('month').format('YYYY-MM')
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
      console.log(this.currentBook, 'this.currentBook')
      this.searchForm.certStartYearMonth = moment(this.currentBook.nowPeriod).startOf('month').format('YYYY-MM')
      this.searchForm.certEndYearMonth = moment(this.currentBook.nowPeriod).endOf('month').format('YYYY-MM')
      this.queryList()
    },
    toIncomeDetail() {
      if (this.incomeBVOList.length === 0) {
        Toast.fail('无收入明细！')
        return false
      }
      this.$refs.incomeDetails.open(this.incomeBVOList, this.detailData)
    },
    toExpendDetail() {
      if (this.spendingBVOList.length === 0) {
        Toast.fail('无支出明细！')
        return false
      }
      this.$refs.expendDetails.open(this.spendingBVOList, this.detailData)
    },
    toPath(path) {
      this.$router.push(path)
    },
    openFilter() {
      this.oldSearchFrom = this.$deepClone(this.searchForm)
      this.show = true
      this.filterLoading = false
    },
    // 搜索条件重置
    setOldSearchFrom() {
      this.searchForm.isDelUnAudit = 0
      this.searchForm.isDelClose = 0
      this.searchForm.isUsedSub = 0
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
    // 期间选择
    openDateRangeSelect() {
      this.$refs.yearMonthRangeSelect.open([
        new Date(moment(this.searchForm.startDate).format('YYYY/MM/DD')),
        new Date(moment(this.searchForm.endDate).format('YYYY/MM/DD'))
      ])
    },
    // 期间选择完成
    dateRangeSelectOk(date) {
      this.searchForm.certStartYearMonth = date[0]
      this.searchForm.certEndYearMonth = date[1]
      this.queryList()
    },
    backHandler() {
      this.$router.history.go(-1)
    },
    // 货币资金收支明细表查询
    queryList() {
      this.viewLoading = true
      return this.$http
        .postFormData('villageapp/financialReport/villageMnyFundsDetailData', {
          ...this.searchForm,
          bookId: this.currentBook.phid,
          certStartYearMonth: moment(this.searchForm.certStartYearMonth).format('YYYY-MM'),
          certEndYearMonth: moment(this.searchForm.certEndYearMonth).format('YYYY-MM')
        })
        .then((res) => {
          this.viewLoading = false
          this.incomeBVOList = res.data.incomeBVOList || []
          this.spendingBVOList = res.data.spendingBVOList || []
          this.detailData = res.data || {}
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

.page-cert-list {
  background-color: $grey-body-color;
}
.s-w {
  background-color: #fff;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 1);
  .fake-input {
    display: inline-block;
    vertical-align: top;
  }
  .one {
    width: 100px;
  }
  .two {
    margin-left: 8px;
    width: 180px;
  }
  .three {
    margin-left: 8px;
    padding: 0;
    width: 36px;
    text-align: center;
  }
}
.c-l-w {
  margin-top: 12px;
  height: calc(100vh - 110px);
  overflow-x: hidden;
  overflow-y: auto;
  background-color: $grey-body-color;
  padding: 0;
  .top {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .topFirst {
      display: flex;
      justify-content: space-between;
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(72, 72, 72, 1);
    }
    .topSecond {
      display: flex;
      justify-content: space-around;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(72, 72, 72, 1);
      margin-right: -60px;
    }
    .topThird {
      display: flex;
      justify-content: space-around;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(72, 72, 72, 1);
      margin-right: -60px;
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
      -webkit-box-flex: 2;
      -webkit-flex: 2;
      flex: 2;
    }
    .van-cell__value {
      -webkit-box-flex: 2;
      -webkit-flex: 2;
      flex: 2;
    }
    .van-cell__label {
      font-size: 11px;
    }
  }
}
  .b-b {
    padding: 0 16px;
    background-color: #fff;
    font-size: 15px;
    color: #484848;
    margin-bottom: 12px;
    div {
      height: 42px;
      line-height: 42px;
      border-bottom: 1px solid #E9E9E9;
      p {
        margin: 0;
        display: inline-block;
        width: 48%;
        text-align: right;
        &:first-child {
          text-align: left;
        }
      }
      &:last-child {
        margin-bottom: 0;
      }
      &.b-b-s {
        font-size: 14px;
        color: $light-text-color;
        border-bottom: none;
      }
    }
    .no-border {
      border: none;
    }
  }
</style>
