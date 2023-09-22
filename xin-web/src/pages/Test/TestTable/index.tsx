import React from "react";
import XinTable from '@/components/XinTable'
import {ProFormColumnsAndProColumns} from '@/components/XinTable/typings';
import * as verify from '@/utils/format';

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
      title:'文本框',
      order:1,
      dataIndex:'string',
      formItemProps: {
        rules: [
          verify.verifyRequired,
        ]
      },
    },
    {
      valueType:'digit',
      title:'数字输入框',
      order:1,
      dataIndex:'int',
    },
    {
      valueType:'date',
      title:'日期',
      order:1,
      dataIndex:'date',
    },
    {
      valueType:'money',
      title:'金额输入框',
      order:1,
      dataIndex:'money',
    },
    {
      valueType:'select',
      valueEnum: new Map([
        [1,'one'],
        [2,'two'],
        [3,'three'],
      ]),
      title:'下拉框',
      order:1,
      dataIndex:'one',
    },
    {
      valueType:'checkbox',
      valueEnum: new Map([
        [1,'one'],
        [2,'two'],
        [3,'three'],
      ]),
      title:'多选框',
      order:1,
      dataIndex:'check',
    },
    {
      valueType:'radio',
      valueEnum: new Map([
        [1,'喜欢'],
        [2,'不喜欢'],
      ]),
      title:'单选框',
      order:1,
      dataIndex:'like',
    },
    {
      valueType:'radioButton',
      valueEnum: new Map([
        [1,'one'],
        [2,'two'],
        [3,'three'],
      ]),
      title:'单选按钮',
      order:1,
      dataIndex:'ccc',
    },
    {
      valueType:'textarea',
      title:'文本域',
      order:1,
      hideInTable: true,
      dataIndex:'md',
    },
    {
      valueType:'dateTime',
      title:'日期时间',
      order:1,
      dataIndex:'datetime',
    },
    {
      valueType:'switch',
      title:'开关',
      order:1,
      dataIndex:'switch',
    },
    {
      valueType:'rate',
      title:'评分',
      order:1,
      dataIndex:'rate',
    },
    {
      valueType:'createTime',
      title:'创建时间',
      order:1,
      dataIndex:'create_time',
    },
    {
      valueType:'updateTime',
      title:'更新时间',
      order:1,
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