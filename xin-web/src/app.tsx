// 运行时配置
import type {RunTimeLayoutConfig} from '@umijs/max';
import type {Settings as LayoutSettings} from '@ant-design/pro-components';
import {history } from '@umijs/max';
import defaultConfig from './utils/request';
import {SettingDrawer} from '@ant-design/pro-components';
import Footer from '@/components/Footer';
import XinTabs from '@/components/XinTabs'
import './index.less';
import React from "react";
import { XinRight, Question } from "@/components/XinTitle";
import logo from '@/assets/static/logo.png'
import defaultSettings from "../config/defaultSettings";
// 登录页面配置
const loginPath = '/login';



// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
interface initialStateType {
  token?: string | null
  settings?: any
  currentUser?: {
    name?: string,
    avatar?: string
  }
}

export async function getInitialState(): Promise<initialStateType> {
  // 如果不是登录页面，执行
  const {location} = history;
  const data: initialStateType = {
    settings: defaultSettings as Partial<LayoutSettings>,
  };
  if (location.pathname !== loginPath) {
    const token = localStorage.getItem('token');
    if (!token) {
      history.push(loginPath)
    }else {
      data.token = token
      data.currentUser = {
        name: 'Xin Admin',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg'
      }
    }
  }
  return data
}


export const layout: RunTimeLayoutConfig = ({initialState, setInitialState}) => {
  return {
    logo,
    title: 'Xin Admin',
    onPageChange: () => {
      // const { location } = history;
      // // 如果没有登录，重定向到 login
      // if (!initialState?.currentUser && location.pathname !== loginPath) {
      //   history.push(loginPath);
      // }
    },
    footerRender: () => <Footer/>,
    actionsRender: () => [<Question key="doc" />],
    avatarProps: {
      src: initialState?.currentUser?.avatar,
      title: <span className="anticon">{initialState?.currentUser?.name}</span>,
      render: (_, avatarChildren) => {
        return <XinRight>{avatarChildren}</XinRight>;
      },
    },
    childrenRender: (children: any) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          <XinTabs>
            {children}
          </XinTabs>
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


