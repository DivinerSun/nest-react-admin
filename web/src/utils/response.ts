import { AxiosResponse } from 'axios'
import { HttpResponseCode, Result } from './request'
import { toast } from './message'

type FunctionType<T> = (params: any) => Promise<AxiosResponse<Result<T>>>

export const handleResponse = async <T>(
  func: FunctionType<T>,
  params?: any,
): Promise<T | null> => {
  try {
    const { data } = await func(params)
    const { code, message, result } = data
    switch (code) {
      case HttpResponseCode.SUCCESS:
        return Promise.resolve(result)
      case HttpResponseCode.BAD_REQUEST:
        toast(`请求错误(${HttpResponseCode.BAD_REQUEST})`, 'error')
        return Promise.resolve(null)
      case HttpResponseCode.UNAUTHORIZED:
        toast(`请求未授权(${HttpResponseCode.UNAUTHORIZED})`, 'error')
        return Promise.resolve(null)
      case HttpResponseCode.FORBIDDEN:
        toast(`请求被拒绝(${HttpResponseCode.FORBIDDEN})`, 'error')
        return Promise.resolve(null)
      case HttpResponseCode.NOT_FOUND:
        toast(`请求地址不存在(${HttpResponseCode.NOT_FOUND})`, 'error')
        return Promise.resolve(null)
      case HttpResponseCode.ERROR:
        toast(`服务器异常(${HttpResponseCode.ERROR})`, 'error')
        return Promise.resolve(null)
      default:
        if (message) {
          toast(message, 'error')
        }
        return Promise.resolve(null)
    }
  } catch (e) {
    console.log('程序异常：', e)
    toast('请求异常', 'error')
    return Promise.resolve(null)
  }
}
