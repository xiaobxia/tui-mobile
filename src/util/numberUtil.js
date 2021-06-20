function formatMoneyRaw(str, len) {
  let newStr = ''
  let count = 0
  let startCode = ''
  len = len || 2
  let zero = ''
  for (let i = 0; i < len; i++) {
    zero += '0'
  }
  str = str ? '' + str : '0'
  if (str.charAt(0) === '-') {
    str = str.slice(1)
    startCode = '-'
  }
  // 当数字是整数
  if (str.indexOf('.') === -1) {
    for (let i = str.length - 1; i >= 0; i--) {
      if (count % 3 === 0 && count !== 0) {
        newStr = str.charAt(i) + ',' + newStr
      } else {
        newStr = str.charAt(i) + newStr
      }
      count++
    }
    str = newStr + `.${zero}`
    // 自动补小数点后两位
    return startCode + str
  } else {
    for (let i = str.indexOf('.') - 1; i >= 0; i--) {
      if (count % 3 === 0 && count !== 0) {
        newStr = str.charAt(i) + ',' + newStr
      } else {
        newStr = str.charAt(i) + newStr // 逐个字符相接起来
      }
      count++
    }
    str = newStr + (str + zero).substr((str + zero).indexOf('.'), len + 1)
    return startCode + str
  }
}

function clearToTextNumber(value) {
  return value.replace(/[^\d]/g, '')
}
const numberUtil = {
  countRate: function(numerator, denominator) {
    denominator = denominator || 1
    return Math.round(10000 * (numerator / denominator)) / 100
  },
  countDifferenceRate: function(numerator, denominator) {
    denominator = denominator || 1
    numerator = numerator || 1
    return Math.round(1000000 * ((numerator - denominator) / denominator)) / 10000
  },
  keepTwoDecimals: function(number) {
    return Math.round(100 * number) / 100
  },
  toTwoDecimals: function(number) {
    let newNumber = parseFloat(number)
    if (isNaN(newNumber)) {
      newNumber = 0
    }
    return newNumber.toFixed(2)
  },
  keepFourDecimals: function(number) {
    return Math.round(10000 * number) / 10000
  },
  ifAround: function(number, target) {
    const step = 100
    return (number >= (target - step)) && (number <= (target + step))
  },
  // 数字转大写（为金额负数时，为欠）
  digitUppercase(n) {
    /*  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
         return "数据非法"; */
    if (!/^(0|\-*[1-9]\d*)(\.\d+)?$/.test(n)) return '数据非法'
    var fuhao = (n.toString().indexOf('-') === 0 ? '负' : '')

    var unit = '仟佰拾亿仟佰拾万仟佰拾元角分'
    var str = ''
    n += '00'
    // 如果是负数就就截取
    if (fuhao === '负') {
      n = n.substring(1, n.length)
    }
    var p = n.indexOf('.')
    if (p >= 0) { n = n.substring(0, p) + n.substr(p + 1, 2) }
    unit = unit.substr(unit.length - n.length)
    for (var i = 0; i < n.length; i++) { str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i) }
    return fuhao + str.replace(/零(仟|佰|拾|角)/g, '零').replace(/(零)+/g, '零').replace(/零(万|亿|元)/g, '$1').replace(/(亿)万|壹(拾)/g, '$1$2').replace(/^元零?|零分/g, '').replace(/元$/g, '元整')
  },
  formatMoney(number) {
    return formatMoneyRaw(number)
  },
  // 转化为数字文本
  clearToTextNumber,
  // 转化为数字文本
  replaceToTextNumber(row, key) {
    row[key] = clearToTextNumber(row[key])
  },

  // 生成uuid字符串
  createUniqueId(n) {
    n = 1 // 生成一个唯一id，包含数字和字母
    var random = function() {
      // 生成10-12位不等的字符串
      return Number(
        Math.random()
          .toString()
          .substr(2)
      ).toString(36) // 转换成十六进制
    }
    var arr = []
    function createId() {
      var num = random()
      var _bool = false
      arr.forEach(v => {
        if (v === num) _bool = true
      })
      if (_bool) {
        createId()
      } else {
        arr.push(num)
      }
    }
    var i = 0
    while (i < n) {
      createId()
      i++
    }
    // this.uniqueId = arr[0] // 将生成的转为我们需要的字符串并赋值
    return arr[0]
  }
}

export default numberUtil
