import {ProFormColumnsAndProColumns} from "@/components/XinTable/typings";
import XinTable from "@/components/XinTable";
import {Link} from '@umijs/max';
interface Data {
  table_id: number
  table_name: string
  update_time: string
  create_time: string
}

const api = {
  list: '/online.online_table/list',
  add: '/online.online_table/add',
  edit: '/online.online_table/edit',
  delete: '/online.online_table/delete'
}

const OnlineTable = () => {
  const columns: ProFormColumnsAndProColumns<Data>[] = [
    {
      title: 'ID',
      dataIndex: 'table_id',
      hideInForm: true
    },
    {
      title: '表格名称',
      dataIndex: 'table_name',
      valueType: 'text',
    },
    {
      title: '描述',
      dataIndex: 'describe',
      valueType: 'text',
      hideInSearch: true
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'date',
      hideInForm: true
    },
    {
      title: '修改时间',
      dataIndex: 'update_time',
      valueType: 'date',
      hideInForm: true
    },
  ];
  return (
    <>
      <XinTable<Data>
        tableApi={api}
        columns={columns}
        operateRender = { (record: Data) => {
          return (
            <Link to={'/online/table/devise/'+record.table_id} target="_blank">设计页面</Link>
          )
        }}
      />
    </>
  )

}


export default OnlineTable