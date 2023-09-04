// 运行时配置
import type {RunTimeLayoutConfig} from '@umijs/max';
import type {Settings as LayoutSettings} from '@ant-design/pro-components';
import defaultConfig from './utils/request';
import {SettingDrawer} from '@ant-design/pro-components';
import Footer from '@/components/Footer';
import './index.less';
import React from "react";
import logo from '@/assets/static/logo.png'
import defaultSettings from "../config/defaultSettings";
import {GetAdminInfo, getAdminRule, Logout} from '@/services/admin';
import {history} from '@umijs/max';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化


// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export interface initialStateType {
  settings?: any;
  loading?: boolean;
  currentUser?: USER.UserInfo;
  access?: string[];
  fetchUserInfo?:  () => Promise<any>;
  fetchAdminRule?: () => Promise<any>;
}

export async function getInitialState(): Promise<initialStateType> {
  // 获取用户信息
  const fetchUserInfo = async () => {
    const msg = await GetAdminInfo();
    return msg.data.userinfo;
  };
  // 获取权限
  const fetchAdminRule = async () => {
    const access = await getAdminRule();
    // TODO 权限获取之后需要刷新一下页面，不然权限不生效
    history.push(window.location.pathname);
    return access.data.access;
  }
  // 如果不是登录页面，执行
  const { location } = history;
  const data: initialStateType = {
    access: [],
    fetchUserInfo,
    fetchAdminRule,
    settings: defaultSettings as Partial<LayoutSettings>,
  }
  try {
    if (location.pathname !== '/login') {
      const currentUser = await fetchUserInfo();
      const access = await fetchAdminRule();
      data.currentUser = currentUser;
      data.access = access;
    }
    return data;
  }catch (error){
    return data;
  }
}

export const layout: RunTimeLayoutConfig = ({initialState, setInitialState}) => {
  return {
    logo,
    title: 'Xin Admin',
    footerRender: () => <Footer/>,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!localStorage.getItem('token') && location.pathname !== '/login') {
        history.push('/login');
      }
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
      // if (initialState?.loading) return <PageLoading />;
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

export const request = {
  ...defaultConfig,
};


