import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

function refreshToken () {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      // refresh_token 只能使用一次
      refreshtoken: store.state.user.refresh_token
    })
  })
}

const request = axios.create({
  // 配置选项 baseURL, timeout...
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 在这里通过改写 config 配置信息来实现业务功能的统一处理
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  // 注意：这里一定要返回 config,否则请求就发不出去
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
let isRefreshing = false // 控制刷新 token 的状态
let requests = [] // 存储刷新 token 期间过来的 401 请求
request.interceptors.response.use(function (response) { // 状态码为 2xx 都会进入这里
  // 如果是自定义错误状态码，错误处理就写到这里
  return response
}, async function (error) { // 超出 2xx 状态码都执行这里
  // 如果是使用 HTTP 状态码，错误处理就写到这里
  if (error.response) { // 请求已发出去且收到响应了，但是状态码超出了 2xx 范围
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // token 无效 （没有提供 token、token 是无效的、token 过期了）
      // 如果没有 refresh_token，则直接跳转登录页
      if (!store.state.user) {
        redirectLogin()

        return Promise.reject(error)
      }

      // 刷新 token
      if (!isRefreshing) {
        isRefreshing = true // 开启刷新状态
        // 如果有 refresh_token 则尝试使用 refresh_token 获取新的 access_token
        return refreshToken().then(res => {
          if (!res.data.success) {
            throw new Error('刷新 Token 失败')
          }

          // 刷新 token 成功了
          store.commit('setUser', res.data.content)
          // 把 requests 队列中的请求重新发出去
          requests.forEach(cb => cb())
          // 重置 requests 数组
          requests = []
          // 把第一次失败的请求发出
          return request(error.config)
        }).catch(err => {
          console.log(err)
          // 把当前登陆用户状态清除
          store.commit('setUser', null)
          //    失败了 -> 跳转登陆页重新登录获取新的 token
          redirectLogin()
          return Promise.reject(error)
        }).finally(() => {
          isRefreshing = false // 重置刷新状态
        })
      }

      // 刷新状态下，把请求挂起，放到 requests 数组中
      return new Promise(resolve => {
        requests.push(() => {
          resolve(request(error.config))
        })
      })
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误，请联系管理员')
    }
  } else if (error.request) { // 请求发出去但没有收到响应
    Message.error('请求超时，请刷新重试')
  } else { // 在设置请求时发生了一些事情，触发了一个错误
    Message.error(`请求失败：${error.message}`)
  }

  // 把请求失败的错误对象继续抛出，扔给上一个调用者
  return Promise.reject(error)
})

export default request
