import axios from 'axios'

const instance = axios.create({
  baseURL: '/api',
  timeout: 1000
})

instance.interceptors.request.use(
  (config) => {
    return config
  }, (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  // 一般是服务端异常或者网络异常
  if (error.response.status === 401) {
    // 未登录，跳转
    setTimeout(() => {
      location.href = '/password-login'
    }, 200)
    return error.response
  }
  return Promise.reject(error)
})

export default instance
