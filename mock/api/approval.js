const Mock = require('mockjs')

module.exports = [
  // mock get all routes form server
  {
    url: '/approvalList',
    type: 'get',
    response: () => {
      const data = Mock.mock({
        'records|1-10': [
          {
            'name|+1': '李某提交的支出管理',
            'verifyStatus|1-3': 3,
            'phid|1-100': 100
          }
        ]
      })
      data.total = 10
      return {
        code: 200,
        data
      }
    }
  }
]
