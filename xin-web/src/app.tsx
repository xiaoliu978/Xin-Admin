// 运行时配置
import React, { lazy } from 'react';
import { history, Navigate } from '@umijs/max';
import type { RunTimeLayoutConfig, RuntimeConfig } from '@umijs/max';
import { MenuDataItem, PageLoading } from '@ant-design/pro-components';
import { appSettings,adminSettings } from "../config/defaultSettings";
import defaultConfig from './utils/request';
import fixMenuItemIcon from "@/utils/menuDataRender";
import Footer from '@/components/Footer';
import Access from '@/components/Access';
import XinTabs from '@/components/XinTabs';
import RightRender from "@/components/Layout/RightRender";
import { index } from '@/services/api';
import defaultRoutes from '@/default/routes';
import appList from '@/default/appList';
import defaultInitialState from '@/default/initialState';
import './index.less';

/**
 * Document： https://umijs.org/docs/max/data-flow#%E5%85%A8%E5%B1%80%E5%88%9D%E5%A7%8B%E7%8A%B6%E6%80%81
 * 全局初始状态管理插件，允许您快速构建并在组件内获取 Umi 项目全局的初始状态
 */
export async function getInitialState(): Promise<initialStateType> {
  // 记录当前应用
  if(!localStorage.getItem('app') || !localStorage.getItem('token')){
    localStorage.setItem('app','app');
  }
  const { location } = history;
  const data: initialStateType = defaultInitialState;
  try{
    let indexDate = await index();
    data.webSetting = indexDate.data.web_setting;
    data.menus = indexDate.data.menus;
    if (location.pathname !== 'admin/login' && localStorage.getItem('token')) {
      let userInfo;
      if(data.app === 'app'){
        userInfo = await data.fetchUserInfo();
        data.settings = appSettings;
      }else {
        userInfo = await data.fetchAdminInfo();
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

/**
 * Document： https://umijs.org/docs/api/runtime-config#layout
 * Umi Js 运行时配置 修改内置布局的配置，比如配置退出登陆、自定义导航暴露的渲染区域等。
 * @param initialState
 */
export const layout: RunTimeLayoutConfig = ({initialState}) => {
  return {
    logo: initialState!.webSetting.logo,
    title: initialState!.webSetting.title,
    footerRender: () => <Footer/>,
    menu: { request: async () => initialState!.menus },
    appList,
    menuDataRender: (menusData: MenuDataItem[]) => fixMenuItemIcon(menusData),
    onPageChange: () => {
      const { location } = history;
      if(initialState!.app !== 'admin') return;
      // 是否登录
      if (initialState!.isLogin) {
        // Admin 应用首页重定向
        if (location.pathname === '/') history.push('/home');
      } else {
        localStorage.removeItem('app');
        history.push('/admin/login');
      }
    },
    rightRender: (initialState) => {
      return <RightRender initialState={initialState}></RightRender>
    },
    childrenRender: (children: any) => {
      if (initialState?.loading) return <PageLoading />;
      if (initialState?.app === 'admin') return <Access><XinTabs>{children}</XinTabs></Access>;
      return <Access>{children}</Access>;
    },
    ...initialState?.settings,
  };
};


/**
 * Document： https://umijs.org/docs/api/runtime-config#patchclientroutes-routes-
 * 修改被 react-router 渲染前的树状路由表，接收内容同 useRoutes。
 * @param routes
 */
export const patchClientRoutes: RuntimeConfig['patchClientRoutes'] = ({routes}) => {
  console.log('patchClientRoutes')
  const lazyLoad = (moduleName: string) => {
    const Module = lazy(() => import(`./pages/${moduleName}`));
    return <Module />;
  };
  if(localStorage.getItem('app') === 'admin'){
    routes.unshift({
      path: '/',
      element: <Navigate  to="/home" replace />,
    });
  }
  routes.push(...defaultRoutes(lazyLoad));
};


/**
 * 封装网络请求以及错误处理
 */
export const request = { ...defaultConfig };
