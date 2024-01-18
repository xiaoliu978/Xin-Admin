import { appSettings } from './settings';
import { GetAdminInfo } from '@/services/admin';
import { getUserInfo } from '@/services/api/user';

const fetchAdminInfo = async () => {
  const msg = await GetAdminInfo();
  return msg.data;
};
const fetchUserInfo = async () => {
  const msg = await getUserInfo();
  return msg.data;
};

const defaultInitialState: initialStateType  = {
  access: [],
  isLogin: false,
  isAccess: false,
  drawerShow: false,
  fetchUserInfo,
  fetchAdminInfo,
  settings: appSettings,
  borderShow: true,
  app: localStorage.getItem('app'),
  webSetting: {
    logo: 'https://file.xinadmin.cn/file/favicons.ico',
    title: 'Xin Admin'
  }
}

export default defaultInitialState;
