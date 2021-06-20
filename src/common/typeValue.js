// 基于常量的选择框数据，列表数据格式化
function findLabel(list, value) {
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    if (item.value === value) {
      return item.label
    }
  }
  return ''
}
const VERIFY_STATUS_LIST = [
  { value: '1', label: '未审核' },
  { value: '2', label: '已审核' }
]

// 审批状态
export const APPROVAL_STATUS = {
  0: { label: '未送审', value: 0 },
  1: { label: '未审批', value: 1 },
  2: { label: '审批中', value: 2 },
  3: { label: '审核通过', value: 3 },
  4: { label: '审批不通过', value: 4 },
  5: { label: '审批退回未送审', value: 5 }
}

// 支付状态
export const PAY_STATUS = {
  0: { label: '未支付', value: 0, color: '#484848' },
  1: { label: '支付中', value: 1, color: '#FFC600' },
  2: { label: '支付成功', value: 2, color: '#13A024' },
  3: { label: '支付失败', value: 3, color: '#E5302D' },
  4: { label: '部分支付失败', value: 4, color: '#E5302D' },
  5: { label: '待复核/授权', value: 5, color: '#484848' },
  6: { label: '支付异常', value: 6, color: '#DC1515' }
}
export const PAY_STATUS1 = [
  { label: '未支付', value: 0, color: '#484848' },
  { label: '支付中', value: 1, color: '#FFC600' },
  { label: '支付成功', value: 2, color: '#13A024' },
  { label: '支付失败', value: 3, color: '#E5302D' },
  { label: '部分支付失败', value: 4, color: '#E5302D' },
  { label: '待复核/授权', value: 5, color: '#484848' },
  { label: '支付异常', value: 6, color: '#DC1515' }
]
// 审批节点状态
export const APPROVAL_NODE_STATUS = {
  0: { label: '待他人审批', value: 0 },
  1: { label: '待我审批', value: 1 },
  2: { label: '审核通过', value: 2 },
  3: { label: '审批未通过', value: 3 },
  4: { label: '审批退回(未送审)', value: 4 }
}

const SHI_FOU_LIST = {
  0: { label: '否', value: 0 },
  1: { label: '是', value: 1 }
}

const SHI_FOU_SELECT = [
  { label: '否', value: 0 },
  { label: '是', value: 1 }
]

const BILL_STATUS = [
  { value: 0, label: '未送审' },
  { value: 1, label: '未审批' },
  { value: 2, label: '审批中' },
  { value: 3, label: '审批通过' },
  { value: 4, label: '审批不通过' },
  { value: 5, label: '审批退回' },
  { value: 6, label: '审批退回(未送审)' }
]

export default {
  VERIFY_STATUS_LIST,
  APPROVAL_STATUS,
  PAY_STATUS,
  APPROVAL_NODE_STATUS,
  SHI_FOU_LIST,
  SHI_FOU_SELECT,
  formatPayStatus(value) {
    return findLabel(PAY_STATUS1, value)
  },
  BILL_STATUS,
  formatBillStatus(value) {
    return findLabel(BILL_STATUS, value)
  }
}
