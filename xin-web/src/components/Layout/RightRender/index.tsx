import {initialStateType} from "@/app";
import {Avatar, Dropdown, MenuProps, Space} from "antd";
import {Logout} from "@/services/admin";
import {history} from "@@/core/history";
import {
  FullscreenExitOutlined,
  FullscreenOutlined, GithubFilled,
  LogoutOutlined, QuestionCircleOutlined, RedoOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import './index.less';
import {useModel} from "@umijs/max";
import React, {useState} from "react";
import {SettingDrawer} from "@ant-design/pro-components";


const Right = (props: { initialState?: initialStateType}) => {
  const {initialState} = props;

  const {setInitialState} = useModel('@@initialState');

  const logout =  async () => {
    const res = await Logout();
    if (res.success) {
      localStorage.removeItem('token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('userinfo')
      history.push('/login')
    }
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
    return <></>
  }
}

export default Right