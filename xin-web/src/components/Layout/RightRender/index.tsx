import { Avatar, Dropdown, MenuProps, Space, Button, Modal } from 'antd';
import {Logout as AdminLogout} from "@/services/admin";
import {Logout as UserLogout} from "@/services/api/user";
import {
  DownOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined, GithubFilled,
  LogoutOutlined, QuestionCircleOutlined, RedoOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import './index.less';
import {useModel} from "@umijs/max";
import React, { useState } from 'react';
import LoginModel from './login';
import { index } from '@/services/api';

const Right = (props: { initialState?: initialStateType}) => {
  const {initialState} = props;
  const [loginModel,setLoginModel ] = useState(false);
  const {setInitialState} = useModel('@@initialState');
  const [avatar , setAvatar] = useState(true);
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
      key: 'redo',
      label: (
        <Space>
          <RedoOutlined />
          刷新缓存
        </Space>
      ),
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
         <div className={'right-group'} title={'Gitee'} onClick={() => {
           window.open('https://gitee.com/xineny/xin-admin','_back')
         }}>
           <GithubFilled />
         </div>
         <div className={'right-group'} title={'帮助文档'} onClick={() => {
           window.open('https://xinadmin.cn/doc/start','_back')
         }}>
           <QuestionCircleOutlined />
         </div>
         <div className={'right-group'} title={fullscreen? '退出全屏': '全屏显示'} onClick={() => {
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
         </div>
         <Dropdown menu={{ items }}>
           <Space className={'right-group'}>
             <Avatar src={<img src={initialState!.currentUser?.avatar} alt="avatar"/>}>
               <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>U</Avatar>
             </Avatar>
             {initialState!.currentUser?.name}
             <DownOutlined />
           </Space>
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