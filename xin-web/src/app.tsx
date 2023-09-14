// 运行时配置
import type {RunTimeLayoutConfig} from '@umijs/max';
import type {Settings as LayoutSettings} from '@ant-design/pro-components';
import defaultConfig from './utils/request';
import {MenuDataItem, PageLoading, SettingDrawer} from '@ant-design/pro-components';
import Footer from '@/components/Footer';
import './index.less';
import React, {lazy} from "react";
import defaultSettings from "../config/defaultSettings";
import {GetAdminInfo, Logout} from '@/services/admin';
import {history,Navigate} from '@umijs/max';
import {RuntimeConfig} from "@umijs/max";
import fixMenuItemIcon from "@/utils/menuDataRender";


// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export interface initialStateType {
  settings?: any;
  isLogin: boolean;
  isAccess: boolean;
  loading?: boolean;
  currentUser?: USER.UserInfo;
  access?: string[];
  fetchUserInfo?:  () => Promise<any>;
  menus?: {[key: string] : any};
}


export async function getInitialState(): Promise<initialStateType> {
  // 获取用户信息
  console.log('getInitialState')
  const fetchUserInfo = async () => {
    const msg = await GetAdminInfo();
    return msg.data;
  };
  // 如果不是登录页面，执行
  const { location } = history;
  const data: initialStateType = {
    access: [],
    fetchUserInfo,
    isLogin: false,
    isAccess: false,
    settings: defaultSettings as Partial<LayoutSettings>,
  }
  try {
    if (location.pathname !== '/login') {
      const userInfo = await fetchUserInfo();
      data.isLogin = true;
      data.isAccess = true;
      data.currentUser = userInfo.userinfo;
      data.menus = userInfo.menus;
      data.access = userInfo.access;
    }
    return data;
  }catch (error){
    return data;
  }
}

export const layout: RunTimeLayoutConfig = ({initialState, setInitialState}) => {
  return {
    logo: 'https://xinadmin.cn/favicons.ico',
    title: 'Xin Admin',
    footerRender: () => <Footer/>,
    menu: {
      request: async () => initialState!.menus,
    },
    menuDataRender: (menusData: MenuDataItem[]) => fixMenuItemIcon(menusData),
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState!.isLogin && location.pathname !== '/login') {
        history.push('/login');
      }
      // if(!initialState!.isAccess){
      //   TODO 权限获取之后需要刷新一下页面，不然权限不生效
      //   history.push(location.pathname);
      // }
    },
    logout: async () => {
      const res = await Logout();
      if (res.success) {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('userinfo')
        history.push('/login')
      }
    },
    avatarProps: undefined,
    childrenRender: (children: any) => {
      if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          <SettingDrawer
            disableUrlParams
            enableDarkTheme
            settings={initialState?.settings}
            onSettingChange={(settings) => {
              setInitialState((preInitialState: any) => ({
                ...preInitialState,
                settings,
              }));
            }}
          />
        </>
      );
    },
    ...initialState?.settings,
  };
};

const lazyLoad = (moduleName: string) => {
  const Module = lazy(() => import(`./pages/${moduleName}`));
  return <Module />;
};

const defaultRoutes = [
  {
    name: '表格设计',
    path: '/online/table/devise/:id',
    id: 'devise',
    element: lazyLoad('Online/Table/Devise'),
    layout: false,
  },
  {
    name: '首页',
    path: '/index',
    id: 'index',
    element: lazyLoad('Client/Index'),
    layout: false
  },
  {
    name: '登录',
    path: '/login',
    id: 'login',
    element: lazyLoad('Admin/Login'),
    layout: false,
  },
]

export const patchClientRoutes: RuntimeConfig['patchClientRoutes'] = ({routes}) => {
  console.log('patchClientRoutes')
  routes.unshift({
    path: '/',
    element: <Navigate to="/home" replace />,
  });
  routes.push(...defaultRoutes)
};

export const request = {
  ...defaultConfig,
};


