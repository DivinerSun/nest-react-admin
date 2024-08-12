import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { toast } from './message'

// 自定义code码
export enum HttpResponseCode {
  SUCCESS = 2000, // 成功
  BAD_REQUEST = 4000, // 请求错误
  UNAUTHORIZED = 4001, // 未认证
  FORBIDDEN = 4003, // 请求被拒绝
  NOT_FOUND = 4004, // 请求地址不存在
  ERROR = 5000, // 服务器异常
}

export interface RequestConfig extends InternalAxiosRequestConfig {
  loading?: boolean
  needToken?: boolean
}

type HttpRequestConfig = Omit<RequestConfig, 'headers'>

export type Result<T> = {
  code: HttpResponseCode
  message: string
  result: T
}

export class HttpRequest {
  // Axios 实例对象
  instance: AxiosInstance
  // 实例基础配置
  baseConfig: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_HTTP_URL,
    timeout: 30000,
  }

  constructor(config: HttpRequestConfig) {
    // 初始化Axios实例对象
    this.instance = axios.create({ ...this.baseConfig, ...config })

    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: RequestConfig) => {
        // 获取token,并添加到请求头
        const token = window.localStorage.getItem('token')
        const { needToken = true } = config
        // 处理请求头的一些内容
        if (config && config.headers) {
          config.headers['Content-Type'] = 'application/json;chartset=utf-8'
          if (needToken && token) {
            config.headers.Authorization = `${token}`
          }
        }

        return config
      },
      (err: any) => {
        toast('请求发送失败', 'error')
        return Promise.reject(err)
      },
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        return Promise.resolve(res)
      },
      (err: any) => {
        // 这里用来处理http常见错误，进行全局提示
        let message = ''
        switch (err?.response?.status) {
          case 400:
            message = '请求错误(400)'
            break
          case 401:
            message = '未授权，请重新登录(401)'
            break
          case 403:
            message = '拒绝访问(403)'
            break
          case 404:
            message = '请求地址不存在(404)'
            break
          case 408:
            message = '请求超时(408)'
            break
          case 500:
            message = '服务器错误(500)'
            break
          case 501:
            message = '服务未实现(501)'
            break
          case 502:
            message = '网络错误(502)'
            break
          case 503:
            message = '服务不可用(503)'
            break
          case 504:
            message = '网络超时(504)'
            break
          case 505:
            message = 'HTTP版本不受支持(505)'
            break
          default:
            message = `服务器错误(${err?.response?.status})!`
        }
        if (message) {
          toast(message, 'error')
        }
        return Promise.reject(err.response)
      },
    )
  }

  // 自定义请求类方法
  public request(config: HttpRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config)
  }

  // * 封装常用请求方法 *
  public get<T = any>(
    url: string,
    params?: any,
    config?: HttpRequestConfig,
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.get(url, { ...config, params })
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: HttpRequestConfig,
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.post(url, data, config)
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: HttpRequestConfig,
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.put(url, data, config)
  }

  public delete<T = any>(
    url: string,
    params?: any,
    config?: HttpRequestConfig,
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.delete(url, { ...config, params })
  }
}

export const http = new HttpRequest({})
export const request = http.request.bind(http)
export const get = http.get.bind(http)
export const post = http.post.bind(http)
export const put = http.put.bind(http)
export const del = http.delete.bind(http)

export default http
