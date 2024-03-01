import React, { lazy } from 'react';
import { history, Navigate } from '@umijs/max';
import type { RuntimeConfig, RunTimeLayoutConfig } from '@umijs/max';
import type { MenuDataItem } from '@ant-design/pro-components';
import appList from '@/default/appList';
import defaultRoutes from '@/default/routes';
import defaultInitialState from '@/default/initialState';
import { adminSettings, appSettings } from '@/default/settings';
import { index } from '@/services/api';
import defaultConfig from '@/utils/request';
import fixMenuItemIcon from '@/utils/menuDataRender';
import Footer from '@/components/Footer';
import Access from '@/components/Access';
import XinTabs from '@/components/XinTabs';
import SettingLayout from '@/components/SettingDrawer';
import ActionsRender from '@/components/Layout/ActionsRender';
import AvatarRender from '@/components/Layout/AvatarRender';
import './app.less';


/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * 全局初始状态管理插件，允许您快速构建并在组件内获取 Umi 项目全局的初始状态
 */
export async function getInitialState(): Promise<initialStateType> {
// 记录当前应用
  if (!localStorage.getItem('app') || !localStorage.getItem('token')) {
    localStorage.setItem('app', 'app');
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

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    logo: initialState!.webSetting.logo,
    title: initialState!.webSetting.title,
    menu: { request: async () => initialState!.menus },
    appList,
    menuDataRender: (menusData: MenuDataItem[]) => fixMenuItemIcon(menusData),
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      if (initialState!.app !== 'admin') return;
      // 是否登录
      if (initialState!.isLogin) {
        // Admin 应用首页重定向
        if (location.pathname === '/') history.push('/home');
      } else {
        localStorage.removeItem('app');
        history.push('/admin/login');
      }
    },
    actionsRender: ActionsRender,
    avatarProps: {
      render: () => <AvatarRender/>,
    },
    childrenRender: (children: any) => {
      if (initialState?.app === 'admin') return <Access><SettingLayout /><XinTabs>{children}</XinTabs></Access>;
      return <Access><SettingLayout />{children}</Access>;
    },
    ...initialState?.settings,
  };
};

/**
 * @doc： https://umijs.org/docs/api/runtime-config#patchclientroutes-routes-
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
      element: <Navigate  to="/dashboard/analysis" replace />,
    });
  }
  routes.push(...defaultRoutes(lazyLoad));
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = { ...defaultConfig };
