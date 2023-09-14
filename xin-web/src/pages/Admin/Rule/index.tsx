import XinTable from '@/components/XinTable'
import {ProFormColumnsAndProColumns} from '@/components/XinTable/typings';
import XinDict from "@/components/XinDict";
import {useModel} from "@umijs/max";
import {getRulePid} from "@/services/admin";
import {useEffect, useState} from "react";
import {useBoolean} from "ahooks";
import IconsItem from "@/components/XinForm/IconsItem/Index"

const api = '/adminRule';
interface ResponseAdminList {
  id?: number
  title?: string
  pid?: string
  type?: string
  key?: string
  remark?: string
  create_time?: string
  update_time?: string
}

const Table: React.FC = () => {
  const {getDictionaryData} = useModel('dictModel')
  const [parentNode,setParentNode] = useState<{value:any,label:string}[]>([])
  const [ref,setref] = useBoolean()


  // 获取父节点ID
  useEffect(() => {
    getRulePid().then(res=>{
      if(res.success){
        setParentNode(res.data.data)
      }
    })
  },[ref])


  // 父ID选择框
  const formType = ({ type }: any): any[] => {
    const pid: ProFormColumnsAndProColumns<ResponseAdminList> = {
        title: '父节点',
        dataIndex: 'pid',
        valueType: 'treeSelect',
        fieldProps: {
          options: parentNode
        },
        formItemProps: {
          rules: [
            {required: true, message: '此项为必填项'},
          ],
        },
    }
    const rule: ProFormColumnsAndProColumns<ResponseAdminList> = {
      title: '权限标识',
      dataIndex: 'key',
      valueType: 'text',
      formItemProps: {
        rules: [
          { required: true, message: '此项为必填项'},
        ],
      },
    }
    const path: ProFormColumnsAndProColumns<ResponseAdminList> = {
      title: '路由地址',
      dataIndex: 'path',
      valueType: 'text',
      tooltip: '文件系统路径，如果组件为文件夹下的index.(ts|tsx) 请省略'
    }
    const icon: ProFormColumnsAndProColumns<ResponseAdminList> = {
      title: '图标',
      dataIndex: 'icon',
      valueType: 'text',
      renderFormItem: (form,config,schema) => <IconsItem form={form} schema={schema} config={config}></IconsItem>

    }
    if(type === '0'){
      return [path,icon]
    }else if(type === '1'){
      return [pid,path]
    }else if(type === '2'){
      return [rule,pid]
    }
    return [];
  }

  const columns: ProFormColumnsAndProColumns<ResponseAdminList>[] = [
    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'radio',
      request: async () => getDictionaryData('ruleType'),
      hideInTable: true,
      formItemProps: {
        rules: [
          { required: true, message: '此项为必填项'},
        ],
      },
    },
    {
      title: '标题',
      dataIndex: 'name',
      valueType: 'text',
      formItemProps: {
        rules: [
          { required: true, message: '此项为必填项'},
        ],
      },
    },

    {
      valueType: 'dependency',
      name: ['type'],
      hideInTable: true,
      columns: formType
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'radioButton',
      request: async () => getDictionaryData('ruleType'),
      render: (_, date) => <XinDict value={date.type} dict={'ruleType'} />,
      hideInForm: true,
    },
    {
      title: '排序',
      dataIndex: 'sort',
      valueType: 'text',
      tooltip: '数字越大排序越靠后'
    },
    {
      title: '备注',
      dataIndex: 'remark',
      valueType: 'text',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'date',
      hideInForm: true,
      width: 150
    },
    {
      title: '修改时间',
      dataIndex: 'update_time',
      valueType: 'date',
      hideInForm: true,
      width: 150
    },
  ];

  return (
      <XinTable<ResponseAdminList>
        tableApi={api}
        columns={columns}
        search={false}
        addBefore={()=> setref.toggle() }
        accessName={'admin:rule'}
      />
  )

}

export default Table