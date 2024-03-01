interface initialStateType {
  // 布局设置
  settings?: any;
  // 登录状态
  isLogin: boolean;
  // 权限状态
  isAccess: boolean;
  // 加载状态
  loading?: boolean;
  // 用户信息
  currentUser: USER.UserInfo;
  // 全局样式
  borderShow?: boolean;
  // 菜单设置
  drawerShow?: boolean;
  // 权限
  access: string[];
  // 异步状态
  fetchUserInfo:  () => Promise<any>;
  fetchAdminInfo:  () => Promise<any>;
  // 菜单
  menus?: Menus[];
  // 当前app
  app: string | null;
  // 其它
  webSetting: { [key: string] : any };
}

interface Menus {
  children: Menus[];
  create_time: string;
  icon: string;
  id: number;
  key: string;
  name: string;
  path: string;
  pid: number;
  remark: string;
  sort: number;
  type: string;
  locale: string;
  update_time: string;
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
