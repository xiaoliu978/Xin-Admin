import React, {useEffect, useState} from "react";
import {Menu, message, Space, Typography } from 'antd';
import {getSettingGroup} from "@/services/admin/system";
import {ProCard} from "@ant-design/pro-components";
import {Access,useAccess} from "@umijs/max";
import XinTable from "@/components/XinTable";
import {ProFormColumnsAndProColumns} from "@/components/XinTable/typings";
import {addApi} from "@/services/common/table";
import AddSettingGroup from './components/AddSettingGroup';

const { Text } = Typography;


export default () => {

  /**
   * 设置分组
   */
  const [settingGroup, setSettingGroup] = useState([])
  /**
   * 查询 Params
   */
  const [params,setParams] = useState<{ key: string | number, group_id: number }>({key:'web',group_id: 3})


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
      setSettingGroup(res.data)
    })
  },[])

  const access = useAccess();

  return (
    <>
      <ProCard split="vertical">
        <ProCard title={(
          <Space style={{lineHeight: 2}}>
            <Access accessible={access.buttonAccess('admin.group.rule')}>
              <AddSettingGroup/>
            </Access>
          </Space>
        )} colSpan="20%">
          <Menu
            onClick={(menu) => {
              let data: {key: string, id: number}[] = settingGroup?.filter((item: {key: string}) => {
                return item.key === menu.key
              })
              setParams({key: data[0].key,group_id: data[0].id})
            }}
            defaultSelectedKeys={['web']}
            mode="inline"
            items={settingGroup}
          />
        </ProCard>
        <ProCard>
          <XinTable
            headerTitle={'设置项'}
            search={false}
            columns={columns}
            tableApi={'/system.setting'}
            params={params}
            handleAdd={(formData) => {
              return addApi('/system.setting/add', Object.assign({group_id: params.group_id},formData)).then(res=>{
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
