/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！

declare namespace USER {
  interface UserLoginFrom {
    username?: string
    password?: string
    autoLogin?: boolean
    mobile?: string
    captcha?: number
    loginType?: LoginType
  }

  type MenuType = API.ResponseStructure<{
    menus: {
      name: string;
      path: string;
      component: string;
      children: any[];
      key: string;
    }[]
  }>

  type LoginType = 'phone' | 'account';

  interface UserInfo {
    id?: string
    name?: string
    nickName?: string
    email?: string
    avatar?: string
    mobile?: string
    motto?: string
    token?: string
    refresh_token?:string
  }

  type UserResult = API.ResponseStructure<{
    userinfo: UserInfo,
    access: string[]
    settings?: {[key: string] : any},
    menus?: {[key: string] : any},
  }>

  type LoginResult = API.ResponseStructure<{
    token: string
    refresh_token: string
  }>

  type ReToken = {
    data: {
      token: string
    }
    success: boolean
  }
}
