// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React from 'react';
import {Avatar, Dropdown} from 'antd';
import {LogoutOutlined, QuestionCircleOutlined, UserOutlined} from '@ant-design/icons';
import {Logout} from '@/services/admin';
import {history } from '@umijs/max';

export const XinRight: React.FC = () => {
  const langMenu = {
    items: [
      {
        key: "logout",
        label: (
          <>
            <LogoutOutlined />
            退出登录
          </>
        ),
        onClick: async () => {
          const res = await Logout();
          if (res.success) {
            localStorage.removeItem('token')
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('userinfo')
            history.push('/login')
          }
        },
      },
    ],
  };

  return (
    <>
      <Dropdown menu={langMenu}>
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
      </Dropdown>
    </>
  )
}

export const Question = () => {
  return (
    <div
      style={{
        display: 'flex',
        height: 26,
      }}
      onClick={() => {
        window.open('https://pro.ant.design/docs/getting-started');
      }}
    >
      <QuestionCircleOutlined />
    </div>
  );
};
