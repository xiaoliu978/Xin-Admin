import XinTable from '@/components/XinTable'
import { ProFormColumnsAndProColumns } from '@/components/XinTable/typings';
import XinDict from "@/components/XinDict";
import {useModel} from "@@/exports";
const api = {
  list: '/admin/list',
  add : '/admin/add',
  edit: '/admin/add',
  delete: '/admin/delete'
}

interface ResponseAdminList {
  id?: number
  username?: string
  nickname?: string
  avatar?: string
  email?: string
  mobile?: string
  motto?: string
  sex?: number
  create_time?: string
  updata_time?: string
}




const Table : React.FC = () => {

  const {getDictionaryData} = useModel('global')

  const columns: ProFormColumnsAndProColumns<ResponseAdminList>[] = [
    {
      title: '用户ID',
      dataIndex: 'id',
      hideInForm: true,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      valueType: 'text',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      valueType: 'text',
      params: {
        select: 'like'
      }
    },
    {
      title: '性别',
      dataIndex: 'sex',
      valueType: 'radio',
      request: async () => getDictionaryData('sex'),
      render: (_, date) => <XinDict value={date.sex} dict={'sex'} />
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      valueType: 'text',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      hideInSearch: true,
      valueType: 'text',
      hideInForm: true
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      valueType: 'text',
    },
    {
      title: '密码',
      dataIndex: 'password',
      hideInSearch: true,
      hideInTable: true,
      fieldProps: {
        initialValue: '123'
      }
    }
  ];


  return (
      <XinTable<ResponseAdminList>
        tableApi = {api}
        columns= {columns}
        tableConfig = {{
          headerTitle: '表格属性'
        }}
      />
  )

}

export default Table