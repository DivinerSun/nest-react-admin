export interface ILoginParams {
  email: string
  password: string
  code: string
}

export interface ILoginResponse {
  token: string
}
