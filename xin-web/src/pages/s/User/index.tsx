import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, Layout, theme, Space, Avatar } from 'antd';
import headerImg from '@/assets/static/header.png';
import Index from './components';
import UserSetting from './components/UserSetting';
import SetPassword from './components/SetPassword';
import Message from './components/Message';
import { useModel } from '@umijs/max';



type MenuItem = Required<MenuProps>['items'][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const { Content, Sider } = Layout;
const items: MenuProps['items'] = [
  getItem('个人中心','index'),
  getItem('账户设置','user_setting'),
  getItem('修改密码','set_password'),
  getItem('我的消息','message'),
  // getItem('Navigation One', 'sub1', <MailOutlined />, [
  //   getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
  //   getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
  // ]),
];

const layoutContentCss: React.CSSProperties = {
  minHeight: 200,
  backgroundImage: 'url(' + headerImg + ')',
  backgroundSize: 'auto 100%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  display: 'flex',
  flexDirection: 'column-reverse',
  color: '#fff',
  fontWeight: 800,
  letterSpacing: 2
}

export default () => {
  const [selectedKey,setSelectedKey] = useState('index');
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  return (
    <Content style={{ maxWidth: 1280,width: '100%', margin: '0 auto'}}>
      <Content style={layoutContentCss}>
        <Space style={{
          backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAAAABdCAMAAADNEjtLAAABEVBMVEUDAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAACnjvHuAAAAW3RSTlMBAgMEBQYHCAkKCwwNDxAREhQVFhgZGxweHyEiJCUnKSosLS8xMjQ2ODk7PT5AQkNFR0hKTE5PUVNUVldZW1xeX2FiZGVnaGprbG5vcHFzdHV2d3h5ent8fX5/XoZ4lgAAAPVJREFUeAHt1AERADAQAiDdrX/mDyKEIAAAjGkDsOk3AAIEECCAAAEECCBAAAECCBBAgAACBBAggAABBAggQAABAggQQIAAAgQQIIAAAQQIIEAAAQIIEECAAAIEECCAAAEECAgQQIAAAgQQIIAAAQQIIEAAAQIIEECAAAIEECCAAAEECCBAAAECCBBAgAACBBAggAABBAggQAABAggQQIAAAgQQIIAAAQECCBBAgAACBBAggAABBAggQAABAggQQIAAAgQQIIAAAQQIIEAAAQIIEECAAAIEECCAAAEECCBAAAECCBBAgAACBAQIIEAAAQIseAEYdZ9sAcJDX4ICAAAAAElFTkSuQmCC)',
          width: '100%',
          paddingBottom: 20,
          paddingLeft: 20,
        }}>
          <Avatar
            size="large"
            icon={<UserOutlined />}
            src={initialState!.currentUser!.avatar}
          />
          {initialState!.currentUser!.nickname || initialState!.currentUser!.name || initialState!.currentUser!.username}
        </Space>
      </Content>
      <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
        <Sider style={{ background: colorBgContainer }} breakpoint="lg"
               collapsedWidth="0"
               onBreakpoint={(broken) => {
                 console.log(broken);
               }}
               onCollapse={(collapsed, type) => {
                 console.log(collapsed, type);
               }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['index']}
            items={items}
            selectedKeys={[selectedKey]}
            onSelect={({ key }) => {
              setSelectedKey(key)
            }}
          />
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          { selectedKey === 'index' ? <Index></Index> : null }
          { selectedKey === 'user_setting' ? <UserSetting></UserSetting> : null }
          { selectedKey === 'set_password' ? <SetPassword></SetPassword> : null }
          { selectedKey === 'message' ? <Message></Message> : null }
        </Content>
      </Layout>
    </Content>
  )
}