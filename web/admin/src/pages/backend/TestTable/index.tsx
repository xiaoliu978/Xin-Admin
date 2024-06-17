import React from "react";
import XinTable from '@/components/XinTable'
import {ProFormColumnsAndProColumns, TableProps} from '@/components/XinTable/typings';

/**
 *  Api 接口
 */
const api = '/TestTable'

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
      valueType:'digit',
      title:'ID',
      hideInForm: true,
      dataIndex:'id',
    },
    {
      valueType:'text',
      title:'姓名',
      dataIndex:'name',
    },
    {
      valueType:'text',
      title:'标题',
      dataIndex:'title',
    },
    {
      valueType:'digit',
      title:'点赞量',
      dataIndex:'star',
    },
    {
      valueType:'text',
      title:'地址',
      dataIndex:'url',
    },
    {
      valueType:'text',
      title:'邮箱',
      dataIndex:'email',
    },
    {
      valueType:'text',
      title:'城市',
      dataIndex:'caty',
    },
    {
      valueType:'dateTime',
      title:'创建时间',
      hideInForm: true,
      dataIndex:'create_time',
    },
    {
      valueType:'dateTime',
      title:'修改时间',
      hideInForm: true,
      dataIndex:'update_time',
    },
  ]
  const tableConfig: TableProps<Data> =
  {
    tableApi: api,
    columns: columns,
    accessName: 'TestTable',
    rowSelectionShow: true,
    addShow: true,
    deleteShow: true,
    editShow: true,
    bordered: true,
    showHeader: true,
    search: {
      resetText:'重置',
      searchText:'查询',
      span: 6,
      layout:'vertical',
      filterType:'query',
    },
    optionsShow: true,
    options: {
      density: true,
      search: true,
      fullScreen: true,
      setting: true,
    },
    headerTitle: '数据表',
    tooltip: '这是tooltip',
  }

  return <XinTable<Data> {...tableConfig}/>

}

export default TestTable
