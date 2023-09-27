import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';
import { Button, Col, Row } from 'antd';

const Footer: React.FC = () => {

  const currentYear = new Date().getFullYear();

  return (
    <>
      <Row style={{width: '100%', background: '#fff',marginTop: 120,paddingBottom: 40 ,paddingLeft: 40,paddingRight: 40}}>
        <Col xs={0} sm={1} md={1} lg={2} xl={2}></Col>
        <Col xs={24} sm={22} md={22} lg={20} xl={20}>
          <Row>
            <Col>

            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
        </Col>
        <Col xs={0} sm={1} md={1} lg={2} xl={2}></Col>
      </Row>

      <DefaultFooter
        copyright={`${currentYear} Xin Admin`}
        style={{background: '#fff'}}
        links={[
          {
            key: 'Ant Design Pro',
            title: 'Ant Design Pro',
            href: 'https://pro.ant.design',
            blankTarget: true,
          },
          {
            key: 'github',
            title: <GithubOutlined />,
            href: 'https://github.com/ant-design/ant-design-pro',
            blankTarget: true,
          },
          {
            key: 'Ant Design',
            title: 'Ant Design',
            href: 'https://ant.design',
            blankTarget: true,
          },
        ]}
      />
    </>

  );
};

export default Footer;
