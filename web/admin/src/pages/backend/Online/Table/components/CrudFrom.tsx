import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import { BetaSchemaForm } from '@ant-design/pro-components';
import { OnlineType } from '@/pages/backend/Online/typings';
import React, { useContext, useEffect } from 'react';
import { useRef } from 'react';
import IconsItem from '@/components/XinForm/IconsItem';
import { Typography } from 'antd';
import TableConfigContext from '@/pages/backend/Online/Table/components/TableConfigContext';

const columns: ProFormColumnsType<OnlineType.CrudConfig>[] = [
  {
    valueType: 'text',
    renderFormItem: () => (
      <Typography.Title level={5} style={{ margin: 0 }}>数据库配置</Typography.Title>
    )
  },
  {
    title: '数据表名称',
    dataIndex: 'sqlTableName',
    valueType: 'text',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    fieldProps: {
      placeholder: '请输入数据表名称',
      addonBefore: 'xin-',
    },
  },
  {
    title: '数据库备注',
    dataIndex: 'sqlTableRemark',
    valueType: 'text',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
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
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    valueType: 'text',
    renderFormItem: () => (
      <Typography.Title level={5} style={{ margin: 0 }}>代码生成设置</Typography.Title>
    )
  },
  {
    title: '生成文件名',
    dataIndex: 'name',
    valueType: 'text',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '控制器目录',
    dataIndex: 'controllerPath',
    valueType: 'text',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '模型目录',
    dataIndex: 'modelPath',
    valueType: 'text',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '验证器目录',
    dataIndex: 'validatePath',
    valueType: 'text',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '前端页面目录',
    dataIndex: 'pagePath',
    valueType: 'text',
    fieldProps: {
      placeholder: '请输入数据表名称',
      addonBefore: 'src/pages/backend',
    },
  },
  {
    title: '菜单图标',
    dataIndex: 'menuIcon',
    valueType: 'text',
    renderFormItem: (form,config,schema) => <IconsItem dataIndex={form.key} form={schema} value={config.value}></IconsItem>
  }
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
      <BetaSchemaForm<OnlineType.CrudConfig>
        onValuesChange={() => setTableConfig({
          ...tableConfig,
          crudConfig: formRef.current?.getFieldsValue()
        })}
        layoutType={'Form'}
        layout={'inline'}
        grid={true}
        initialValues={{
          name: 'TableName',
          controllerPath: 'app/admin/controller',
          modelPath: 'app/admin/model',
          validatePath: 'app/admin/validate',
          pagePath: 'src/pages/backend',
        }}
        formRef={formRef}
        columns={columns}
        submitter={{render: () => <></>}}
      />
    </>
  );
};
