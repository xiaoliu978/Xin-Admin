import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import { BetaSchemaForm } from '@ant-design/pro-components';
import React, { useContext, useEffect } from 'react';
import { useRef } from 'react';
import { Typography } from 'antd';
import TableConfigContext from '@/pages/backend/Online/Table/components/TableConfigContext';

const columns: ProFormColumnsType<OnlineType.CrudConfig>[] = [
  {
    title: '数据表名称',
    dataIndex: 'sqlTableName',
    valueType: 'text',
    fieldProps: {
      placeholder: '请输入数据表名称',
      addonBefore: 'xin-',
    },
  },
  {
    title: '数据库备注',
    dataIndex: 'sqlTableRemark',
    valueType: 'text',
  },
  {
    title: '生成文件名',
    dataIndex: 'name',
    valueType: 'text',
  },
  {
    title: '控制器目录',
    dataIndex: 'controllerPath',
    valueType: 'text',
    fieldProps: {
      placeholder: '请输入控制器路径',
      addonBefore: 'app/admin/controller/',
    },
  },
  {
    title: '模型目录',
    dataIndex: 'modelPath',
    valueType: 'text',
    fieldProps: {
      placeholder: '请输入模型路径',
      addonBefore: 'app/admin/model/',
    },
  },
  {
    title: '验证器目录',
    dataIndex: 'validatePath',
    valueType: 'text',
    fieldProps: {
      placeholder: '请输入验证器路径',
      addonBefore: 'app/admin/validate/',
    },
  },
  {
    title: '前端页面目录',
    dataIndex: 'pagePath',
    valueType: 'text',
    fieldProps: {
      placeholder: '请输入前端页面目录',
      addonBefore: 'src/pages/backend/',
    },
  },
  {
    valueType: 'switch',
    title: '开启软删除',
    dataIndex: 'autoDeletetime',
    fieldProps: {
      style: {
        width: '200px',
      },
    },
  },
];

export default () => {

  const {tableConfig,setTableConfig} = useContext(TableConfigContext);

  const formRef = useRef<ProFormInstance>()
  useEffect(() => {
    if(tableConfig) {
      formRef.current?.setFieldsValue(tableConfig.crudConfig)
    }
  },[tableConfig])

  return (
    <>
      <Typography.Title level={5} style={{ margin: '0 0 10px 0' }}>代码生成设置</Typography.Title>
      <BetaSchemaForm<OnlineType.CrudConfig>
        onValuesChange={() => setTableConfig({
          ...tableConfig,
          crudConfig: formRef.current?.getFieldsValue()
        })}
        layoutType={'Form'}
        layout={'inline'}
        colProps={{span: 8}}
        labelCol={{span: 5}}
        grid={true}
        initialValues={{
          name: 'TableName',
          controllerPath: '',
          modelPath: '',
          validatePath: '',
          pagePath: '',
        }}
        formRef={formRef}
        columns={columns}
        submitter={{render: () => <></>}}
      />
    </>
  );
};
