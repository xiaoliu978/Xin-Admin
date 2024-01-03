import { Avatar, Dropdown, MenuProps, Space, Button, Modal } from 'antd';
import {Logout as AdminLogout} from "@/services/admin";
import {Logout as UserLogout} from "@/services/api/user";
import {
  DownOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  LogoutOutlined, QuestionCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import './index.less';
import {useModel} from "@umijs/max";
import React, { useState } from 'react';
import LoginModel from './login';
import { index } from '@/services/api';
import {SelectLang} from "@umijs/max";
const Right = (props: { initialState?: initialStateType}) => {
  const {initialState} = props;
  const [loginModel,setLoginModel ] = useState(false);
  const {setInitialState} = useModel('@@initialState');
  const logout =  async () => {

    if(localStorage.getItem('app') === null || localStorage.getItem('app') === 'app') {
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

    localStorage.removeItem('token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('userinfo')
    localStorage.removeItem('api')
    location.href = '/'
  }

  const items: MenuProps['items'] = [
    {
      key: 'user',
      label: (
        <Space>
          <UserOutlined />
          个人中心
        </Space>
      ),
      // onClick: () => {history.push('/s/user')}
    },
    {type: 'divider',},
    {
      key: 'logout',
      label: (
        <Space>
          <LogoutOutlined />
          退出登录
        </Space>
      ),
      onClick: logout,
    },
  ];

  const [fullscreen,setFullscreen] = useState<boolean>(false);

  if(initialState!.isLogin){
    return (
     <>
       <Space>
         <Button onClick={() => { window.open('https://doc.xinadmin.cn'); }} type="text"><QuestionCircleOutlined /></Button>
         <Button type="text"><SelectLang className={'right-group'} reload={false}/></Button>
         <Button type="text" title={fullscreen? '退出全屏': '全屏显示'} onClick={() => {
           /* 获取 documentElement (<html>) 以全屏显示页面 */
           let elem = document.documentElement;
           /* 全屏查看 */
           if (document.fullscreenElement) {
             setFullscreen(false)
             document.exitFullscreen()
           } else {
             setFullscreen(true)
             elem.requestFullscreen();
           }
         }}>
           { fullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined /> }
         </Button>
         <Dropdown menu={{ items }}>
           <Button type="text">
             <Avatar icon={<UserOutlined />} size={'small'} src={initialState!.currentUser?.avatar}>
             </Avatar>
             {initialState!.currentUser?.nickname || initialState!.currentUser?.name || initialState!.currentUser?.username}
             <DownOutlined />
           </Button>
         </Dropdown>
       </Space>
     </>
    )
  }else {
    return <>
      <Button type={"link"} onClick={()=>setLoginModel(true)} >立即登录</Button>
      <Modal open={loginModel} footer={null} onCancel={()=>setLoginModel(false)}>
        <LoginModel></LoginModel>
      </Modal>
    </>
  }
}

export default Right
