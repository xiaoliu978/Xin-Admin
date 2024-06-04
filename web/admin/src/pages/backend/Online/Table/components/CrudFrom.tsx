import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import { BetaSchemaForm } from '@ant-design/pro-components';
import { OnlineType } from '@/pages/backend/Online/typings';
import { useEffect } from 'react';
import { useRef } from 'react';
import IconsItem from '@/components/XinForm/IconsItem';

const columns: ProFormColumnsType<OnlineType.CrudConfig>[] = [
  {
    title: '数据表名',
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
  },
  {
    title: '文件名',
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

export default (props: {
  crudConfig?: OnlineType.CrudConfig;
  setCrudConfig:  React.Dispatch<React.SetStateAction<OnlineType.CrudConfig>>;
}) => {
  const {crudConfig, setCrudConfig} = props
  const formRef = useRef<ProFormInstance>()
  useEffect(() => {
    if(crudConfig) {
      formRef.current?.setFieldsValue(crudConfig)
    }
  },[crudConfig])

  return (
    <>
      <BetaSchemaForm<OnlineType.CrudConfig>
        onValuesChange={() => setCrudConfig(formRef.current?.getFieldsValue())}
        layoutType={'Form'}
        layout={'horizontal'}
        initialValues={{
          name: 'TableName',
          controllerPath: 'app/admin/controller',
          modelPath: 'app/admin/model',
          validatePath: 'app/admin/validate',
          pagePath: 'src/pages/backend',
        }}
        formRef={formRef}
        onFinish={async (values) => {
          console.log(values);
        }}
        columns={columns}
        submitter={{render: () => <></>}}
      />
    </>
  );
};
