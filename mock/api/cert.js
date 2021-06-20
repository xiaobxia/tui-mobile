const Mock = require('mockjs')

module.exports = [
  // mock get all routes form server
  {
    url: '/certs',
    type: 'get',
    response: () => {
      const data = Mock.mock({
        'records|1-10': [
          {
            'name|+1': '强化组织建设 优化组织功能 优化组织功能 优化组织功能',
            'type': '凭证类型-00001',
            'money': '1000.00',
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
