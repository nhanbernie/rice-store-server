export interface IUser {
  name: string
  email: string
  password: string
  tokens: Array<{
    token: string
    expiresIn: number
  }>
}
export interface ILoginRequest {
  email: string
  password: string
}
export interface ILoginResponse {
  message: string
  user: IUser
}
export interface IRegisterRequest {
  name: string
  email: string
  password: string
}
