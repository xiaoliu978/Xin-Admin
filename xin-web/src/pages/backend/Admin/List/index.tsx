import XinTable from '@/components/XinTable'
import { ProFormColumnsAndProColumns } from '@/components/XinTable/typings';
import XinDict from "@/components/XinDict";
import { useAccess, useModel } from '@@/exports';
import { Avatar, message, Popconfirm } from 'antd';
import UploadImgItem from "@/components/XinForm/UploadImgItem";
import { UserOutlined } from '@ant-design/icons';
import React, { useRef } from 'react';
import UpdateModel from './components/UpdateModel';
import UpdatePassword from './components/UpdatePassword';
import { deleteApi, listApi } from '@/services/common/table';
import { Access } from '@umijs/max';
import { ActionType } from '@ant-design/pro-components';

const api = '/admin';

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


const Table : React.FC = () => {

  const {getDictionaryData} = useModel('dictModel')

  const columns: ProFormColumnsAndProColumns<ResponseAdminList>[] = [
    {
      title: '用户ID',
      dataIndex: 'id',
      hideInForm: true,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      valueType: 'text',
      formItemProps: { rules: [{required: true,message: '该项为必填'}] }
    },
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
      }
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
    {
      title: '密码',
      dataIndex: 'password',
      valueType: 'password',
      hideInTable: true,
      hideInSearch: true,
      formItemProps: { rules: [{required: true,message: '该项为必填'}] }
    },
    {
      title: '确认密码',
      dataIndex: 'rePassword',
      valueType: 'password',
      hideInTable: true,
      hideInSearch: true,
      formItemProps: { rules: [
          {required: true,message: '该项为必填'},
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('两次输入的密码不同'));
            },
          }),
        ]
      }
    },
    {
      valueType:'date',
      title:'创建时间',
      order:1,
      hideInForm: true,
      dataIndex:'create_time',
    },
    {
      valueType:'date',
      title:'修改时间',
      hideInForm: true,
      dataIndex:'update_time',
    },
  ];

  const access = useAccess();
  const actionRef = useRef<ActionType>();
  /**
   *  删除节点
   * @param selectedRows
   */
  const handleRemove = async (selectedRows: ResponseAdminList[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows){
      message.warning('请选择需要删除的节点');
      return
    }
    let ids = selectedRows.map(x => x.id)
    deleteApi(api+'/delete', { ids: ids.join() || '' }).then( res => {
      if (res.success) {
        message.success(res.msg);
        actionRef.current?.reloadAndRest?.();
      }else {
        message.warning(res.msg);
      }
    }).finally(() => hide())
  }
  return (
      <XinTable<ResponseAdminList>
        headerTitle={'管理员列表'}
        tableApi = {api}
        columns= {columns}
        accessName={'admin.list'}
        editShow={false}
        deleteShow={false}
        actionRef={actionRef}
        operateRender={(record) => (
          <>
            <Access accessible={access.buttonAccess('admin.list.edit')}>
              <UpdateModel record={record}></UpdateModel>
            </Access>
            <Access accessible={access.buttonAccess('admin.list.updatePwd')}>
              <UpdatePassword record={record}></UpdatePassword>
            </Access>
            {record.username !== 'admin' ?
              <Access accessible={access.buttonAccess('admin.list.delete')}>
                <Popconfirm
                  title="Delete the task"
                  description="你确定要删除这条数据吗？"
                  onConfirm={() => { handleRemove([record]) }}
                  okText="确认"
                  cancelText="取消"
                >
                  <a>删除</a>
                </Popconfirm>
              </Access>
              : null
            }
          </>
        )}
      />
  )

}

export default Table