import { Avatar, Button, Dropdown, Modal } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { Logout as UserLogout } from '@/services/api/user';
import { Logout as AdminLogout } from '@/services/admin';
import { index } from '@/services/api';
import { useModel, useNavigate } from '@@/exports';
import LoginModel from '@/components/Layout/UserLoginRender';
import React, { useState } from 'react';

export default () => {
  const {initialState,setInitialState} = useModel('@@initialState');
  const logout =  async () => {
    if(!localStorage.getItem('app') || localStorage.getItem('app') === 'app') {
      await UserLogout();
    }else {
      await AdminLogout()
    }
    let indexDate = await index();
    localStorage.setItem('app','app')
    setInitialState({
      ...initialState!,
      webSetting: indexDate.data.web_setting,
      settings: indexDate.data.layout,
      menus: indexDate.data.menus,
      app: 'app'
    })
    localStorage.clear()
    location.href = '/'
  }
  let navigate = useNavigate();
  const [loginModel, setLoginModel] = useState(false);
  return (
    <>
      { initialState?.isLogin ?
        <Dropdown
          menu={{
            items: [
              {
                key: 'logout',
                icon: <LogoutOutlined />,
                label: '退出登录',
                onClick: logout,
              },
            ],
          }}
        >
          <Avatar src={initialState.currentUser?.avatar_url}/>
        </Dropdown>
        :
        <>
          <Button type={'link'} onClick={() => setLoginModel(true)}>登录</Button>
          <Button type={'link'} onClick={() => navigate('/reg')}>注册</Button>
          <Modal open={loginModel} footer={null} onCancel={() => setLoginModel(false)}>
            <LoginModel></LoginModel>
          </Modal>
        </>
      }
    </>

  )
}
