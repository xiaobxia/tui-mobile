<template>
  <div class="page-cert-list">
    <van-nav-bar title="凭证查看" left-arrow @click-left="backHandler" />
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
    <div ref="scrollView" class="c-l-w">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        class="a-l-l"
        @load="onLoad"
      >
        <van-cell
          v-for="item in list"
          :key="item.phid"
          :title="item.digest"
          is-link
          @click="toDetail(item)"
        >
          <div slot="label">
            <van-row>
              <van-col span="4">
                <span>{{ item.certTypeName }}-{{ item.certNo }}</span>
              </van-col>
              <van-col span="8">
                <span class="m-t">¥ {{ $formatMoney(item.money) }}</span>
              </van-col>
            </van-row>
          </div>
        </van-cell>
      </van-list>
    </div>
    <van-popup v-model="show" :style="{ height: '100%', width: '85%' }" position="right">
      <div class="f-w">
        <div class="s-b">
          <van-search v-model="searchForm.condition" placeholder="请输入凭证号/摘要" />
        </div>
        <div>
          <div class="f-t">状态</div>
          <van-row>
            <van-col span="8">
              <van-button
                :class="{'grey-btn': searchForm.verifyStatus !== ''}"
                type="primary"
                size="small"
                plain
                class="f-b-b"
                @click="statusChange({value: ''})"
              >全部</van-button>
            </van-col>
            <van-col v-for="(item, index) in $VERIFY_STATUS_LIST" :key="index" span="8">
              <van-button
                :class="{'grey-btn': searchForm.verifyStatus !== item.value}"
                type="primary"
                size="small"
                plain
                class="f-b-b"
                @click="statusChange(item)"
              >{{ item.label }}</van-button>
            </van-col>
          </van-row>
        </div>
        <div class="b-b-w">
          <van-button type="default" size="small" class="b-b-i" @click="setOldSearchFrom">重置</van-button>
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
    <date-range-select ref="dateRangeSelect" :min-date="minDate" @ok="dateRangeSelectOk" />
  </div>
</template>

<script>
import moment from 'moment'
import scrollCacheMixins from '@/mixins/scrollCache'
import DateRangeSelect from '@/components/DateRangeSelect'
import BookSelect from '@/components/BookSelect'
import { mapGetters } from 'vuex'
import { Toast } from 'vant'

function createSearchForm(tar) {
  let raw = {
    bookId: '',
    certType: '',
    condition: '',
    phCurorgid: '',
    size: 20,
    subIds: [],
    verifyStatus: '',
    begCertDate: '',
    endCertDate: ''
  }
  if (tar) {
    raw = Object.assign(raw, tar)
  }
  return raw
}

export default {
  name: 'CertList',
  components: {
    DateRangeSelect,
    BookSelect
  },
  mixins: [scrollCacheMixins],
  data() {
    return {
      current: 0,
      searchForm: createSearchForm(),
      oldSearchFrom: {},
      filterLoading: false,
      list: [],
      loading: false,
      finished: false,
      show: false,
      filterStatus: '',
      currentBook: {},
      minDate: ''
    }
  },
  computed: {
    dateRangeShowName() {
      return `${moment(this.searchForm.begCertDate).format(
        'YYYY年M月D日'
      )}-${moment(this.searchForm.endCertDate).format('YYYY年M月D日')}`
    },
    ...mapGetters(['userBookList'])
  },
  created() {
    console.log('CertList-render')
    if (this.userBookList.length === 0) {
      Toast.fail('用户无关联账本！')
      this.$router.replace('/index/home')
      return false
    }
    this.currentBook = this.userBookList[0]
    this.searchForm.begCertDate = moment(this.currentBook.nowPeriod).format('YYYY-MM-DD')
    this.searchForm.endCertDate = moment(this.currentBook.nowPeriod).format('YYYY-MM-DD')
    this.setBookSearchDate(this.currentBook)
  },
  methods: {
    // 账本切换
    bookChange(book) {
      this.currentBook = book
      this.setBookSearchDate(book)
      this.reQueryList()
    },
    // 打开搜索
    openFilter() {
      this.oldSearchFrom = this.$deepClone(this.searchForm)
      this.show = true
      this.filterLoading = false
    },
    // 搜索条件重置
    setOldSearchFrom() {
      // 目前逻辑，重置就是清空，而不是上次的条件
      this.searchForm.condition = ''
      this.searchForm.verifyStatus = ''
      // this.searchForm = this.$deepClone(this.oldSearchFrom)
    },
    // 搜索确定
    filterOK() {
      this.filterLoading = true
      this.show = false
      this.reQueryList()
        .then(() => {
          this.filterLoading = false
        })
        .catch((err) => {
          console.log(err)
          this.filterLoading = false
        })
    },
    // 打开时间选择
    openDateRangeSelect() {
      this.$refs.dateRangeSelect.open([
        new Date(moment(this.searchForm.begCertDate).format('YYYY/MM/DD')),
        new Date(moment(this.searchForm.endCertDate).format('YYYY/MM/DD'))
      ])
    },
    // 时间选择成功
    dateRangeSelectOk(date) {
      this.searchForm.begCertDate = date[0]
      this.searchForm.endCertDate = date[1]
      this.reQueryList()
    },
    // 设置账本的默认筛选日期
    setBookSearchDate(book) {
      this.searchForm.begCertDate = moment(book.nowPeriod)
        .startOf('month')
        .format('YYYY-MM-DD')
      this.searchForm.endCertDate = moment(book.nowPeriod)
        .endOf('month')
        .format('YYYY-MM-DD')
      // 设置最小日期  起账日期
      const enableDate = book.enableDate
      this.minDate = new Date(
        enableDate.split('-')[0],
        enableDate.split('-')[1] - 1,
        enableDate.split('-')[2]
      )
    },
    statusChange(item) {
      this.searchForm.verifyStatus = item.value
    },
    backHandler() {
      this.$router.history.go(-1)
    },
    reQueryList() {
      this.list = []
      this.finished = false
      return this.queryList(1)
    },
    // 凭证查看列表接口
    queryList(current) {
      this.loading = true
      this.current = current || this.current + 1
      return this.$http
        .postFormData('villageapp/cert/findCertByCondition', {
          ...this.searchForm,
          bookId: this.currentBook.phid,
          phCurorgid: this.$commonQueryParam.orgId,
          current: this.current
        })
        .then((res) => {
          const data = res.data || {}
          const total = data.total
          this.list = this.list.concat(data.records)
          this.loading = false
          if (this.list.length >= total) {
            this.finished = true
          }
        })
    },
    toDetail(item) {
      this.$router.push({
        path: `/certDetail`,
        query: {
          phid: item.phid
        }
      })
    },
    onLoad() {
      this.queryList()
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
