import {Button, Divider, Form} from 'antd';
import React, {useEffect} from 'react';
import {BetaSchemaForm, ProFormColumnsType} from '@ant-design/pro-components';
import {useModel} from "@@/exports";
import {SettingOutlined} from "@ant-design/icons";
import {OnlineType} from "@/pages/Online/typings";
import defaultSql from "../defaultSql";

function CreateForm(props: {
  itemIndex?: number;
  setColumns:  React.Dispatch<React.SetStateAction<OnlineType.ColumnsConfig[]>>;
  defaultColumns: OnlineType.ColumnsConfig[]
}){
  const {itemIndex, setColumns, defaultColumns} = props
  const {getDictionaryData} = useModel('dictModel')
  const [form] = Form.useForm()

  const  formDict = ({isDict} : {isDict: boolean}): any[] => {
    if(!isDict) return [{
      title: '数据枚举',
      dataIndex: 'enum',
      valueType: 'textarea',
      colProps: {span: 8},
      formItemProps: {
        rules: [
          {required: true, message: '此项为必填项'},
        ]
      },
    }]
    return [
      {
        title: '字典Code',
        dataIndex: 'dict',
        valueType: 'text',
        colProps: {span: 8},
        formItemProps: {
          rules: [
            {required: true, message: '此项为必填项'},
          ],
        },
      },
    ]
  }
  const formIsDict = ({valueType} : {valueType: string}): any[] => {
    if(!valueType) return []
    console.log(valueType)
    return ['select','checkbox','radio','radioButton'].includes(valueType)
      ? [
        {
          valueType: 'dependency',
          name: ['isDict'],
          columns: formDict
        },
        {
          title: '是否字典',
          dataIndex: 'isDict',
          valueType: 'switch',
          colProps: {span: 4}
        }
      ] : []
  }

  const columns:  ProFormColumnsType<OnlineType.ColumnsConfig, "text">[] = [
    {
      title: '表单类型',
      dataIndex: 'valueType',
      valueType: 'select',
      request: async () => getDictionaryData('valueType'),
      proFieldProps: {
        onChange: (value: any) => {
          if(defaultSql.hasOwnProperty(value)){
            form.setFieldsValue({
              ...form.getFieldsValue(),
              ...defaultSql[value]
            })
          }
        }
      },
      formItemProps: {
        rules: [
          {required: true, message: '此项为必填项'},
        ],
      },
      colProps: {span: 6}
    },
    {
      title: '字段索引',
      dataIndex: 'dataIndex',
      valueType: 'text',
      colProps: {span: 6},
      formItemProps: {
        rules: [
          {required: true, message: '此项为必填项'},
        ],
      },
    },
    {
      title: '表格 title',
      dataIndex: 'title',
      valueType: 'text',
      colProps: {span: 6},
      formItemProps: {
        rules: [
          {required: true, message: '此项为必填项'},
        ],
      },
    },
    {
      title: '查询方式',
      dataIndex: 'select',
      request: async () => getDictionaryData('select'),
      valueType: 'text',
      colProps: {span: 6},
      formItemProps: {
        rules: [
          {required: true, message: '此项为必填项'},
        ],
      },
    },
    {
      valueType: 'dependency',
      name: ['valueType'],
      hideInTable: true,
      columns: formIsDict
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
      title: '字段备注',
      dataIndex: 'remark',
      valueType: 'text',
      colProps: {span: 6}
    },
    {
      title: '字段默认值',
      dataIndex: 'defaultValue',
      valueType: 'text',
      initialValue: 'null',
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
      title: '不为空',
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

  const onFinish = async (formData: OnlineType.ColumnsConfig)=> {
    if(['select','checkbox','radio','radioButton'].includes(formData.valueType!)){
      if(formData.isDict){

      }else {
        let item = formData.enum!.split('\n')
        let map = new Map;
        item.forEach((str:string)=>{
          let data = str.split(':')
          map.set(data[0],data[1])
        })
        formData.valueEnum = map
      }
    }
    let arr;
    if(itemIndex !== undefined) {
      arr = [...defaultColumns.filter((item,index)=> itemIndex !== index),formData]
    }else {
      arr = [...defaultColumns,formData]
    }
    arr.sort(function(a, b) {
      return b.order! - a.order!;
    })
    setColumns(arr)
    return true
  }


  return (
    <BetaSchemaForm<OnlineType.ColumnsConfig>
      rowProps={{
        gutter: [16, 16],
      }}
      initialValues={itemIndex!==undefined?defaultColumns.at(itemIndex):{}}
      title={itemIndex!==undefined?'编辑':'新增'}
      trigger={itemIndex!==undefined?<SettingOutlined style={{color:'#000'}}/>:<Button style={{ width: 60 }}>{'新增'}</Button> }
      layoutType={'ModalForm'}
      colProps={{ span: 12 }}
      modalProps = {{ destroyOnClose: true }}
      grid={ true }
      form={form}
      columns= { columns }
      onFinish={onFinish}
    />
  );
}

export default CreateForm;



