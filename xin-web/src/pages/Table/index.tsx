import XinTable from '@/components/XinTable'
import { ProDescriptionsItemProps } from '@ant-design/pro-components';

const api = {
  list: '/admin/list',
  add : '/',
  edit: '/',
  dleete: '/'
}
const Table : React.FC = () => {
  const columns: ProDescriptionsItemProps<Table.ResponseAdminList>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      tip: 'ID是唯一的 key',
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
      valueEnum: {
        0: {
          text: '男',
          status: 'Error',
        },
        1: {
          text: '女',
          status: 'Success',
        },
      }
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
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      valueType: 'text',
    },
    {
      title: '密码',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '确认密码',
      hideInSearch: true,
      hideInTable: true,
    }
  ];
  return (
    <></>
  )

}

export default Table