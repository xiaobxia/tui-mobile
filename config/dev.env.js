'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const proxyTable = require('./proxyTable')
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  proxyTable,
  ENV_CONFIG: '"dev"',
  BASE_API: '"我是本地"'
})
