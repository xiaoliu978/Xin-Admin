import {Button, Divider, Form, FormRule, InputNumber, message, Select} from 'antd';
import React from 'react';
import {BetaSchemaForm, ProFormColumnsType} from '@ant-design/pro-components';
import {useModel} from "@@/exports";
import {SettingOutlined} from "@ant-design/icons";
import {OnlineType} from "../../typings";
import defaultSql from "../defaultSql";
import * as verify from '@/utils/format';
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
      tooltip: 'key:label 格式，以换行分割',
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
        tooltip: '字典需要生成之后才可以看到效果，如果你有办法请提交PR',
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
          title: '是否字典',
          dataIndex: 'isDict',
          valueType: 'switch',
          colProps: {span: 4}
        },
        {
          valueType: 'dependency',
          name: ['isDict'],
          columns: formDict
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
    },
    {
      title: '字段名',
      dataIndex: 'dataIndex',
      tooltip: '作为数据库字段名和列索引',
      valueType: 'text',
      formItemProps: {
        rules: [
          {required: true, message: '此项为必填项'},
        ],
      },
    },
    {
      title: '列标题',
      dataIndex: 'title',
      valueType: 'text',
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
    },
    {
      title: '验证规则',
      dataIndex: 'validation',
      valueType: 'select',
      request: async () => getDictionaryData('validation'),
      colProps: {span: 6},
      renderFormItem: (schema, config)=>{
        return <Select
          {...config}
          mode="multiple"
        />
      },
      tooltip: '内置部分验证规则，需要自定义验证规则请看文档',
    },
    {
      title: '权重',
      dataIndex: 'order',
      valueType: 'digit',
      tooltip: '越大排行越靠前',
      initialValue: 1,
      colProps: {span: 6},
      renderFormItem: (schema, config) => {
        return <InputNumber<string>
          style={{ width: '100%' }}
          {...config}
        />
      }
    },
    {
      valueType: 'dependency',
      name: ['valueType'],
      hideInTable: true,
      columns: formIsDict
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
      title: 'Mock 模拟数据',
      dataIndex: 'mock',
      valueType: 'text',
      colProps: {span: 8},
      tooltip: <>模拟数据格式，请查看文档 <a href={'http://mockjs.com/examples.html'}  target={'_blank'}>Mock</a> </>,
      initialValue: '@string'
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
    if(formData.validation instanceof Array && formData.validation?.length > 0){
      let rules: FormRule[] = []
      formData.validation.forEach((item)=>{
        if(item in verify){
          rules.push(verify[item as keyof typeof verify])
        }else {
          message.warning('验证规则不存在')
          return false
        }
      })
      formData.formItemProps = {
        rules,
        ...formData.formItemProps
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
      title={itemIndex!==undefined?'字段编辑':'字段新增'}
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



