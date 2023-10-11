import { ProFormColumnsAndProColumns } from '@/components/XinTable/typings';
import {useModel} from "@@/exports";
import { message } from 'antd';
import { BetaSchemaForm } from '@ant-design/pro-components';
import React from 'react';
import { setPassWord } from '@/services/api/user';


const Table : React.FC = () => {

  const {initialState} = useModel('@@initialState');


  const columns: ProFormColumnsAndProColumns<USER.UpdatePassword>[] = [
    {
      title: '旧密码',
      dataIndex: 'oldPassword',
      valueType: 'password',
      formItemProps: { rules: [{required: true}] }
    },
    {
      title: '新密码',
      dataIndex: 'newPassword',
      valueType: 'password',
      formItemProps: { rules: [{required: true}] }
    },
    {
      title: '重复密码',
      dataIndex: 'rePassword',
      valueType: 'password',
      formItemProps: { rules: [
        {
          required: true,
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('newPassword') === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('重复密码不同!'));
          },
        }),
      ]}
    }
  ];

  return (
    <BetaSchemaForm<USER.UpdatePassword>
      layoutType="Form"
      onFinish={async (values) => {
        console.log(values);
        await setPassWord(values);
        message.success('更新成功');
      }}
      initialValues={initialState!.currentUser}
      columns={columns}
    />
  )

}

export default Table