import axios from 'axios'
import qs from 'qs'
import storageUtil from '@/util/storageUtil'
import urlUtil from '@/util/urlUtil'
import { Toast } from 'vant'

let basePath = '/'

// 默认连接地址，只在调试时有用
if (process.env.NODE_ENV === 'development') {
  basePath = `/${urlUtil.getQueryStringArgs('pt') || 'main'}${basePath}`
}

axios.interceptors.request.use(function(config) {
  return config
}, function(error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function(response) {
  if (response.data.status === false) {
    return Promise.reject(new Error(response.data.message))
  }
  return response
}, function(error) {
  // Toast.fail('接口错误！')
  Toast.fail(error.message)
  return Promise.reject(error)
})

function makeUrl(url) {
  if (url.startsWith('/') || url.startsWith('http://') || url.startsWith('https://')) {
    return url
  } else {
    return `${basePath}${url}`
  }
}

const Http = {
  get(url, query, options) {
    let queryString = ''
    if (query) {
      query.timestamp = new Date().getTime()
    } else {
      query = { timestamp: new Date().getTime() }
    }
    queryString = qs.stringify(query)
    return axios.get(makeUrl(url + (queryString ? '?' + queryString : '')), options).then(data => data.data)
  },
  getWithCache(url, query, cache, options) {
    let queryString = ''
    let cacheKey = url
    if (query) {
      cacheKey += qs.stringify({
        ...query
      })
      query.timestamp = new Date().getTime()
      queryString = qs.stringify(query)
    } else {
      queryString = qs.stringify({ timestamp: new Date().getTime() })
    }
    let cacheData = storageUtil.getQueryCache(cacheKey)
    if (cacheData) {
      const cacheDataRaw = JSON.parse(cacheData)
      // 可以使用缓存
      if (!((Date.now() - cacheDataRaw.time) > cache.interval * 1000)) {
        return new Promise((resolve, reject) => {
          resolve(cacheDataRaw.data)
        })
      }
    }
    return axios.get(makeUrl(url + (queryString ? '?' + queryString : '')), options).then(data => {
      cacheData = {
        time: Date.now(),
        data: data.data
      }
      storageUtil.setQueryCache(cacheKey, JSON.stringify(cacheData))
      return data.data
    })
  },
  getRaw(url, query, options) {
    let queryString = ''
    if (query) {
      query.timestamp = new Date().getTime()
      queryString = qs.stringify(query)
    } else {
      queryString = qs.stringify({ timestamp: new Date().getTime() })
    }
    return axios.get(makeUrl(url + (queryString ? '?' + queryString : '')), options)
  },
  post(url, param, options) {
    return axios.post(makeUrl(url), qs.stringify(param), options).then(data => data.data)
  },
  postRaw(url, param, options) {
    return axios.post(makeUrl(url), qs.stringify(param), options)
  },
  postFormData(url, param, options) {
    return axios.post(makeUrl(url), param, options).then(data => data.data)
  },
  postFormDataRaw(url, param, options) {
    return axios.post(makeUrl(url), param, options)
  },
  delete(url, options) {
    return axios.delete(makeUrl(url), options).then(data => data.data)
  },
  deleteRaw(url, options) {
    return axios.delete(makeUrl(url), options)
  },
  jsonp(url, options) {
    return axios.jsonp(makeUrl(url), options)
  },
  makeUrl,
  generateUrl(url) {
    return makeUrl(url)
  }
}

export default Http
