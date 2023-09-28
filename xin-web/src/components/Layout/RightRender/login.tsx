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
  LoginForm,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { Divider, message, Space, Tabs} from 'antd';
import type { CSSProperties } from 'react';
import React, { useState } from 'react';
import { login } from '@/services/api';

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
  const [loginType, setLoginType] = useState<USER.LoginType>('account');
  const handleSubmit = async (values: USER.UserLoginFrom) => {
    // 登录
    const msg = await login({ ...values, loginType });

    message.success('登录成功！');
    // 记录令牌
    localStorage.setItem('token',msg.data.token);
    localStorage.setItem('refresh_token',msg.data.refresh_token);
    localStorage.setItem('app','api');

    const userInfo = await initialState!.fetchUserInfo?.();
    setInitialState((init: any) => {
      return {
        ...init,
        isLogin: true,
        isAccess: true,
        currentUser: userInfo.adminInfo,
        menus: userInfo.menus,
        access: userInfo.access,
      }
    })
    const urlParams = new URL(window.location.href).searchParams;
    history.push(urlParams.get('redirect') || '/');
    return;
  };

  return (
      <LoginForm
        logo= { initialState!.webSetting.logo || "https://file.xinadmin.cn/file/favicons.ico" }
        title= { initialState!.webSetting.title || "Xin Admin" }
        subTitle={ initialState!.webSetting.subtitle || "用技术改变世界"}
        actions={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Divider plain>
              <span
                style={{ color: '#CCC', fontWeight: 'normal', fontSize: 14 }}
              >
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
              placeholder={'用户名: user'}
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
      </LoginForm>
  );
};

export default Login;