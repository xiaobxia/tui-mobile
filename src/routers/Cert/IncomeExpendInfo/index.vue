<template>
  <div class="page-cert-list">
    <van-nav-bar :title="`村级财务${isIncomeQuery ? '支出':'收入'}情况表`" left-arrow @click-left="backHandler" />
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
        <van-row class="common-info-block" type="flex" justify="space-between">
          <div class="ellipsis-text">本期总{{ isIncomeQuery ? '支出':'收入' }}</div>
          <div class="ellipsis-text">{{ $formatMoney(list1.currentAmount) }}</div>
        </van-row>
        <div class="common-block">
          <table width="100%" cellspacing="0" cellpadding="0" border="2" class="app-table">
            <thead>
              <tr>
                <th>项目</th>
                <th>本期发生额</th>
                <th>累计发生额</th>
              </tr>
            </thead>
            <tr v-for="(item, i) in list" :key="i">
              <td style="text-align: center">{{ item.subName }}</td>
              <td style="text-align: center">{{ $formatMoney(item.currentAmount) }}</td>
              <td style="text-align: center">{{ $formatMoney(item.countAmount) }}</td>
            </tr>
          </table>
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
import BookSelect from '@/components/BookSelect'
import BetterPick from '@/components/BetterPick'
import ViewLoading from '@/components/ViewLoading'
import { Toast } from 'vant'
import { mapGetters } from 'vuex'

function createSearchForm(tar) {
  let raw = {
    //  当前日期
    'date': '',
    // 剔除结转凭证，0:未选 1:选中
    'isDelClose': 1,
    // 剔除未审核凭证 0:未选 1:选中
    'isDelUnAudit': 0,
    // 收入/支出数据查询 0:收入 1:支出
    'isIncomeQuery': 0,
    // 剔除未启用科目, 0:未选 1:选中
    'isUsedSub': 0,
    // 凭证结束月份
    'monthEnd': '',
    // 凭证开始月份
    'monthStart': '',
    // 工作单位 这个暂时不用管
    'orgName': '',
    // 科目代码/名称
    'subCode': '',
    // 当前用户
    'userName': '',
    // 年份
    'year': ''
  }
  if (tar) {
    raw = Object.assign(raw, tar)
  }
  return raw
}

export default {
  name: 'IncomeExpendInfo',
  components: {
    YearMonthRangeSelect,
    BookSelect,
    ViewLoading,
    BetterPick
  },
  data() {
    return {
      searchForm: createSearchForm(),
      oldSearchFrom: {},
      list: [],
      list1: [],
      isFirstTimes: true,
      currentBook: {},
      show: false,
      filterLoading: false,
      viewLoading: false,
      isIncomeQuery: 0
    }
  },
  computed: {
    dateRangeShowName() {
      return `${moment(this.searchForm.monthStart).format(
        'YYYY年M月'
      )}-${moment(this.searchForm.monthEnd).format('YYYY年M月')}`
    },
    ...mapGetters([
      'userBookList',
      'userInfo',
      'orgInfo'
    ])
  },
  created() {
    if (this.userBookList.length === 0) {
      Toast.fail('用户无关联账本！')
      this.$router.replace('/index/home')
      return false
    }
    this.currentBook = this.userBookList[0]
    this.searchForm.monthStart = moment(this.currentBook.nowPeriod).format('YYYY-MM-DD')
    this.searchForm.monthEnd = moment(this.currentBook.nowPeriod).format('YYYY-MM-DD')
    if (this.$route.query.type === '1') {
      this.isIncomeQuery = 1
    }
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
      this.searchForm.monthStart = moment(this.currentBook.nowPeriod).format('YYYY-MM-DD')
      this.searchForm.monthEnd = moment(this.currentBook.nowPeriod).format('YYYY-MM-DD')
      this.queryList()
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
    // 查询村级收入支出情况表
    queryList() {
      this.viewLoading = true
      return this.$http
        .postFormData('villageapp/financialReport/financialReport', {
          ...this.searchForm,
          bookId: this.currentBook.phid,
          monthStart: moment(this.searchForm.monthStart).format('M'),
          monthEnd: moment(this.searchForm.monthEnd).format('M'),
          year: moment(this.searchForm.monthStart).format('YYYY'),
          orgName: this.orgInfo.name,
          userName: this.userInfo.userName,
          date: moment().format('YYYY-MM-DD'),
          isIncomeQuery: this.isIncomeQuery
        })
        .then((res) => {
          this.viewLoading = false
          const data = res.data || {}
          this.list = data.records || []
          this.list1 = this.list[0]
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
.common-info-block {
  margin: 0 0 12px 0;
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
  padding: 0;
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
</style>
