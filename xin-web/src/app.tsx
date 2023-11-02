// 运行时配置
import type {RunTimeLayoutConfig, RuntimeConfig} from '@umijs/max';
import defaultConfig from './utils/request';
import {MenuDataItem, PageLoading} from '@ant-design/pro-components';
import Footer from '@/components/Footer';
import './index.less';
import React, { lazy } from 'react';
import { appSettings,adminSettings } from "../config/defaultSettings";
import {GetAdminInfo} from '@/services/admin';
import {history, Navigate} from '@umijs/max';
import fixMenuItemIcon from "@/utils/menuDataRender";
import RightRender from "@/components/Layout/RightRender";
import { index } from '@/services/api'
import { getUserInfo } from '@/services/api/user';
import Access from '@/components/Access';

export async function getInitialState(): Promise<initialStateType> {
  // 记录当前应用
  if(!localStorage.getItem('app') || !localStorage.getItem('token')){
    localStorage.setItem('app','app');
  }
  const fetchAdminInfo = async () => {
    const msg = await GetAdminInfo();
    return msg.data;
  };
  const fetchUserInfo = async () => {
    const msg = await getUserInfo();
    return msg.data;
  };

  const { location } = history;
  const data: initialStateType = {
    access: [],
    fetchUserInfo,
    fetchAdminInfo,
    isLogin: false,
    isAccess: false,
    drawerShow: false,
    settings: appSettings,
    app: localStorage.getItem('app')!,
    webSetting: {
      logo: 'https://file.xinadmin.cn/file/favicons.ico',
      title: 'Xin Admin'
    },
    menus: []
  }
  try{
    let indexDate = await index();
    data.webSetting = indexDate.data.web_setting
    data.menus = indexDate.data.menus
    if (location.pathname !== 'admin/login' && localStorage.getItem('token')) {
      let userInfo;
      if(data.app === 'app'){
        userInfo = await fetchUserInfo();
        data.settings = appSettings;
      }else {
        userInfo = await fetchAdminInfo();
        data.settings = adminSettings;
      }
      data.isLogin = true;
      data.isAccess = true;
      data.currentUser = userInfo.info;
      data.menus = userInfo.menus;
      data.access = userInfo.access;
    }
    return data;
  }catch (e){
    return data;
  }
}


export const layout: RunTimeLayoutConfig = ({initialState}) => {
  return {
    logo: initialState!.webSetting.logo,
    title: initialState!.webSetting.title,
    footerRender: () => <Footer/>,
    menu: {
      request: async () => {
        console.log('刷新菜单啦：',initialState!.menus)
        return initialState!.menus;
      },
    },
    menuDataRender: (menusData: MenuDataItem[]) => fixMenuItemIcon(menusData),
    onPageChange: () => {
      const { location } = history;
      if(initialState!.app === 'admin'){
        // 如果没有登录，重定向到 登录页面
        if (!initialState!.isLogin) {
          localStorage.removeItem('app')
          history.push('/admin/login');
          return;
        }
        // 首页重定向
        if (location.pathname === '/') {
          history.push('/home');
          return;
        }
      }
    },
    rightRender: (initialState) => {
      return <RightRender initialState={initialState}></RightRender>
    },
    childrenRender: (children: any) => {
      if (initialState?.loading) return <PageLoading />;
      return <Access>{children}</Access>
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
    name: '登录',
    path: 'admin/login',
    id: 'adminLogin',
    element: lazyLoad('Public/Login'),
    layout: false,
  },
  {
    name: '注册',
    path: 'reg',
    id: 'reg',
    element: lazyLoad('Public/Reg'),
    layout: false,
  },
]

export const patchClientRoutes: RuntimeConfig['patchClientRoutes'] = ({routes}) => {
  console.log('patchClientRoutes')
  if(localStorage.getItem('app') === 'admin'){
    routes.unshift({
      path: '/',
      element: <Navigate  to="/home" replace />,
    });
  }
  routes.push(...defaultRoutes)
};

export const request = {
  ...defaultConfig,
};


