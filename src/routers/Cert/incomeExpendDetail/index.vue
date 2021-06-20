<template>
  <div class="page-cert-list">
    <van-nav-bar title="收支明细表" left-arrow @click-left="backHandler" />
    <div class="s-w">
      <div class="fake-input one">
        <book-select :current-book="currentBook" @change="bookChange" />
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
        <van-cell
          :value="`¥ ${ $formatMoney(detailData.incomeCountAmount) }`"
          title="本期收入合计"
          is-link
          @click="toIncomeDetail"
        />
        <van-cell
          :value="`¥ ${ $formatMoney(detailData.loanCountAmount) }`"
          title="本期支出合计"
          is-link
          @click="toExpendDetail()"
        />
        <van-cell
          :value="`¥ ${ $formatMoney(sumDetail.loanCountAmount) }`"
          class="sum-cell"
          is-link
          title="收支结余"
        />
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
            value-key="isDelBqfsZero"
            title="剔除本期发生额为0"
          >
            <van-cell
              :value="$SHI_FOU_LIST[searchForm.isDelBqfsZero].label"
              title="剔除本期发生额为0"
              is-link
              arrow-direction="down"
              class="vancell"
              style="min-width: 70%;"
            />
          </better-pick>
          <better-pick
            :form-data="searchForm"
            :columns="$SHI_FOU_SELECT"
            value-key="isDelBqfsCountZero"
            title="剔除本期累计发生额为0"
          >
            <van-cell
              :value="$SHI_FOU_LIST[searchForm.isDelBqfsCountZero].label"
              title="剔除本期累计发生额为0"
              is-link
              arrow-direction="down"
              class="vancell"
              style="min-width: 70%;"
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
import IncomeDetails from '@/components/IncomeDetails/index'
import ExpendDetails from '@/components/ExpendDetails/index'
import BetterPick from '@/components/BetterPick'
import { Toast } from 'vant'
import { mapGetters } from 'vuex'

function createSearchForm(tar) {
  let raw = {
    monthEnd: '',
    monthStart: '',
    isDelUnAudit: 0,
    isDelClose: 1,
    isDelBqfsIsZero: 0,
    isDelQmyeIsZero: 0,
    isDelBqfsZero: 0,
    isDelBqfsCountZero: 0,
    subCode: ''
  }
  if (tar) {
    raw = Object.assign(raw, tar)
  }
  return raw
}

export default {
  name: 'IncomeExpendDetail',
  components: {
    YearMonthRangeSelect,
    BookSelect,
    IncomeDetails,
    ExpendDetails,
    ViewLoading,
    BetterPick
  },
  data() {
    return {
      searchForm: createSearchForm(),
      oldSearchFrom: {},
      currentBook: {},
      isFirstTimes: true,
      detailData: {},
      sumDetail: {},
      incomeBVOList: [],
      spendingBVOList: [],
      show: false,
      filterLoading: false,
      viewLoading: false,
      listData: []
    }
  },
  computed: {
    dateRangeShowName() {
      return `${moment(this.searchForm.monthStart).format(
        'YYYY年M月'
      )}-${moment(this.searchForm.monthEnd).format('YYYY年M月')}`
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
    this.searchForm.monthStart = moment(this.currentBook.nowPeriod).startOf('month').format('YYYY-MM-DD')
    this.searchForm.monthEnd = moment(this.currentBook.nowPeriod).endOf('month').format('YYYY-MM-DD')
    console.log(this.searchForm.monthStart, this.searchForm.monthStart, 'this.searchForm.monthStart1')
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
    bookChange(book) {
      this.currentBook = book
      this.searchForm.monthStart = moment(this.currentBook.nowPeriod).startOf('month').format('YYYY-MM-DD')
      this.searchForm.monthEnd = moment(this.currentBook.nowPeriod).endOf('month').format('YYYY-MM-DD')
      console.log(this.searchForm.monthStart, this.searchForm.monthStart, 'this.searchForm.monthStart2')
      this.queryList()
    },
    toIncomeDetail() {
      // if (this.incomeBVOList.length === 0) {
      //   Toast.fail('无收入明细！')
      //   return false
      // }
      this.$refs.incomeDetails.open(this.listData)
    },
    toExpendDetail() {
      // if (this.spendingBVOList.length === 0) {
      //   Toast.fail('无支出明细！')
      //   return false
      // }
      this.$refs.expendDetails.open(this.listData)
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
    openDateRangeSelect() {
      this.$refs.yearMonthRangeSelect.open([
        new Date(moment(this.searchForm.monthStart).format('YYYY/MM/DD')),
        new Date(moment(this.searchForm.monthEnd).format('YYYY/MM/DD'))
      ])
    },
    dateRangeSelectOk(date) {
      this.searchForm.monthStart = date[0]
      this.searchForm.monthEnd = date[1]
      this.queryList()
    },
    backHandler() {
      this.$router.history.go(-1)
    },
    // 收支明细表查询
    queryList() {
      this.viewLoading = true
      return this.$http
        .postFormData('villageapp/financialReport/financialDetailData', {
          ...this.searchForm,
          bookId: this.currentBook.phid,
          monthStart: moment(this.searchForm.monthStart).format('M'),
          monthEnd: moment(this.searchForm.monthEnd).format('M'),
          year: moment(this.searchForm.monthStart).format('YYYY'),
          date: moment().format('YYYY-MM-DD')
        })
        .then((res) => {
          this.viewLoading = false
          const listData = res.data || []
          // 获取数组中最后一条数据
          this.sumDetail = listData[listData.length - 1] || {}
          // 获取数组中第一条数据
          this.detailData = listData[0] || {}
          this.listData = listData
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
.vancell {
  .van-cell__title {
    min-width: 70%;
  }
}

</style>
