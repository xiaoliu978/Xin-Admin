import {Button, Descriptions, ConfigProvider} from 'antd';
import type {DescriptionsProps} from  'antd';
import {PageContainer, ProCard} from "@ant-design/pro-components";

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: '系统',
    children: 'Xin Admin'
  },
  {
    key: '2',
    label: '版本号',
    children: 'v0.0.2-beta'
  },
  {
    key: '3',
    label: '最后更新时间',
    children: '2023-08-27'
  },
  {
    key: '6',
    label: 'Gitee',
    children: <Button type={'link'} href="https://gitee.com/xineny/xin-admin" size={'small'} target="_blank" >Gitee</Button>
  },
  {
    key: '4',
    label: '官网地址',
    children: <Button type={'link'} href="https://xinadmin.cn" size={'small'} target="_blank" >https://xinadmin.cn</Button>
  },
  {
    key: '7',
    label: '备用地址',
    children: <Button type={'link'} href="https://xineny.cn" size={'small'} target="_blank" >https://xineny.cn</Button>
  },
  {
    key: '5',
    label: '系统描述',
    children: 'Xin Admin 是一款开源快速构建全栈中后台应用的快速开发框架'
  }
]


export default () => {


  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadiusLG: 0,
        },
      }}
    >
      <PageContainer
        ghost
        header={{
          title: '系统信息',
          breadcrumb: {},
        }}
        token={{
          paddingBlockPageContainerContent: 40,
          paddingInlinePageContainerContent: 40,
        }}
        content={
          <Descriptions items={items} column={3} style={{ marginBlockEnd: -16 }} />
        }
      >
        <ProCard direction="column" ghost gutter={[0, 16]}>
          <ProCard style={{ height: 200 }} />
        </ProCard>
      </PageContainer>

    </ConfigProvider>
  )
}
