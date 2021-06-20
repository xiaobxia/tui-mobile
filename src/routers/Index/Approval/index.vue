<template>
  <div class="view-approval">
    <van-nav-bar title="审批中心" />
    <!-- 此处代办列表没有搜索选项 -->
    <div v-if="$route.path === '/index/approval/pre'" class="s-w">
      <div class="s-b">
        <van-search v-model="preSearchFormCondition" placeholder="请输入搜索条件" @search="preSearch"/>
      </div>
      <div class="fake-input three" @click="openPreFilter">
        <div>
          <i class="iconfont icon-shaixuan" />
        </div>
      </div>
    </div>
    <div v-if="$route.path === '/index/approval/has'" class="s-w">
      <div class="s-b">
        <van-search v-model="hasSearchFormCondition" placeholder="请输入搜索条件" @search="hasSearch"/>
      </div>
      <div class="fake-input three" @click="openHasFilter">
        <div>
          <i class="iconfont icon-shaixuan" />
        </div>
      </div>
    </div>
    <div v-if="$route.path === '/index/approval/mine'" class="s-w">
      <div class="s-b">
        <van-search v-model="mineSearchFormCondition" placeholder="请输入搜索条件" @search="mineSearch"/>
      </div>
      <div class="fake-input three" @click="openMineFilter">
        <div>
          <i class="iconfont icon-shaixuan" />
        </div>
      </div>
    </div>
    <van-tabs v-model="activeName" :animated="true" class="p-tab-p">
      <van-tab
        :badge="preTotal"
        title="待办任务"
        name="/index/approval/pre"
        to="/index/approval/pre"
        title-class="p-t"
        class="p-t"
      />
      <van-tab
        :badge="hasTotal"
        title="已办任务"
        name="/index/approval/has"
        to="/index/approval/has"
      />
      <van-tab
        :badge="mineTotal"
        title="我发起的"
        name="/index/approval/mine"
        to="/index/approval/mine"
      />
    </van-tabs>
    <keep-alive :include="keepaliveNames">
      <router-view :key="key"/>
    </keep-alive>
    <van-popup v-model="show" :style="{ height: '100%', width: '85%' }" position="right">
      <div class="f-w">
        <div v-if="$route.path === '/index/approval/pre'">
          <div class="f-t">组织</div>
          <van-row>
            <van-col span="8">
              <van-button
                :class="{'grey-btn': preSearchFormLocal.orgId !== ''}"
                type="primary"
                size="small"
                plain
                class="f-b-b"
                @click="statusChange(preSearchFormLocal, 'orgId', '')"
              >全部</van-button>
            </van-col>
            <van-col v-if="preSearchFormLocal.orgIdTemp" span="8">
              <van-button
                :class="{'grey-btn': preSearchFormLocal.orgId !== preSearchFormLocal.orgIdTemp}"
                type="primary"
                size="small"
                plain
                class="f-b-b"
                @click="statusChange(preSearchFormLocal, 'orgId', preSearchFormLocal.orgIdTemp)"
              >{{ preSearchFormLocal.orgName }}</van-button>
            </van-col>
            <van-col span="8">
              <van-button
                type="primary"
                size="small"
                plain
                class="f-b-b grey-btn"
                @click="openOrgSelect(preSearchFormLocal)"
              >选择组织</van-button>
            </van-col>
          </van-row>
        </div>
        <div v-if="$route.path === '/index/approval/has'">
          <div class="f-t">审批状态</div>
          <van-row>
            <van-col
              v-for="(item, index) in BILL_STATUS"
              :key="index"
              span="8"
            >
              <van-button
                :class="{'grey-btn': hasSearchFormLocal.formStatus !== item.value}"
                type="primary"
                size="small"
                plain
                class="f-b-b"
                @click="statusChange(hasSearchFormLocal, 'formStatus', item.value)"
              >{{ item.label }}</van-button>
            </van-col>
          </van-row>
          <div class="f-t">支付状态</div>
          <van-row>
            <van-col v-for="(item, index) in $PAY_STATUS" :key="index" span="8">
              <van-button
                :class="{'grey-btn': hasSearchFormLocal.payStatus !== item.value}"
                type="primary"
                size="small"
                plain
                class="f-b-b"
                @click="statusChange(hasSearchFormLocal, 'payStatus', item.value)"
              >{{ item.label }}</van-button>
            </van-col>
          </van-row>
          <div class="f-t">组织</div>
          <van-row>
            <van-col span="8">
              <van-button
                :class="{'grey-btn': hasSearchFormLocal.orgId !== ''}"
                type="primary"
                size="small"
                plain
                class="f-b-b"
                @click="statusChange(hasSearchFormLocal, 'orgId', '')"
              >全部</van-button>
            </van-col>
            <van-col v-if="hasSearchFormLocal.orgIdTemp" span="8">
              <van-button
                :class="{'grey-btn': hasSearchFormLocal.orgId !== hasSearchFormLocal.orgIdTemp}"
                type="primary"
                size="small"
                plain
                class="f-b-b"
                @click="statusChange(hasSearchFormLocal, 'orgId', hasSearchFormLocal.orgIdTemp)"
              >{{ hasSearchFormLocal.orgName }}</van-button>
            </van-col>
            <van-col span="8">
              <van-button
                type="primary"
                size="small"
                plain
                class="f-b-b grey-btn"
                @click="openOrgSelect(hasSearchFormLocal)"
              >选择组织</van-button>
            </van-col>
          </van-row>
        </div>
        <div v-if="$route.path === '/index/approval/mine'">
          <div class="f-t">单据状态</div>
          <van-row>
            <van-col
              v-for="(item, index) in BILL_STATUS1"
              :key="index"
              span="8"
            >
              <van-button
                :class="{'grey-btn': mineSearchFormLocal.formStatus !== item.value}"
                type="primary"
                size="small"
                plain
                class="f-b-b"
                @click="statusChange(mineSearchFormLocal, 'formStatus', item.value)"
              >{{ item.label }}</van-button>
            </van-col>
          </van-row>
          <div class="f-t">支付状态</div>
          <van-row>
            <van-col v-for="(item, index) in $PAY_STATUS" :key="index" span="8">
              <van-button
                :class="{'grey-btn': mineSearchFormLocal.payStatus !== item.value}"
                type="primary"
                size="small"
                plain
                class="f-b-b"
                @click="statusChange(mineSearchFormLocal, 'payStatus', item.value)"
              >{{ item.label }}</van-button>
            </van-col>
          </van-row>
          <div class="f-t">组织</div>
          <van-row>
            <van-col span="8">
              <van-button
                :class="{'grey-btn': mineSearchFormLocal.orgId !== ''}"
                type="primary"
                size="small"
                plain
                class="f-b-b"
                @click="statusChange(mineSearchFormLocal, 'orgId', '')"
              >全部</van-button>
            </van-col>
            <van-col v-if="mineSearchFormLocal.orgIdTemp" span="8">
              <van-button
                :class="{'grey-btn': mineSearchFormLocal.orgId !== mineSearchFormLocal.orgIdTemp}"
                type="primary"
                size="small"
                plain
                class="f-b-b"
                @click="statusChange(mineSearchFormLocal, 'orgId', mineSearchFormLocal.orgIdTemp)"
              >{{ mineSearchFormLocal.orgName }}</van-button>
            </van-col>
            <van-col span="8">
              <van-button
                type="primary"
                size="small"
                plain
                class="f-b-b grey-btn"
                @click="openOrgSelect(mineSearchFormLocal)"
              >选择组织</van-button>
            </van-col>
          </van-row>
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
    <org-select ref="orgSelect" type="value" @ok="orgSelectOk"/>
  </div>
</template>

<script>
import OrgSelect from '@/components/OrgSelect'
import { mapGetters } from 'vuex'

function createSearchForm(tar) {
  let raw = {
    payStatus: '',
    formStatus: '',
    orgId: '',
    orgCode: '',
    orgIdTemp: '',
    orgName: ''
  }
  if (tar) {
    raw = Object.assign(raw, tar)
  }
  return raw
}

export default {
  name: 'IndexApproval',
  components: {
    OrgSelect
  },
  data() {
    return {
      current: 0,
      list: [],
      loading: false,
      finished: false,
      show: false,
      filterLoading: false,
      // 分别是代办，已办，我的列表搜索条件
      preSearchFormCondition: '',
      hasSearchFormCondition: '',
      mineSearchFormCondition: '',
      preSearchFormLocal: createSearchForm(),
      hasSearchFormLocal: createSearchForm(),
      mineSearchFormLocal: createSearchForm(),
      editForm: {},
      activeName: '/index/approval/pre',
      BILL_STATUS: { // 我发起的
        0: { label: '未送审', value: 0 },
        1: { label: '未审批', value: 1 },
        2: { label: '审批中', value: 2 },
        3: { label: '审批通过', value: 3 },
        4: { label: '审批不通过', value: 4 },
        // 5: { label: '审批退回', value: 5 },
        6: { label: '审批退回(未送审)', value: 6 }
      },
      BILL_STATUS1: { // 我发起的
        // 0: { label: '未送审', value: 0 },
        // 1: { label: '未审批', value: 1 },
        2: { label: '审批中', value: 2 },
        3: { label: '审批通过', value: 3 },
        4: { label: '审批不通过', value: 4 },
        // 5: { label: '审批退回', value: 5 },
        6: { label: '审批退回(未送审)', value: 6 }
      }
    }
  },
  computed: {
    key() {
      return this.$route.fullPath
    },
    ...mapGetters([
      'keepaliveNames',
      'preTotal',
      'hasTotal',
      'mineTotal',
      'hasSearchForm',
      'mineSearchForm',
      'preSearchForm'
    ])
  },
  created() {
    console.log('approval-render')
    this.preSearchFormLocal = {
      ...createSearchForm(),
      ...this.preSearchForm
    }
    this.hasSearchFormLocal = {
      ...createSearchForm(),
      ...this.hasSearchForm
    }
    this.mineSearchFormLocal = {
      ...createSearchForm(),
      ...this.mineSearchForm
    }
    this.activeName = this.$route.path
  },
  methods: {
    openFilter() {
      this.show = true
    },
    openPreFilter() {
      this.show = true
      this.filterLoading = false
    },
    openHasFilter() {
      this.show = true
      this.filterLoading = false
    },
    // 搜索条件过滤
    openMineFilter() {
      this.show = true
      this.filterLoading = false
    },
    // 搜索条件重置
    setOldSearchFrom() {
      // 目前逻辑，重置就是清空，而不是上次的条件
      if (this.$route.path === '/index/approval/pre') {
        this.preSearchFormLocal = createSearchForm()
      }
      if (this.$route.path === '/index/approval/has') {
        this.hasSearchFormLocal = createSearchForm()
      }
      if (this.$route.path === '/index/approval/mine') {
        this.mineSearchFormLocal = createSearchForm()
      }
    },
    // 选中完状态后再掉一下搜索条件，实现实时请求列表接口功能
    filterOK() {
      this.show = false
      this.filterLoading = false
      if (this.$route.path === '/index/approval/pre') {
        this.preSearch()
      }
      if (this.$route.path === '/index/approval/has') {
        this.hasSearch()
      }
      if (this.$route.path === '/index/approval/mine') {
        this.mineSearch()
      }
    },
    // 选择状态函数
    statusChange(form, key, value) {
      form[key] = value
    },
    // 搜索对应方法分别对于不同状态列表页
    preSearch() {
      if (this.preSearchFormLocal.orgId === '') {
        this.preSearchFormLocal.orgIdTemp = ''
        this.preSearchFormLocal.orgName = ''
        this.preSearchFormLocal.orgCode = ''
      }
      this.$store.commit('SET_preSearchForm', {
        condition: this.preSearchFormCondition,
        ...this.preSearchFormLocal
      })
    },
    hasSearch() {
      if (this.hasSearchFormLocal.orgId === '') {
        this.hasSearchFormLocal.orgIdTemp = ''
        this.hasSearchFormLocal.orgName = ''
        this.hasSearchFormLocal.orgCode = ''
      }
      this.$store.commit('SET_hasSearchForm', {
        condition: this.hasSearchFormCondition,
        ...this.hasSearchFormLocal
      })
    },
    mineSearch() {
      if (this.mineSearchFormLocal.orgId === '') {
        this.mineSearchFormLocal.orgIdTemp = ''
        this.mineSearchFormLocal.orgName = ''
        this.mineSearchFormLocal.orgCode = ''
      }
      this.$store.commit('SET_mineSearchForm', {
        condition: this.mineSearchFormCondition,
        ...this.mineSearchFormLocal
      })
    },
    openOrgSelect(editForm) {
      this.editForm = editForm
      this.$refs.orgSelect.open()
    },
    orgSelectOk(org) {
      this.editForm.orgId = org.phid
      this.editForm.orgIdTemp = org.phid
      this.editForm.orgCode = org.encode
      this.editForm.orgName = org.name
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/style/_var.scss";
@import "~@/style/theme/theme-color.scss";
.view-approval {
  background-color: $grey-body-color;
  .c-l-w {
    margin-top: 12px;
    height: calc(100vh - 200px);
    overflow-x: hidden;
    overflow-y: auto;
    background-color: $grey-body-color;
    padding: 0;
    .m-t {
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
        overflow: visible;
      }
      .van-cell__label {
        font-size: 11px;
      }
      .f-v {
        position: absolute;
        bottom: 0;
        right: -16px;
        font-size: 11px;
        line-height: 18px;
      }
    }
  }
  .label-b {
    position: relative;
  }
}
.s-w {
  background-color: #fff;
  padding: 8px 16px;
  .fake-input {
    display: inline-block;
    vertical-align: top;
  }
  .s-b {
    display: inline-block;
    width: 300px;
  }
  .three {
    padding: 0;
    width: 36px;
    text-align: center;
  }
}
.van-button--small {
  font-size: 10px !important;
}
</style>
