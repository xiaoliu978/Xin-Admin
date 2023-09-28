import { initialStateType } from '@/app';
import { Avatar, Dropdown, MenuProps, Space, Button, Modal } from 'antd';
import {Logout as AdminLogout} from "@/services/admin";
import {Logout as UserLogout} from "@/services/api/user";
import {
  FullscreenExitOutlined,
  FullscreenOutlined, GithubFilled,
  LogoutOutlined, QuestionCircleOutlined, RedoOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import './index.less';
import {useModel} from "@umijs/max";
import React, { useState } from 'react';
import {SettingDrawer} from "@ant-design/pro-components";
import LoginModel from './login';
import { index } from '@/services/api';

const Right = (props: { initialState?: initialStateType}) => {
  const {initialState} = props;
  const [loginModel,setLoginModel ] = useState(false);
  const {setInitialState} = useModel('@@initialState');

  const logout =  async () => {

    if(localStorage.getItem('app') === null || localStorage.getItem('app') === 'api') {
      await UserLogout();
    }else {
      await AdminLogout()
    }
    let indexDate = await index();

    setInitialState({
      ...initialState!,
      webSetting: indexDate.data.web_setting,
      settings: indexDate.data.layout,
      menus: indexDate.data.menus,
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
         <div className={'right-group'} title={'布局设置'} onClick={() => {
           setInitialState((preInitialState) => ({
             ...preInitialState!,
             drawerShow: true
           }));
         }}>
           <SettingOutlined/>
         </div>
         <Dropdown menu={{ items }}>
           <div className={'right-group'}>
             <Avatar src={<img src={initialState!.currentUser?.avatar} alt="avatar"/>} />
           </div>
         </Dropdown>
       </Space>
       <div style={{display:'none'}}>
         <SettingDrawer
           collapse={initialState?.drawerShow}
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
       </div>
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