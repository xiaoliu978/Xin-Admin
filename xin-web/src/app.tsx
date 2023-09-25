// 运行时配置
import type {RunTimeLayoutConfig} from '@umijs/max';
import type {Settings as LayoutSettings} from '@ant-design/pro-components';
import defaultConfig from './utils/request';
import {MenuDataItem, PageLoading} from '@ant-design/pro-components';
import Footer from '@/components/Footer';
import './index.less';
import React, {lazy} from "react";
import defaultSettings from "../config/defaultSettings";
import {GetAdminInfo, GetWebSet} from '@/services/admin';
import {Access, history, Navigate} from '@umijs/max';
import {RuntimeConfig} from "@umijs/max";
import fixMenuItemIcon from "@/utils/menuDataRender";
import RightRender from "@/components/Layout/RightRender";
import {Button, Result} from "antd";


// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export interface initialStateType {
  settings?: any;
  isLogin: boolean;
  isAccess: boolean;
  loading?: boolean;
  currentUser?: USER.UserInfo;
  drawerShow?: boolean;
  access: string[];
  fetchUserInfo?:  () => Promise<any>;
  menus?: {[key: string] : any};
  webSetting: { [key: string] : any }
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
    drawerShow: false,
    settings: defaultSettings as Partial<LayoutSettings>,
    webSetting: {
      logo: 'https://file.xinadmin.cn/file/favicons.ico',
      title: 'Xin Admin'
    }
  }
  try{
    const msg = await GetWebSet();
    data.webSetting = msg.data.webSetting;
    if (location.pathname !== '/login') {
      const userInfo = await fetchUserInfo();
      data.isLogin = true;
      data.isAccess = true;
      data.currentUser = userInfo.adminInfo;
      data.menus = userInfo.menus;
      data.access = userInfo.access;
    }
    return data;
  }catch (e){
    return data;
  }
}

export const layout: RunTimeLayoutConfig = ({initialState,setInitialState}) => {
  return {
    logo: initialState!.webSetting.logo,
    title: initialState!.webSetting.title,
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
      const accessName = location.pathname.slice(1).replace('/','.');
      if(initialState!.access.includes(accessName)){
        setInitialState((preInitialState: any) => ({
          ...preInitialState,
          isAccess: true,
        }));
      }else {
        setInitialState((preInitialState: any) => ({
          ...preInitialState,
          isAccess: false,
        }));
      }
    },
    rightRender: (initialState) => {
      return <RightRender initialState={initialState}></RightRender>
    },
    childrenRender: (children: any) => {
      if (initialState?.loading) return <PageLoading />;
      return (
        <Access accessible={initialState!.isAccess} fallback={(
          <Result
            status="403"
            title="403"
            subTitle="抱歉, 你暂时没有此页面的权限."
            extra={<Button type="primary">去首页</Button>}
          />
        )}>
          {children}
        </Access>
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


