import axios from 'axios'
import { toast } from '@/components/toast'
// import loader from '@/components/loader'

const server = axios.create({
  timeout: 30 * 1000
})
server.interceptors.request.use(config => {
  return config
}, err => {
  return Promise.reject(err)
})
server.interceptors.response.use(res => {
  const data = res.data
  toast(data.msg)
  if (data.code!==1) {
    return;
  }
  return data
}, err => {
  toast('服务错误或连接超时')
  console.log(err.request.status)
  return Promise.reject(err)
})

export default {
  request (method, url, data = {}, other = {}) {
    if (!method) {
      console.warn('请输入一个请求类型参数，get || post')
      return
    }
    if (!url) {
      console.warn('请输入一个请求路径参数')
      return
    }
    return server({ method, url, data, ...other })
  },
  get (url, data = {}) {
    if (!url) {
      console.warn('请输入一个请求路径参数')
      return
    }
    return server({
      url,
      method: 'get',
      params: {
        ...data
      }
    })
  },
  post (url, data = {}) {
    if (!url) {
      console.warn('请输入一个请求参数')
      return
    }
    let arr = []
    let params = ''
    Object.keys(data).forEach(key => {
      arr.push(`${key}=${data[key]}`)
    })
    params = arr.join('&')
    return server({
      url,
      method: 'post',
      data: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  },
  upload (url, formData) {
    if (!url) {
      console.warn('请输入一个请求路径参数')
      return
    }
    return server({
      method: 'post',
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
