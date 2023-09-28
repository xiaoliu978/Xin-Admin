import React, {useEffect, useState} from "react";
import {Form, message, Radio, Space, Tree, TreeSelect,Typography} from "antd";
import {addGroup, getSettingGroup, querySettingPid} from "@/services/admin/system";
import {ModalForm, ProCard, ProFormText} from "@ant-design/pro-components";
import {DownOutlined, PlusOutlined} from "@ant-design/icons";
import type {TreeProps} from "antd";
import {DataNode} from "antd/es/tree";
import {Access,useAccess} from "@umijs/max";
import XinTable from "@/components/XinTable";
import {ProFormColumnsAndProColumns} from "@/components/XinTable/typings";
import {addApi} from "@/services/admin/table";
import {useModel} from "@@/exports";
const { Text } = Typography;


export default () => {
  /**
   * 新增分组表单
   */
  const [form] = Form.useForm<{key: string, title: string, pid?: number}>();
  /**
   * 设置分组
   */
  const [settingGroup, setSettingGroup] = useState<DataNode[]>([])
  /**
   * 设置Pid
   */
  const [settingPid, setSettingPid] = useState<DataNode[]>([])
  /**
   * 查询 Params
   */
  const [params,setParams] = useState<{key: string | number,group_id:number} >({key:'web',group_id: 3})
  /**
   * 设置标题
   */
  const [title,setTitle] = useState('网站设置')
  /**
   * 字典模型
   */
  const {getDictionaryData} = useModel('dictModel')

  /**
   * 设置行
   */
  const columns: ProFormColumnsAndProColumns<any>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInForm: true,
      hideInTable: true
    },
    {
      title: '设置描述',
      dataIndex: 'describe',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '设置Key',
      dataIndex: 'key',
      valueType: 'text',
    },
    // {
    //   title: '设置类型',
    //   dataIndex: 'type',
    //   hideInTable: true,
    //   valueType: 'text',
    //   request: async () => getDictionaryData('valueType'),
    // },
    {
      title: '设置用法',
      dataIndex: 'key',
      hideInForm: true,
      valueType: 'text',
      renderText: (text: string) => <Text keyboard copyable>{"get_setting('" + params.key + '.' + text + "')"}</Text>
    },
    {
      title: '设置 值',
      dataIndex: 'values',
      valueType: 'text'
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'date',
      hideInForm: true
    },
    {
      title: '修改时间',
      dataIndex: 'update_time',
      valueType: 'date',
      hideInForm: true
    },
  ];

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
      // @ts-ignore
      setParams({key: info.node.key, group_id: info.node.id})
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
      modalProps={{ destroyOnClose: true, width: 400}}
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
        <ProCard>
          <XinTable
            headerTitle={title}
            search={false}
            columns={columns}
            tableApi={'system.setting'}
            params={params}
            handleAdd={(formData) => {
              return addApi('system.setting/add', Object.assign({group_id: params.group_id},formData)).then(res=>{
                if (res.success) {
                  message.success('添加成功');
                  return true
                }
                return false
              })
            }}
          />
        </ProCard>
      </ProCard>

    </>
  )
}