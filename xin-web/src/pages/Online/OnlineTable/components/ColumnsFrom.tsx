import {Button} from 'antd';
import React from 'react';
import {BetaSchemaForm, ProFormColumnsType} from '@ant-design/pro-components';
import {useModel} from "@@/exports";
import {ProFormColumnsAndProColumns} from "@/components/XinTable/typings";
import {SettingOutlined} from "@ant-design/icons";
function CreateForm(props: {
  itemIndex?: number;
  setColumns:  React.Dispatch<React.SetStateAction<ProFormColumnsAndProColumns<any>[]>>;
  defaultColumns: ProFormColumnsAndProColumns<any>[]
}){
  const {itemIndex, setColumns, defaultColumns} = props
  const {getDictionaryData} = useModel('dictModel')
  const columns:  ProFormColumnsType<ProFormColumnsAndProColumns<any>, "text">[] = [
    {
      title: '字段值',
      dataIndex: 'dataIndex',
      valueType: 'text',
    },
    {
      title: '名称',
      dataIndex: 'title',
      valueType: 'text',
    },
    {
      title: '类型',
      dataIndex: 'valueType',
      valueType: 'select',
      request: async () => getDictionaryData('valueType'),
    },
    {
      title: '搜索中隐藏',
      dataIndex: 'hideInSearch',
      valueType: 'switch'
    },
    {
      title: '表格中隐藏',
      dataIndex: 'hideInTable',
      valueType: 'switch'

    },
    {
      title: '表单中隐藏',
      dataIndex: 'hideInForm',
      valueType: 'switch'
    },
  ]


  return (
    <BetaSchemaForm<ProFormColumnsAndProColumns<any>>
      rowProps={{
        gutter: [16, 16],
      }}
      title={itemIndex!==undefined?'编辑':'新增'}
      trigger={itemIndex!==undefined?<SettingOutlined/>:<Button style={{ width: 60 }}>{'新增'}</Button> }
      layoutType={'ModalForm'}
      colProps={{
        span: 12,
      }}
      modalProps = {{ destroyOnClose: true }}
      initialValues={itemIndex!==undefined?defaultColumns.at(itemIndex):{}}
      grid={ true }
      columns= { columns }
      onFinish={async (formData: ProFormColumnsAndProColumns<any>)=> {
        console.log(formData)
        if(itemIndex!==undefined) {
          setColumns([...defaultColumns.fill(formData, itemIndex, itemIndex + 1)])
        }else {
          setColumns([...defaultColumns,formData])
        }
        return true
      }}
    />
  );
}

export default CreateForm;