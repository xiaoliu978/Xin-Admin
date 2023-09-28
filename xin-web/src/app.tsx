// 运行时配置
import type {RunTimeLayoutConfig} from '@umijs/max';
import defaultConfig from './utils/request';
import {MenuDataItem, PageLoading} from '@ant-design/pro-components';
import Footer from '@/components/Footer';
import './index.less';
import React, { lazy } from 'react';
import defaultSettings from "../config/defaultSettings";
import {GetAdminInfo} from '@/services/admin';
import {Access, history} from '@umijs/max';
import {RuntimeConfig} from "@umijs/max";
import fixMenuItemIcon from "@/utils/menuDataRender";
import RightRender from "@/components/Layout/RightRender";
import {Button, Result} from "antd";
import access from './access';
import { index } from '@/services/api'
import { getUserInfo } from '@/services/api/user';

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
  fetchAdminInfo?:  () => Promise<any>;
  menus?: {[key: string] : any};
  webSetting: { [key: string] : any };
  app: string;
}

export async function getInitialState(): Promise<initialStateType> {
  // 获取用户信息
  console.log('getInitialState');
  // 记录当前应用
  if(!localStorage.getItem('app')){
    localStorage.setItem('app','api');
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
    settings: defaultSettings,
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
    data.settings = indexDate.data.layout
    data.menus = indexDate.data.menus
    if (location.pathname !== 'admin/login' && localStorage.getItem('token')) {
      let userInfo;
      if(data.app === 'api'){
        userInfo = await fetchUserInfo();
      }else {
        userInfo = await fetchAdminInfo();
      }
      data.settings = userInfo.layout
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


export const layout: RunTimeLayoutConfig = ({initialState,setInitialState}) => {
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
    appList: [
      {
        icon: 'https://file.xinadmin.cn/file/favicons.ico',
        title: 'Xin Admin',
        desc: '带你探索技术的革新，享受开发的乐趣',
        url: 'https://xinadmin.cn'
      },
      {
        icon: 'https://uni.buildadmin.com/_nuxt/logo.8000aeec.png',
        title: 'Build Admin',
        desc: '使用流行技术栈快速创建商业级后台管理系统',
        url: 'https://www.buildadmin.com'
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
        title: 'Ant Design',
        desc: '杭州市较知名的 UI 设计语言',
        url: 'https://ant.design',
      },
      {
        icon: 'https://img.alicdn.com/tfs/TB1zomHwxv1gK0jSZFFXXb0sXXa-200-200.png',
        title: 'umi',
        desc: '插件化的企业级前端应用框架。',
        url: 'https://umijs.org/zh-CN/docs',
      },
      {
        icon: 'https://gw.alipayobjects.com/zos/bmw-prod/d3e3eb39-1cd7-4aa5-827c-877deced6b7e/lalxt4g3_w256_h256.png',
        title: 'dumi',
        desc: '为组件开发场景而生的文档工具',
        url: 'https://d.umijs.org/zh-CN',
      },
    ],
    menuDataRender: (menusData: MenuDataItem[]) => fixMenuItemIcon(menusData),
    onPageChange: () => {
      const { location } = history;
      if (location.pathname === 'admin/login') {
        return
      }
      // 如果没有登录，重定向到 login
      if (!initialState!.isLogin && location.pathname !== '/') {
        history.push('/');
      }
      const accessName = location.pathname.slice(1).replace('/','.');
      if(initialState!.access.includes(accessName) || access(initialState!).noAuth.includes(location.pathname)){
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
    name: '登录',
    path: 'admin/login',
    id: 'adminLogin',
    element: lazyLoad('Public/Login'),
    layout: false,
  },
]

export const patchClientRoutes: RuntimeConfig['patchClientRoutes'] = ({routes}) => {
  console.log('patchClientRoutes')
  // routes.unshift({
  //   path: '/',
  //   element: <Navigate to="/home" replace />,
  // });
  routes.push(...defaultRoutes)
};

export const request = {
  ...defaultConfig,
};


