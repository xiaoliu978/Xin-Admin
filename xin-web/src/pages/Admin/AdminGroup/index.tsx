import XinTable from '@/components/XinTable'
import { ProFormColumnsAndProColumns } from '@/components/XinTable/typings';
const api = {
  list: '/adminGroup/list',
  add : '/adminGroup/add',
  edit: '/adminGroup/add',
  delete: '/adminGroup/delete'
}

interface ResponseAdminList {
  id?: number
  username?: string
  nickname?: string
  avatar?: string
  email?: string
  mobile?: string
  motto?: string
  create_time?: string
  updata_time?: string
}

const columns: ProFormColumnsAndProColumns<ResponseAdminList>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    hideInForm: true,
  },
  {
    title: '权限名',
    dataIndex: 'name',
    valueType: 'text',
  },
  {
    title: '父ID',
    dataIndex: 'pid',
    valueType: 'text'
  },
  // {
  //   title: '权限',
  //   dataIndex: 'rules',
  //   valueType: 'text',
  //   hideInSearch: true
  // },
  {
    title: '是否启用',
    dataIndex: 'status',
    valueEnum: {
      0: {
        text: '禁用',
        status: 'Error',
      },
      1: {
        text: '启用',
        status: 'Success',
      },
    }
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
    valueType: 'date',
    hideInForm: true
  },
  {
    title: '编辑时间',
    dataIndex: 'update_time',
    valueType: 'date',
    hideInForm: true,
  },
];

const Table : React.FC = () => {
  
  return (

      <XinTable<ResponseAdminList>
        tableApi = {api}
        columns= {columns}
      />
  )

}

export default Table