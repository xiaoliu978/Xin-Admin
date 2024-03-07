import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Card, Col, Menu, Row, Space } from 'antd';
import { useModel, useNavigate } from '@umijs/max';
import { FormattedMessage } from '@@/exports';

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (menus?: USER.MenuType[]): MenuItem[] => {
  let data: MenuItem[] | undefined = menus?.map((item) => {
    if (item.children) {
      let children: MenuItem[] = getItem(item.children);
      return {
        key: item.path,
        children: children,
        label: item.locale ? <FormattedMessage id={item.locale} /> : item.name
      }
    }
    return {
      key: item.path,
      label: item.locale ? <FormattedMessage id={item.locale} /> : item.name
    }
  });
  if (!data) return [];
  return data;
};

export default (props: { children: React.ReactNode, selectedKey: string }) => {
  let navigate = useNavigate();
  const { initialState } = useModel('@@initialState');
  return (
    <Row gutter={20} style={{ maxWidth: 1460, width: '100%', margin: '0 auto' }}>
      <Col flex={'300px'}>
        <Card style={{ marginTop: 20, marginBottom: 20 }}>
          <Space>
            <Avatar icon={<UserOutlined />} size={52} src={initialState!.currentUser!.avatar_url} />
            <div>
              <div>{initialState!.currentUser!.nickname || initialState!.currentUser!.name || initialState!.currentUser!.username}</div>
              <div style={{ marginTop: '10px', color: '#8a919f' }}>一个热爱开发的同学</div>
            </div>
          </Space>
        </Card>
        <Card>
          <Menu
            style={{ border: 'none' }}
            mode='inline'
            defaultSelectedKeys={['index']}
            items={getItem(initialState!.menus!.find((item) => item.key === 'user')!.children)}
            selectedKeys={[props.selectedKey]}
            onSelect={(data) => {
              navigate(data.key);
            }}
          />
        </Card>
      </Col>
      <Col flex={'auto'}>
        <Card style={{ marginTop: 20 }}>
          {props.children}
        </Card>
      </Col>
    </Row>
  );
}
