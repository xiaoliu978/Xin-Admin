import React, {useState} from 'react';
import {Breadcrumb, ConfigProvider, Layout, Menu, MenuProps, theme} from 'antd';
import './index.less';
import header from '@/assets/static/header.png';
import {HomeOutlined,AppstoreOutlined,SettingOutlined} from "@ant-design/icons";
const { Header, Content, Footer } = Layout;


const items: MenuProps['items'] = [
  {
    label: '首页',
    key: 'index',
    icon: <HomeOutlined />,

  },
  {
    label: '文章中心',
    key: 'app',
    icon: <AppstoreOutlined />,
  },
  {
    label: '下载中心',
    key: 'SubMenu',
    icon: <SettingOutlined />,
    children: [
      {
        label: '电脑软件',
        key: 'Item 1',
      },
      {
        label: 'windows 系统',
        key: 'Item 1',
      },
      {
        label: 'app 应用',
        key: 'Item 1',
      }
    ],
  }
];

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [current, setCurrent] = useState('mail');


  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: { colorBgHeader: '#fff'}
        }
      }}
    >
      <Layout className={'index-layout'}>
        <Header className={'header'}>
          <div className="demo-logo"/>
          <Menu className={'menu'} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        </Header>
        <Content className="site-layout" style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 380, background: colorBgContainer }}>Content</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </ConfigProvider>

  );
};

export default App;