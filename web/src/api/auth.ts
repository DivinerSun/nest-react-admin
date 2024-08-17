import { ILoginParams } from '@/types/auth'
import { post } from '@/utils/request'

export const login = (data: ILoginParams) => {
  return post('/auth/login', data, { needToken: false })
}

export const logout = () => {
  return post('/auth/logout')
}
