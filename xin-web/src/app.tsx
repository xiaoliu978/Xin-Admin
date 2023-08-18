// 运行时配置
import type {RunTimeLayoutConfig} from '@umijs/max';
import type {ActionType, Settings as LayoutSettings} from '@ant-design/pro-components';
import defaultConfig from './utils/request';
import {SettingDrawer} from '@ant-design/pro-components';
import Footer from '@/components/Footer';
import XinTabs from '@/components/XinTabs'
import './index.less';
import React from "react";
import { XinRight, Question } from "@/components/XinTitle";
import logo from '@/assets/static/logo.png'
import defaultSettings from "../config/defaultSettings";
import {GetAdminInfo, getAdminRule} from '@/services/admin';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export interface initialStateType {
  settings?: any
  currentUser?: USER.UserInfo
  access?: string[]
}

export async function getInitialState(): Promise<initialStateType> {
  const data: initialStateType = {
    settings: defaultSettings as Partial<LayoutSettings>
  };
  let res = await GetAdminInfo()
  data.currentUser = res.data.userinfo
  let access = await getAdminRule()
  data.access = access.data.access
  console.log(data.access)
  return data
}

export const layout: RunTimeLayoutConfig = ({initialState, setInitialState}) => {
  return {
    logo,
    title: 'Xin Admin',
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


