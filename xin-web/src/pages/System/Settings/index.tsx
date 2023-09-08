import {Button, Descriptions, Space, Form, ConfigProvider, Tabs, Divider, Input} from 'antd';
import type {DescriptionsProps,TabsProps} from  'antd';
import React, {useEffect, useState} from "react";
import {gitSetting} from "@/services/system";


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

const onFinish = () => {

}

const buildTabs = (data: any[]): TabsProps['items'] => {
  let setting: TabsProps['items'] = [];
  console.log(data)
  data.forEach((setTabs)=>{
    let setData = JSON.parse(setTabs.values)
    let setGroup = Object.keys(setData)
    let children: React.ReactNode = (
      <>
        {setGroup.map((item)=>{
          console.log(setData[item])
          return (
            <>
              <Divider orientation="left">{item}</Divider>
              <Form
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                autoComplete="off"
              >
                {Object.keys(setData[item]).map((setItem,key) => {
                  console.log(setItem)
                  return <Form.Item
                    label={setItem}
                    name={setItem}
                    initialValue={setData[item][setItem]}
                    key={key}
                    rules={[{ required: true, message: 'Please input your username!' }]}
                  >
                    <Input />
                  </Form.Item>
                })}
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>

            </>
          )
        })}
      </>
    )


    setting!.push({
      label: setTabs.describe,
      key: setTabs.key,
      children
    })
  })


  return setting

  // let setObject = JSON.parse(data.values)
  // let setGroup = Object.keys(setObject)
  // let children: React.ReactNode = (
  //   <>
  //     {setGroup.map((item) => {
  //       let header =  <Divider orientation="left">{}</Divider>
  //
  //       return <></>
  //     })
  //     }
  //   </>
  // )
  //
  //
  // console.log(set)
  // setting!.push({
  //   label: item.describe,
  //   key: item.key,
  //   children: children
  // })
}

export default () => {

  const [setting,setSetting] = useState<TabsProps['items']>([]);

  useEffect( ()=> {
     gitSetting().then((res)=>{
       if(res.success && res.data instanceof Array){
         setSetting(buildTabs(res.data))
       }
     })
  },[])


  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadiusLG: 0,
        },
      }}
    >
      <Space direction="vertical" size={50}>
        <Descriptions items={items} column={4} style={{ marginBlockEnd: -16 }} title="系统信息" size={"small"} bordered/>

        <Tabs
          defaultActiveKey="1"
          size={'small'}
          items={setting}
        />
      </Space>
    </ConfigProvider>
  )
}
