import { UserLogin } from '@/services/admin';
import {
  AlipayOutlined,
  LockOutlined,
  MobileOutlined,
  QqOutlined,
  TaobaoOutlined,
  UserOutlined,
  WechatOutlined,
  WeiboOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import {Button, Divider, message, Space, Tabs, theme} from 'antd';
import type { CSSProperties } from 'react';
import React, { useState } from 'react';
import { adminSettings } from '@/default/settings';

const iconStyle: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};
const iconDivStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: 40,
  width: 40,
  border: '1px solid #D4D8DD',
  borderRadius: '50%',
}


const Login: React.FC =  () => {

  const { initialState,setInitialState } = useModel('@@initialState');
  const [loading,setLoading] = useState<boolean>(false);
  const { refreshDict } = useModel('dictModel');
  const [loginType, setLoginType] = useState<USER.LoginType>('account');
  const handleSubmit = async (values: USER.UserLoginFrom) => {
    setLoading(true)
    // 登录
    const msg = await UserLogin({ ...values, loginType });
    message.success('登录成功！');
    // 记录令牌
    localStorage.setItem('token',msg.data.token);
    localStorage.setItem('refresh_token',msg.data.refresh_token);
    localStorage.setItem('app','admin');

    const userInfo = await initialState!.fetchAdminInfo?.();
    setInitialState((init: any) => {
      return {
        ...init,
        isLogin: true,
        isAccess: true,
        loading: false,
        app: 'admin',
        currentUser: userInfo.adminInfo,
        menus: userInfo.menus,
        access: userInfo.access,
        settings: adminSettings
      }
    })
    setTimeout(() => {
      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/dashboard/analysis');
    },1000)
    refreshDict();
    return;
  };

  const { token } = theme.useToken();

  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
      }}
    >
      <LoginFormPage
        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        logo= { initialState!.webSetting.logo || "https://file.xinadmin.cn/file/favicons.ico" }
        title= { initialState!.webSetting.title || "Xin Admin" }
        subTitle={ initialState!.webSetting.subtitle || "用技术改变世界"}
        loading={loading}
        activityConfig={{
          style: {
            boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
            color: token.colorTextHeading,
            borderRadius: 8,
            backgroundColor: 'rgba(255,255,255,0.30)',
            backdropFilter: 'blur(4px)',
          },
          title: '欢迎使用 Xin Admin',
          subTitle: '活动介绍说明文字',
          action: (
            <Button
              size="large"
              style={{
                borderRadius: 20,
                background: token.colorBgElevated,
                color: token.colorPrimary,
                width: 120,
              }}
            >
              去看看
            </Button>
          ),
        }}
        containerStyle={{
          backgroundColor: 'rgba(255, 255, 255,0.75)',
          backdropFilter: 'blur(4px)',
        }}
        actions={
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',}}>
            <Divider plain>
              <span style={{ fontWeight: 'normal', fontSize: 14 }}>
                其他登录方式
              </span>
            </Divider>
            <Space align="center" size={24}>
              <div style={iconDivStyle}>
                <QqOutlined style={{ ...iconStyle, color: 'back' }} />
              </div>
              <div style={iconDivStyle}>
                <WechatOutlined style={{ ...iconStyle, color: 'rgb(0,172,132)' }} />
              </div>
              <div style={iconDivStyle}>
                <AlipayOutlined style={{ ...iconStyle, color: '#1677FF' }} />
              </div>
              <div style={iconDivStyle}>
                <TaobaoOutlined style={{ ...iconStyle, color: '#FF6A10' }} />
              </div>
              <div style={iconDivStyle}>
                <WeiboOutlined style={{ ...iconStyle, color: '#333333' }} />
              </div>
            </Space>
          </div>
        }
        onFinish={async (values) => {
          await handleSubmit(values as USER.UserLoginFrom);
        }}
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey as USER.LoginType)}
          items = {[
            {
              key: 'account',
              label: '账号密码登录'
            },
            {
              key: 'phone',
              label: '手机号登录'
            }
          ]}
        >
        </Tabs>
        {loginType === 'account' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'用户名: admin'}
              rules={[{required: true, message: '请输入用户名!',},]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder={'密码: 123456'}
              rules={[{required: true, message: '请输入密码！',},]}
            />
          </>
        )}
        {loginType === 'phone' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MobileOutlined className={'prefixIcon'} />,
              }}
              name="mobile"
              placeholder={'手机号'}
              rules={[
                {
                  required: true,
                  message: '请输入手机号！',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误！',
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder={'请输入验证码'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'获取验证码'}`;
                }
                return '获取验证码';
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
              onGetCaptcha={async () => {
                message.success('获取验证码成功！验证码为：1234');
              }}
            />
          </>
        )}
        <div style={{marginBlockEnd: 24}}>
          <ProFormCheckbox noStyle name="autoLogin">自动登录</ProFormCheckbox>
          <a style={{float: 'right'}}>忘记密码</a>
        </div>
      </LoginFormPage>
    </div>
  );
};

export default Login;
