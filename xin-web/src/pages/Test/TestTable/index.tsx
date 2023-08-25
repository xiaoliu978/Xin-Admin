import React from "react";
import XinTable from '@/components/XinTable'
import {ProFormColumnsAndProColumns} from '@/components/XinTable/typings';
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
    },
    {
      valueType:'text',
      title:'测试标题',
      order:98,
      dataIndex:'title',
    },
    {
      valueType:'digit',
      title:'测试数字',
      order:97,
      dataIndex:'number',
    },
    {
      valueType:'date',
      title:'测试日期',
      order:95,
      dataIndex:'date',
    },
    {
      valueType:'money',
      title:'测试金额',
      order:90,
      dataIndex:'money',
    },
    {
      valueType:'textarea',
      title:'测试文本域',
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
        [3,'其他'],
      ]),
      title:'性别',
      order:88,
      dataIndex:'sex',
    },
    {
      valueType:'checkbox',
      valueEnum: new Map([
        [1,'one'],
        [2,'two'],
        [3,'three'],
      ]),
      title:'多选框',
      order:86,
      dataIndex:'check',
    },
    {
      request: async () => getDictionaryData('sex'),
      render: (_, data) => <XinDict value={data.sex_dict} dict={'sex'} />,
      title:'测试性别字典',
      order:85,
      dataIndex:'sex_dict',
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
        [1,'one'],
        [2,'two'],
        [3,'three'],
      ]),
      title:'数据字典',
      order:74,
      dataIndex:'op',
    },
    {
      valueType:'switch',
      title:'开关',
      order:70,
      dataIndex:'switch',
    },
    {
      valueType:'dateTime',
      title:'日期时间',
      order:50,
      dataIndex:'datetime',
    },
    {
      valueType:'date',
      title:'创建时间',
      order:1,
      hideInForm: true,
      dataIndex:'create_time',
    },
    {
      valueType:'date',
      title:'修改时间',
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