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