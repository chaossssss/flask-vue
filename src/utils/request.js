import axios from 'axios'

const service = axios.create({
  // baseURL: 'http://localhost:8888', // 设置基础 URL，根据实际情况修改 '/接口前缀', //import.meta.env.VITE_BASE_URL
  timeout: 5000, // 设置请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在请求发送之前做一些处理，例如添加 token 等
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 在响应数据返回之前做一些处理
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  },
)
export default service
