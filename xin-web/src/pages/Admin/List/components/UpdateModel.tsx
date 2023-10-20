import {
  BetaSchemaForm
} from '@ant-design/pro-components';
import { Avatar, message, Tag } from 'antd';
import { editApi, listApi } from '@/services/admin/table';
import { ProFormColumnsAndProColumns } from '@/components/XinTable/typings';
import UploadImgItem from '@/components/XinForm/UploadImgItem';
import React from 'react';
import { useModel } from '@@/exports';
import XinDict from '@/components/XinDict';
import { UserOutlined } from '@ant-design/icons';

interface ResponseAdminList {
  id?: number
  username?: string
  nickname?: string
  avatar?: string
  email?: string
  mobile?: string
  status?: number
  group_id?: number
  sex?: number
  create_time?: string
  update_time?: string
}


const  UpdateForm = (props: {record: ResponseAdminList}) => {
  const { record } = props;
  const {getDictionaryData} = useModel('dictModel')
  const columns: ProFormColumnsAndProColumns<ResponseAdminList>[] = [
    {
      title: '昵称',
      dataIndex: 'nickname',
      valueType: 'text',
      formItemProps: { rules: [{required: true,message: '该项为必填'}] }
    },
    {
      title: '性别',
      dataIndex: 'sex',
      valueType: 'radio',
      request: async () => getDictionaryData('sex'),
      render: (_, date) => <XinDict value={date.sex} dict={'sex'} />
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      valueType: 'text',
      formItemProps: { rules: [{required: true,message: '该项为必填'}] }
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      hideInSearch: true,
      valueType: 'text',
      renderFormItem: (schema,config, form) => <UploadImgItem form={form} dataIndex={'avatar'} api={'/admin.php/system.file/upload'} ></UploadImgItem>,
      render: (_,data) => <Avatar src={data.avatar} style={{ backgroundColor: '#4ac4f4' }} icon={<UserOutlined/>} />
    },
    {
      title: '管理员分组',
      dataIndex: 'group_id',
      valueType: 'treeSelect',
      formItemProps: {
        rules: [{required: true,message: '该项为必填'}],
      },
      fieldProps: {
        fieldNames: {label: 'name',value: 'id',children: 'children'},
      },
      request: async () => {
        let res = await listApi('/adminGroup/list')
        return res.data.data
      },
      renderText: (text) => (<Tag color="processing">{text}</Tag>)
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'radioButton',
      valueEnum: {
        0: {
          text: '禁用',
          status: 'Error',
        },
        1: {
          text: '启用',
          status: 'Success',
        },
      },
      formItemProps: { rules: [{required: true,message: '该项为必填'}] }
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      valueType: 'text',
      formItemProps: { rules: [{required: true,message: '该项为必填'}] }
    },
  ];

  /**
   * 更新节点
   * @param fields
   */
  const defaultUpdate = async (fields: ResponseAdminList) => {
    const hide = message.loading('正在更新');
    return editApi('/admin/edit', Object.assign({id:record.id},fields)).then(res => {
      if (res.success) {
        message.success('更新成功！');
        return true
      }
      return false
    }).finally(()=>{
      hide()
    })
  }

  return (
    <BetaSchemaForm<ResponseAdminList>
      trigger={ <a>编辑信息</a> }
      title={'编辑管理员信息'}
      layoutType={'ModalForm'}
      rowProps={{
        gutter: [16, 16],
      }}
      colProps={{
        span: 12,
      }}
      grid={ true }
      initialValues={ record }
      onFinish={ defaultUpdate }
      columns= { columns }
    />
  )
}
export default UpdateForm;
