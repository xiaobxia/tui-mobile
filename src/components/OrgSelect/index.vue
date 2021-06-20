<template>
  <van-popup
    v-model="show"
    :style="{ height: '100%', width: '100%' }"
    position="left"
  >
    <van-nav-bar
      title="选择组织"
      left-arrow
      @click-left="close"
    />
    <div class="c-t">
      <view-loading v-if="viewLoading"/>
      <div class="s-b">
        <van-search v-model="searchKey" placeholder="请输入组织名" @change="searchKeyChange" />
      </div>
      <div class="tree-b">
        <div class="b-w">
          <van-button
            type="primary"
            size="mini"
            class="b-b-i"
            @click="okHandler"
          >确定</van-button>
        </div>
        <van-steps
          :active="valueList.length"
          direction="vertical"
          inactive-icon="checked"
          active-icon="circle"
        >
          <van-step
            v-for="(value, index) in valueList"
            :key="value.name"
          >
            <div @click="backItem(value, index)">{{ value.name }}</div>
          </van-step>
          <van-step v-if="selectList.length > 0">
            <div>请选择</div>
          </van-step>
        </van-steps>
      </div>
      <div class="org-list">
        <van-cell
          v-for="item in selectList"
          :key="item.name"
          :title="item.name"
          @click="selectItem(item)"
        />
      </div>
    </div>
  </van-popup>
</template>

<script>
import ViewLoading from '@/components/ViewLoading'
import { Toast } from 'vant'

export default {
  name: 'OrgSelect',
  components: {
    ViewLoading
  },
  props: {
    type: {
      type: String,
      default: 'reload'
    }
  },
  data() {
    return {
      show: false,
      searchKey: '',
      selectList: [],
      selectListRaw: [],
      valueList: [],
      viewLoading: false
    }
  },
  created() {
  },
  methods: {
    // 搜索
    searchKeyChange() {
      if (this.searchKey) {
        const list = []
        this.selectListRaw.forEach((item) => {
          if (item.name.indexOf(this.searchKey) !== -1) {
            list.push(item)
          }
        })
        this.selectList = list
      } else {
        this.selectList = this.selectListRaw
      }
    },
    // 查询第一级组织
    queryFirstOrgList() {
      this.viewLoading = true
      this.$http.get(`villageapp/orgNew/findFirstOrg/${this.$commonQueryParam.phUserId}`).then((orgRes) => {
        this.viewLoading = false
        this.selectList = orgRes.data || []
        this.selectListRaw = orgRes.data || []
      }).catch((err) => {
        console.log(err)
        this.viewLoading = false
      })
    },
    open() {
      this.searchKey = ''
      this.selectList = []
      this.selectListRaw = []
      this.valueList = []
      this.queryFirstOrgList()
      this.show = true
    },
    close() {
      this.show = false
    },
    // 查询下一级
    queryChild(item) {
      this.viewLoading = true
      return this.$http.get(`villageapp/orgNew/findSonByPhId`, { phid: item.phid }).then((res) => {
        this.viewLoading = false
        this.selectList = res.data || []
        this.selectListRaw = res.data || []
      }).catch((err) => {
        console.log(err)
        this.viewLoading = false
        this.selectList = []
        this.selectListRaw = []
      })
    },
    // 返回项
    backItem(value, index) {
      this.searchKey = ''
      this.valueList = this.valueList.slice(0, index + 1)
      this.queryChild(value)
    },
    // 选择项
    selectItem(item) {
      this.searchKey = ''
      this.valueList.push(item)
      this.queryChild(item)
    },
    okHandler() {
      if (this.valueList.length === 0) {
        Toast.fail('请选择组织！')
        return false
      }
      const org = this.valueList[this.valueList.length - 1]
      if (this.type === 'reload') {
        // 设置当前组织
        this.$store.dispatch('getUserBooksCache', org.phid)
        this.$store.dispatch('setOrgInfo', org)
        this.$emit('ok', org)
        this.show = false
        window.location.reload()
      } else if (this.type === 'value') {
        this.$store.dispatch('getUserBooksCache', org.phid)
        this.$emit('ok', org)
        this.show = false
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .c-t {
    position: relative;
    padding: 0 16px;
  }
  .s-b {
    padding: 8px 0;
  }
  .tree-b {
    position: relative;
    margin-top: 10px;
    .b-w {
      z-index: 100;
      position: absolute;
      right: 0;
      top: 5px;
    }
    .b-b-i {
      width: 52px;
    }
  }
  .org-list {
    /deep/ {
      .van-cell__title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .tree-b {
    /deep/ {
      .van-step__title {
        div {
          width: 250px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
</style>
