import {Button, Descriptions, Space, Form} from 'antd';

export default () => (
  <Space direction="vertical" size={50} style={{
    padding: '20px',
    display: 'flex',
    background: '#fff',
    borderRadius: '10px'
  }}>
    <Descriptions column={4} style={{ marginBlockEnd: -16 }} title="系统信息" size={"small"}>
      <Descriptions.Item label="系统">Xin Admin</Descriptions.Item>
      <Descriptions.Item label="版本号">1.0.0</Descriptions.Item>
      <Descriptions.Item label="最后更新时间">2023-08-27</Descriptions.Item>
      <Descriptions.Item label="官网地址">
        <Button type={'link'} href="https://xinadmin.cn" size={'small'} target="_blank" >https://xinadmin.cn</Button>
      </Descriptions.Item>
      <Descriptions.Item label="系统描述">Xin Admin 是一款开源快速构建全栈中后台应用的快速开发框架</Descriptions.Item>
    </Descriptions>
    <Form>
      <Form.Item label="站点名称"></Form.Item>
      <Form.Item label="备案号"></Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
    </Form>
  </Space>
);