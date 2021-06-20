<template>
  <div class="page-cert-detail">
    <van-nav-bar title="凭证详情" left-arrow @click-left="backHandler" />
    <div class="cert-content">
      <div class="app-card-block bottom">
        <div class="card-title">{{ certMain.certTypeName }}-{{ certMain.certNo }}</div>
        <div class="c-d-t">
          <van-row class="c-d-t-r">
            <van-col span="12">
              <span class="sub-text">
                附件：
                <template v-if="certMain.attachNum && certMain.attachNum !== '0'">
                  <span @click="viewFile">
                    <span>{{ certMain.attachNum }}</span>
                    <i class="fa fa-paperclip" aria-hidden="true"/>
                  </span>
                </template>
                <span v-else>0</span>
              </span>
            </van-col>
            <van-col span="12">
              <span class="sub-text">{{ certMain.certDate }}</span>
            </van-col>
          </van-row>
          <van-row>
            <van-col span="12">
              <span class="sub-text">制单人：{{ certMain.phCreator }}</span>
            </van-col>
            <van-col span="12">
              <span class="sub-text">审核人：{{ certMain.verifyName }}</span>
            </van-col>
          </van-row>
        </div>
        <lock-tag />
        <lock-tag />
      </div>
      <div v-for="certDtl in certDtlVOList" :key="certDtl.phid" class="app-card-block both">
        <div class="card-title">{{ certDtl.digest }}</div>
        <div class="detail-card">
          <van-row>
            <van-col span="12">
              <div class="left ellipsis-text">{{ certDtl.subCode }}{{ certDtl.subName }}</div>
            </van-col>
            <van-col span="12">
              <div v-if="certDtl.debit>0" class="right">{{ $formatMoney(certDtl.debit) }}</div>
              <div v-if="certDtl.lender>0" class="right">{{ $formatMoney(certDtl.lender) }}</div>
            </van-col>
          </van-row>
          <div v-if="certDtl.debit>0" class="tag-icon blue">借</div>
          <div v-if="certDtl.lender>0" class="tag-icon red">贷</div>
        </div>
        <div v-for="certDtlAst in certDtl.hsCertDtlAstList" :key="certDtlAst.phid">
          <div class="detail-card">
            <van-row>
              <van-col span="12">
                <div class="left ellipsis-text">{{ certDtlAst.astName }}</div>
              </van-col>
              <van-col span="12">
                <div class="right">{{ $formatMoney(certDtlAst.money) }}</div>
              </van-col>
            </van-row>
          </div>
        </div>
        <lock-tag />
        <lock-tag />
      </div>
      <div class="app-card-block top">
        <div class="card-title">总计：</div>
        <div class="detail-card large">
          <div class="item">
            <van-row>
              <van-col span="12">
                <div class="left">合计</div>
              </van-col>
              <van-col span="12">
                <div class="right">{{ $formatMoney(certMain.money) }}</div>
              </van-col>
            </van-row>
            <div class="tag-icon blue">借</div>
          </div>
          <div class="item">
            <van-row>
              <van-col span="12">
                <!-- <div class="left">101现金</div> -->
              </van-col>
              <van-col span="12">
                <div class="right">{{ $formatMoney(certMain.money) }}</div>
              </van-col>
            </van-row>
            <div class="tag-icon red">贷</div>
          </div>
        </div>
      </div>
    </div>
    <file-view ref="fileView"/>
  </div>
</template>

<script>
import LockTag from '@/components/LockTag'
import FileView from '@/components/FileView'
export default {
  name: 'CertDetail',
  components: {
    LockTag,
    FileView
  },
  data() {
    return {
      certMain: {},
      certDtlVOList: [],
      phid: this.$route.query.phid,
      fileList: []
    }
  },
  created() {
    console.log('CertDetail-render')
    this.queryCurrent()
    this.queryFile()
  },
  methods: {
    viewFile() {
      this.$refs.fileView.open(this.fileList)
    },
    toPath(path) {
      this.$router.push(path)
    },
    backHandler() {
      this.$router.history.go(-1)
    },
    // 查询当前启用凭证明细
    queryCurrent() {
      this.$http
        .get('villageapp/cert/findCert/' + this.$route.query.phid, {})
        .then((res) => {
          this.certMain = res.data
          this.certDtlVOList = res.data.certDtlVOList
        })
    },
    // 查询附件
    queryFile() {
      this.loading = true
      this.$http
        .postFormData('villageapp/cert/findCertFile', [this.$route.query.phid])
        .then((res) => {
          // 数据格式如下面情况时获取到的
          // 202009041676000004: [{phid: "202009041013000004", phCreator: "马遇伯", phUserId: "498593444164546560",…}]
          let fileList = []
          const data = res.data || {}
          for (const key in data) {
            fileList = fileList.concat(data[key] || [])
          }
          this.fileList = fileList
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/style/_var.scss";
@import "~@/style/theme/theme-color.scss";
.cert-content {
  height: calc(100vh - 46px);
  overflow-x: hidden;
  overflow-y: auto;
  background-color: $grey-body-color;
  padding: 12px 16px;
}
.sub-text {
  display: block;
  color: $lighter-text-color;
  line-height: 17px;
  font-size: 12px;
}
.ast-text {
  display: block;
  color: $lighter-text-color;
  font-size: 12px;
  /*margin-bottom: 8px;*/
}
.detail-card {
  position: relative;
  height: 32px;
  line-height: 32px;
  background: rgba(241, 242, 243, 1);
  border-radius: 4px;
  font-size: 13px;
  padding: 0 12px;
  margin-bottom: 8px;
  &.large {
    height: 64px;
    .item {
      position: relative;
      padding: 0 12px;
      line-height: 32px;
      min-height: 32px;
    }
  }
  .left {
    text-align: left;
  }
  .right {
    text-align: right;
  }
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
}
  .c-d-t {
    .c-d-t-r {
      margin-bottom: 5px;
    }
  }
  .fa-paperclip {
    margin-left: 5px;
    color: $theme-color;
  }
</style>
