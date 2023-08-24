import {Button, Divider} from 'antd';
import React from 'react';
import {BetaSchemaForm, ProFormColumnsType} from '@ant-design/pro-components';
import {useModel} from "@@/exports";
import {ProFormColumnsAndProColumns} from "@/components/XinTable/typings";
import {SettingOutlined} from "@ant-design/icons";
import {OnlineType} from "@/pages/Online/typings";
function CreateForm(props: {
  itemIndex?: number;
  setColumns:  React.Dispatch<React.SetStateAction<OnlineType.ColumnsConfig[]>>;
  defaultColumns: OnlineType.ColumnsConfig[]
}){
  const {itemIndex, setColumns, defaultColumns} = props
  const {getDictionaryData} = useModel('dictModel')
  const columns:  ProFormColumnsType<OnlineType.ColumnsConfig, "text">[] = [
    {
      title: '表单类型',
      dataIndex: 'valueType',
      valueType: 'select',
      request: async () => getDictionaryData('valueType'),
    },
    {
      title: '表格 title',
      dataIndex: 'title',
      valueType: 'text',
    },
    {
      title: '权重',
      dataIndex: 'order',
      valueType: 'digit',
      colProps: {span: 4}
    },
    {
      title: '搜索中隐藏',
      dataIndex: 'hideInSearch',
      valueType: 'switch',
      colProps: {span: 4}
    },
    {
      title: '表格中隐藏',
      dataIndex: 'hideInTable',
      valueType: 'switch',
      colProps: {span: 4}
    },
    {
      title: '表单中隐藏',
      dataIndex: 'hideInForm',
      valueType: 'switch',
      colProps: {span: 4}
    },
    {
      valueType: 'text',
      colProps: {span: 24},
      renderFormItem: () => {
        return <Divider>数据库配置</Divider>
      }
    },
    {
      title: '字段类型',
      dataIndex: 'sqlType',
      valueType: 'select',
      request: async () => getDictionaryData('sqlType'),
    },
    {
      title: '字段名',
      dataIndex: 'dataIndex',
      valueType: 'text',
      colProps: {span: 6}
    },
    {
      title: '字段备注',
      dataIndex: 'remark',
      valueType: 'text',
      colProps: {span: 6}
    },
    {
      title: '字段默认值',
      dataIndex: 'defaultValue',
      valueType: 'text',
      initialValue: 'empty string',
      colProps: {span: 6}
    },
    {
      title: '是否主键',
      dataIndex: 'isKey',
      valueType: 'switch',
      initialValue: false,
      colProps: {span: 4}
    },
    {
      title: '是否为空',
      dataIndex: 'null',
      valueType: 'switch',
      initialValue: false,
      colProps: {span: 4}
    },
    {
      title: '自动递增',
      dataIndex: 'autoIncrement',
      valueType: 'switch',
      initialValue: false,
      colProps: {span: 4}
    },
    {
      title: '字段长度',
      dataIndex: 'length',
      valueType: 'digit',
      colProps: {span: 4}
    },
    {
      title: '小数点',
      dataIndex: 'decimal',
      valueType: 'digit',
      colProps: {span: 4}
    },
    {
      title: '无符号',
      dataIndex: 'unsign',
      valueType: 'switch',
      colProps: {span: 4}
    },
  ]


  return (
    <BetaSchemaForm<ProFormColumnsAndProColumns<any>>
      rowProps={{
        gutter: [16, 16],
      }}
      title={itemIndex!==undefined?'编辑':'新增'}
      trigger={itemIndex!==undefined?<SettingOutlined style={{color:'#000'}}/>:<Button style={{ width: 60 }}>{'新增'}</Button> }
      layoutType={'ModalForm'}
      colProps={{ span: 12 }}
      modalProps = {{ destroyOnClose: true }}
      initialValues={itemIndex!==undefined?defaultColumns.at(itemIndex):{}}
      grid={ true }
      columns= { columns }
      onFinish={async (formData: ProFormColumnsAndProColumns<any>)=> {
        if(itemIndex!==undefined) {
          let arr = [...defaultColumns.fill(formData, itemIndex, itemIndex + 1)].sort(function(a, b) {
            return b.order! - a.order!;
          })
          setColumns(arr)
        }else {
          let arr = [...defaultColumns,formData].sort(function(a, b) {
            return b.order! - a.order!;
          })
          setColumns(arr)
        }
        return true
      }}
    />
  );
}

export default CreateForm;


const defaultSql = {
  password: {
    remark: '密码输入框',

  }
}
