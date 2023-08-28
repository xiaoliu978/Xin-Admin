import XinTable from '@/components/XinTable'
import {ProFormColumnsAndProColumns} from '@/components/XinTable/typings';
// 数据字典
// import XinDict from "@/components/XinDict";
// import {useModel} from "@umijs/max";

/**
 *  Api 接口
 */
const api = '/content.Content'

/**
 *  数据类型
 */
interface Data {
  [key: string] : any
}


/**
 * 表格渲染
 */
const Content: React.FC = () => {
  // 字典 Model
  // const {getDictionaryData} = useModel('dictModel')

  const columns: ProFormColumnsAndProColumns<Data>[] =
  [
    {
      valueType:'digit',
      title:'id',
      order:99,
      hideInForm: true,
      dataIndex:'id',
    },
    {
      valueType:'digit',
      title:'用户ID',
      order:98,
      hideInForm: true,
      dataIndex:'user_id',
    },
    {
      valueType:'text',
      title:'文章标题',
      order:97,
      dataIndex:'title',
    },
    {
      valueType:'digit',
      title:'浏览量',
      order:95,
      hideInSearch: true,
      hideInForm: true,
      dataIndex:'see',
    },
    {
      valueType:'digit',
      title:'喜欢量',
      order:90,
      hideInSearch: true,
      hideInForm: true,
      dataIndex:'like',
    },
    {
      valueType:'textarea',
      title:'文章内容',
      order:5,
      hideInSearch: true,
      hideInTable: true,
      dataIndex:'content',
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
      headerTitle={'文章列表'}
      addShow={false}
      operateShow={true}
      rowSelectionShow={false}
      editShow={true}
      deleteShow={false}
      accessName={'admin:rule'}
    />
  )

}

export default Content