import { ProFormColumnsAndProColumns } from '@/components/XinTable/typings';
import XinDict from "@/components/XinDict";
import {useModel} from "@@/exports";
import { message } from 'antd';
import UploadImgItem from "@/components/XinForm/UploadImgItem";
import { BetaSchemaForm } from '@ant-design/pro-components';
import React from 'react';
import { setUserInfo } from '@/services/api/user';
import UserLayout from '../components/UserLayout';


const Table : React.FC = () => {

  const {getDictionaryData} = useModel('dictModel')
  const {initialState} = useModel('@@initialState');


  const columns: ProFormColumnsAndProColumns<USER.UserInfo>[] = [
    {
      title: '用户名',
      dataIndex: 'username',
      valueType: 'text',
      formItemProps: { rules: [{required: true}] }
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      valueType: 'text',
      formItemProps: { rules: [{required: true}] }
    },
    {
      title: '性别',
      dataIndex: 'gender',
      valueType: 'radio',
      request: async () => getDictionaryData('sex'),
      render: (_, date) => <XinDict value={date.gender} dict={'sex'} />
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      valueType: 'text',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      valueType: 'text',
      renderFormItem: (schema,config, form) => <UploadImgItem form={form} dataIndex={'avatar'} api={'/api.php/user/upAvatar'} ></UploadImgItem>,
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      valueType: 'text',
      formItemProps: { rules: [{required: true},{}] }
    }
  ];


  return (
    <UserLayout selectedKey={'/user/userSetting'}>
      <BetaSchemaForm<USER.UserInfo>
        layoutType="Form"
        onFinish={async (values) => {
          console.log(values);
          await setUserInfo(values);
          message.success('更新成功');
        }}
        initialValues={initialState!.currentUser}
        columns={columns}
      />
    </UserLayout>

  )

}

export default Table
