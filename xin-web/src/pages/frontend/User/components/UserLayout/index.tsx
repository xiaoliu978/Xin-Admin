import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Layout, Menu, Space, theme } from 'antd';
import headerImg from '@/assets/static/header.png';
import { useModel, useNavigate } from '@umijs/max';
import { FormattedMessage } from '@@/exports';
type MenuItem = Required<MenuProps>['items'][number];

function getItemChildren(
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


const layoutContentCss: React.CSSProperties = {
  minHeight: 200,
  backgroundImage: 'url(' + headerImg + ')',
  backgroundSize: '100% 100%',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  display: 'flex',
  flexDirection: 'column-reverse',
  color: '#fff',
  fontWeight: 800,
  letterSpacing: 2,
};

const headStyle = {
  backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAAAABdCAMAAADNEjtLAAABEVBMVEUDAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAACnjvHuAAAAW3RSTlMBAgMEBQYHCAkKCwwNDxAREhQVFhgZGxweHyEiJCUnKSosLS8xMjQ2ODk7PT5AQkNFR0hKTE5PUVNUVldZW1xeX2FiZGVnaGprbG5vcHFzdHV2d3h5ent8fX5/XoZ4lgAAAPVJREFUeAHt1AERADAQAiDdrX/mDyKEIAAAjGkDsOk3AAIEECCAAAEECCBAAAECCBBAgAACBBAggAABBAggQAABAggQQIAAAgQQIIAAAQQIIEAAAQIIEECAAAIEECCAAAEECAgQQIAAAgQQIIAAAQQIIEAAAQIIEECAAAIEECCAAAEECCBAAAECCBBAgAACBBAggAABBAggQAABAggQQIAAAgQQIIAAAQECCBBAgAACBBAggAABBAggQAABAggQQIAAAgQQIIAAAQQIIEAAAQIIEECAAAIEECCAAAEECCBAAAECCBBAgAACBAQIIEAAAQIseAEYdZ9sAcJDX4ICAAAAAElFTkSuQmCC)',
  width: '100%',
  paddingBottom: 20,
  paddingLeft: 20,
}

const getItem = (menus?: Menus[]): MenuItem[] => {
  let data:  MenuItem[] | undefined = menus?.map((item) => {
    if(item.children) {
      let children: MenuItem[] = getItem(item.children)
      return getItemChildren(item.locale?<FormattedMessage id={item.locale} />: item.name,item.path,'',children)
    }
    return getItemChildren(item.locale?<FormattedMessage id={item.locale} />: item.name,item.path)
  })
  if(!data) return []
  return data
}


export default (props: { children: React.ReactNode, selectedKey: string }) => {
  let navigate = useNavigate();
  const { token: { colorBgContainer } } = theme.useToken();
  const { initialState } = useModel('@@initialState');
  return (
    <Content style={{ maxWidth: 1460, width: '100%', margin: '0 auto' }}>
      <Content style={layoutContentCss}>
        <Space style={headStyle}>
          <Avatar icon={<UserOutlined />} src={initialState!.currentUser!.avatar} />
          {initialState!.currentUser!.nickname || initialState!.currentUser!.name || initialState!.currentUser!.username}
        </Space>
      </Content>
      <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
        <Sider style={{ background: colorBgContainer }}>
          <Menu
            mode='inline'
            defaultSelectedKeys={['index']}
            items={getItem(initialState!.menus!.find((item) => item.key === 'user')!.children)}
            selectedKeys={[props.selectedKey]}
            onSelect={({ key }) => {navigate(key);}}
          />
        </Sider>
        <Content style={{ padding: '0 24px', minHeight: 280 }}>
          {props.children}
        </Content>
      </Layout>
    </Content>
  );
}
