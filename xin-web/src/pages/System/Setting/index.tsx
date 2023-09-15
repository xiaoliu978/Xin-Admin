import React, {useEffect, useState} from "react";
import {Button, Divider, Form, Input, Space, Tree,} from "antd";
import {gitSetting} from "@/services/system";
import {ModalForm, ProCard, ProFormText, ProForm, ProFormSelect} from "@ant-design/pro-components";
import {DownOutlined, PlusOutlined} from "@ant-design/icons";
import type {TreeProps,TabsProps} from "antd";
import {DataNode} from "antd/es/tree";


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

const treeData: DataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
          {
            title: 'leaf',
            key: '0-0-0-2',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
          },
        ],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        children: [
          {
            title: 'leaf',
            key: '0-0-2-0',
          },
          {
            title: 'leaf',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
          {
            title: 'leaf',
            key: '0-0-0-2',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
          },
        ],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        children: [
          {
            title: 'leaf',
            key: '0-0-2-0',
          },
          {
            title: 'leaf',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
];

export default () => {

  const [setting,setSetting] = useState<TabsProps['items']>([]);
  useEffect( ()=> {
    gitSetting().then((res)=>{
      if(res.success && res.data instanceof Array){
        setSetting(buildTabs(res.data))
      }
    })
  },[])

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const [form] = Form.useForm<{ name: string; company: string }>();

  const groupModel = <ModalForm<{
    name: string;
    company: string;
  }>
    title="新建分组"
    trigger={<PlusOutlined />}
    form={form}
    autoFocusFirstInput
    modalProps={{
      destroyOnClose: true,
      onCancel: () => console.log('run'),
      width: 400,
    }}
    submitTimeout={2000}
    onFinish={async (values) => {
      console.log(values.name);
      return true;
    }}
  >
    <ProFormText
      name="title"
      label="分组标题"
      tooltip="最长为 24 位"
      rules={[

      ]}
      placeholder="请输入标题"
    />
    <ProFormText
      name="key"
      label="分组 KEY"
      placeholder="请输入KEY"
    />
    <ProFormSelect
      name="pid"
      label="上级ID"
      placeholder="请输入KEY"
    />
  </ModalForm>

  return (
    <>
      <ProCard split="vertical">
        <ProCard title={(
          <Space style={{lineHeight: 2}}><div style={{fontSize:20}}>配置分组</div>{groupModel}</Space>
        )} colSpan="20%">
          <Tree
            showLine
            switcherIcon={<DownOutlined />}
            defaultExpandedKeys={['0-0-0']}
            onSelect={onSelect}
            treeData={treeData}
          />
        </ProCard>
        <ProCard title="配置列表" headerBordered>
          <div style={{ height: 360 }}>右侧内容</div>
        </ProCard>
      </ProCard>

    </>
  )
}