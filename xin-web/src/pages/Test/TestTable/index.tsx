import React from "react";
import XinTable from '@/components/XinTable'
import {ProFormColumnsAndProColumns} from '@/components/XinTable/typings';
import * as verify from '@/utils/format';
import XinDict from '@/components/XinDict';import {useModel} from '@umijs/max';
/**
 *  Api 接口
 */
const api = '/test.TestTable'

/**
 *  数据类型
 */
interface Data {
  [key: string] : any
}


/**
 * 表格渲染
 */
const TestTable: React.FC = () => {
  const {getDictionaryData} = useModel('dictModel');
  const columns: ProFormColumnsAndProColumns<Data>[] =
  [
    {
      title:'主键ID',
      order:99,
      hideInForm: true,
      dataIndex:'id',
      formItemProps: {
        rules: [
          verify.verifyNumber,
        ]
      },
    },
    {
      valueType:'text',
      title:'名字',
      order:98,
      dataIndex:'title',
      formItemProps: {
        rules: [
          verify.verifyRequired,
          verify.verifyString,
        ]
      },
    },
    {
      valueType:'digit',
      title:'年龄',
      order:97,
      dataIndex:'age',
      formItemProps: {
        rules: [
          verify.verifyNumber,
          verify.verifyRequired,
        ]
      },
    },
    {
      valueType:'date',
      title:'生日',
      order:95,
      dataIndex:'barthday',
    },
    {
      valueType:'money',
      title:'余额',
      order:90,
      dataIndex:'money',
      formItemProps: {
        rules: [
          verify.verifyNumber,
        ]
      },
    },
    {
      valueType:'textarea',
      title:'签名',
      order:90,
      hideInSearch: true,
      hideInTable: true,
      dataIndex:'text',
    },
    {
      valueType:'select',
      valueEnum: new Map([
        [1,'男'],
        [2,'女'],
      ]),
      title:'性别',
      order:88,
      dataIndex:'sex',
      formItemProps: {
        rules: [
          verify.verifyRequired,
        ]
      },
    },
    {
      valueType:'checkbox',
      valueEnum: new Map([
        [1,'足球'],
        [2,'篮球'],
        [3,'游泳'],
        [4,'台球'],
        [5,'乒乓球'],
      ]),
      title:'爱好',
      order:86,
      hideInSearch: true,
      hideInTable: true,
      dataIndex:'check',
    },
    {
      request: async () => getDictionaryData('sex'),
      render: (_, data) => <XinDict value={data.sex_dict} dict={'sex'} />,
      title:'性别字典',
      order:85,
      dataIndex:'sex_dict',
      formItemProps: {
        rules: [
          verify.verifyRequired,
        ]
      },
    },
    {
      valueType:'rate',
      title:'评分',
      order:80,
      dataIndex:'rate',
    },
    {
      valueType:'radio',
      valueEnum: new Map([
        [1,'小学'],
        [2,'初中'],
        [3,'高中'],
        [4,'本科'],
        [5,'专科'],
        [6,'博士'],
      ]),
      title:'学历',
      order:74,
      dataIndex:'op',
      formItemProps: {
        rules: [
          verify.verifyRequired,
        ]
      },
    },
    {
      valueType:'switch',
      title:'禁用账户',
      order:70,
      dataIndex:'switch',
    },
    {
      valueType:'createTime',
      title:'创建时间',
      order:1,
      hideInForm: true,
      dataIndex:'create_time',
    },
    {
      valueType:'updateTime',
      title:'更新时间',
      hideInForm: true,
      dataIndex:'update_time',
    },
  ]
  return (
    <XinTable<Data>
      tableApi={api}
      columns={columns}
      headerTitle={'查询表格'}
      addShow={true}
      operateShow={true}
      rowSelectionShow={true}
      editShow={true}
      deleteShow={true}
      accessName={'admin:rule'}
    />
  )

}

export default TestTable