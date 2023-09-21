interface initialStateType {
  settings?: any;
  isLogin: boolean;
  isAccess: boolean;
  loading?: boolean;
  currentUser?: USER.UserInfo;
  access: string[];
  fetchUserInfo?:  () => Promise<any>;
  menus?: {[key: string] : any};
}


// 与后端约定的响应数据格式
interface ResponseStructure<T> {
  success: boolean
  data: T
  errorCode?: number
  msg?: string
  showType?: ErrorShowType
  status?: number
}
