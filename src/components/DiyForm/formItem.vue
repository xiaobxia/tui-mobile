<template>
  <div v-if="!detail.hidden">
    <template v-if="detail.tag === 'el-input'">
      <van-field v-model="modelForm[detail.vModel]" :label="detail.label" v-bind="detail.attrs" />
    </template>
    <template v-if="detail.tag === 'h3'">
      <div class="col-title">
        <div class="col-title-content">{{ detail.childText }}</div>
      </div>
    </template>
    <template v-if="detail.tag === 'el-divider'">
      <van-divider />
    </template>
    <template v-if="detail.tag === 'a'">
      <van-cell :title="detail.label">
        <a :href="detail.href" class="theme-text">{{ detail.jump ? detail.childText : detail.href }}</a>
      </van-cell>
    </template>
    <template v-if="detail.tag === 'fc-amount'">
      <van-field v-model="modelForm[detail.vModel]" :label="detail.label" v-bind="detail.attrs" right-icon="gold-coin-o"/>
      <div class="explain-text">大写：{{ getAmountChinese(modelForm[detail.vModel]) }}</div>
    </template>
    <template v-if="detail.tag === 'el-select'">
      <van-field :label="detail.label">
        <template #input>
          <van-dropdown-menu>
            <van-dropdown-item v-model="modelForm[detail.vModel]" :options="detail.options" />
          </van-dropdown-menu>
        </template>
      </van-field>
    </template>
    <template v-if="detail.tag === 'el-upload'">
      <van-field :label="detail.label">
        <template #input>
          <van-uploader v-model="modelForm[detail.attrs]" :after-read="afterRead" />

        </template>
      </van-field>
      <!-- <van-cell :title="detail.label" is-link @click="viewFile(detail.defaultValue)"/> -->

      <!--<div>-->
      <!--<div v-if="detail.defaultValue && detail.defaultValue.length > 0">-->
      <!--<div v-for="(item, index) in detail.defaultValue" :key="index" class="file-item-bg" >-->
      <!--<div @click="downLoadFile(item)">{{ item.name }}</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
    </template>
  </div>

</template>

<script>
function makeMap(str, expectsLowerCase) {
  const map = Object.create(null)
  const list = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase
    ? val => map[val.toLowerCase()]
    : val => map[val]
}
const isAttr = makeMap(
  'accept,accept-charset,accesskey,action,align,alt,async,autocomplete,' +
    'autofocus,autoplay,autosave,bgcolor,border,buffered,challenge,charset,' +
    'checked,cite,class,code,codebase,color,cols,colspan,content,http-equiv,' +
    'name,contenteditable,contextmenu,controls,coords,data,datetime,default,' +
    'defer,dir,dirname,disabled,download,draggable,dropzone,enctype,method,for,' +
    'form,formaction,headers,height,hidden,high,href,hreflang,http-equiv,' +
    'icon,id,ismap,itemprop,keytype,kind,label,lang,language,list,loop,low,' +
    'manifest,max,maxlength,media,method,GET,POST,min,multiple,email,file,' +
    'muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,' +
    'preload,radiogroup,readonly,rel,required,reversed,rows,rowspan,sandbox,' +
    'scope,scoped,seamless,selected,shape,size,type,text,password,sizes,span,' +
    'spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,' +
    'target,title,type,usemap,value,width,wrap,oninput'
)
export default {
  name: 'FormItem',
  components: {
  },
  props: {
    detail: {
      type: Object,
      default: () => {
        return {}
      }
    },
    modelForm: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      value: '',
      show: false,
      accountList: []
    }
  },
  watch: {
    detail() {
      console.log('1111')
      this.initDetail()
    }
  },
  created() {
    this.initDetail()
  },
  // 关闭
  deactivated() {
    this.show = false
  },
  methods: {
    open(accountList) {
      this.accountList = accountList
      this.show = true
    },
    backHandler() {
      this.$router.history.go(-1)
    },
    formatAccountNo(number) {
      number = '' + number
      const start = number.substr(0, 4)
      const end = number.substr(-4, 4)
      return `${start}****${end}`
    },
    close() {
      this.show = false
      this.$emit('close')
    },
    initDetail() {
      console.log(this.detail)
      this.detail.props = {}
      this.detail.attrs = {}
      for (const key in this.detail) {
        if (key !== 'props' && key !== 'attrs') {
          if (!isAttr(key)) {
            this.detail.props[key] = this.detail[key]
          } else {
            this.detail.attrs[key] = this.detail[key]
          }
        }
        if (key === 'options') {
          this.detail[key].map(v => {
            v.text = v.label
          })
        }
      }
    },
    getAmountChinese(val) {
      const amount = +val
      if (Number.isNaN(amount) || amount < 0) return ''
      const NUMBER = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
      const N_UNIT1 = ['', '拾', '佰', '仟']
      const N_UNIT2 = ['', '万', '亿']
      const D_UNIT = ['角', '分', '厘', '毫']
      const [integer, decimal] = amount.toString().split('.')
      if (integer && integer.length > 12) return '金额过大无法计算'
      let res = ''
      // 整数部分
      if (integer) {
        for (let i = 0, len = integer.length; i < len; i++) {
          const num = integer.charAt(i)
          const pos = len - i - 1 // 排除个位后 所处的索引位置
          if (num === '0') { // 当前位 等于 0 且下一位也等于 0 则可跳过计算
            if (i === len - 1) {
              if (integer.length === 1) res += '零' // 0.35 这种情况不可跳过计算
              break
            }
            if (integer.charAt(i + 1) === '0') continue
          }
          res += NUMBER[num]
          if (parseInt(num)) res += N_UNIT1[(pos) % 4]
          if (pos % 4 === 0) res += N_UNIT2[Math.floor(pos / 4)]
        }
      }
      res += '圆'
      // 小数部分
      if (parseInt(decimal)) {
        for (let i = 0; i < 4; i++) {
          const num = decimal.charAt(i)
          if (parseInt(num)) res += NUMBER[num] + D_UNIT[i]
        }
      } else {
        res += '整'
      }
      return res
    },
    afterRead(file) {
      console.log(file)
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
  font-size: 12px;
  margin-bottom: 8px;
  .tu {
    width: 42px;
    height: 42px;
    background: #3296fa;
  }
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
  .explain-text {
    padding: 10px 16px;
    background-color: #fff;
  }
  /deep/ .van-dropdown-menu {
    .van-dropdown-menu__title::after {
      content: '';
    }
  }

</style>
