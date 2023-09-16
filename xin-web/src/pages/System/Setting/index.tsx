import React, {useEffect, useMemo, useState} from "react";
import {Form, message, Radio, Space, Tree, TreeSelect,} from "antd";
import {addGroup, getSettingGroup, querySettingPid} from "@/services/system";
import {ModalForm, ProCard, ProFormText} from "@ant-design/pro-components";
import {DownOutlined, PlusOutlined} from "@ant-design/icons";
import type {TreeProps} from "antd";
import {DataNode} from "antd/es/tree";
import {Access,useAccess} from "@umijs/max";


export default () => {

  const [form] = Form.useForm<{key: string, title: string, pid?: number}>();
  const [settingGroup, setSettingGroup] = useState<DataNode[]>([])
  const [settingPid, setSettingPid] = useState<DataNode[]>([])
  const [title,setTitle] = useState('网站设置')

  useEffect( ()=> {
    getSettingGroup().then((res)=>{
      if(res.success){
        setSettingGroup(res.data)
      }
    })
    querySettingPid().then(res=>{
      if(res.success){
        setSettingPid(res.data)
      }
    })
  },[])

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    if(typeof info.node.title === 'string'){
      setTitle(info.node.title)
    }
  };

  const access = useAccess();

  const addSettingGroup = (
    <ModalForm<{ key: string, title: string, pid?: number }>
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
        let res = await addGroup(values)
        if(res.success){
          message.success('新建成功')
          return true
        }
        return false;
      }}
    >
      <Form.Item name="type" label="类型" rules={[{required: true, message: '此项为必填项'},]}>
        <Radio.Group>
          <Radio value={1}>设置菜单</Radio>
          <Radio value={2}>设置组</Radio>
        </Radio.Group>
      </Form.Item>
      <ProFormText
        name="title"
        label="分组标题"
        tooltip="最长为 24 位"
        rules={[
          {required: true, message: '此项为必填项'},
        ]}
        placeholder="请输入标题"
      />
      <ProFormText
        name="key"
        label="分组 KEY"
        placeholder="请输入KEY"
        rules={[
          {required: true, message: '此项为必填项'},
        ]}
      />
      <Form.Item name="pid" label="上级" tooltip={'不填为最顶级'}>
        <TreeSelect
          treeData={settingPid}
          placeholder="请输入KEY"
          style={{ width: '100%' }}
          allowClear
        />
      </Form.Item>
    </ModalForm>
  )

  return (
    <>
      <ProCard split="vertical">
        <ProCard title={(
          <Space style={{lineHeight: 2}}>
            <div>配置分组</div>
            <Access accessible={access.buttonAccess('admin.group.rule')}>
              {addSettingGroup}
            </Access>
          </Space>
        )} colSpan="20%">
          <Tree
            showLine
            switcherIcon={<DownOutlined />}
            expandedKeys={['system']}
            defaultSelectedKeys={['web']}
            onSelect={onSelect}
            treeData={settingGroup}
            blockNode
          />
        </ProCard>
        <ProCard title={title} headerBordered>
          <div style={{ height: 360 }}>右侧内容</div>
        </ProCard>
      </ProCard>

    </>
  )
}