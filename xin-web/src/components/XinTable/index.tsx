import { listApi, deleteApi } from '@/services/table';
import {
  ActionType,
  FooterToolbar,
  ProTable,
  ProDescriptionsItemProps
} from '@ant-design/pro-components';
import { Button, message, Divider, Watermark } from 'antd';
import { useRef, useState }  from 'react';
import { TableProps } from './typings';
import UpdateForm from './components/UpdateForm';
import CreateForm from './components/CreateForm';
import { ProTableProps } from "@ant-design/pro-components";


function XinTable<TableData extends Record<string, any>>(props: TableProps<TableData>) {
  const {
    tableApi,
    columns,
    addShow,
    deleteShow,
    editShow ,
    searchConfig,
    rowSelectionShow,
    operateRender,
    toolBarRender,
    operateShow,
    tableConfig = {},
    handleUpdate,
    handleAdd
  } = props;

  /**
   * 表单全部数据
   */
  const [dataSource, setDataSource] = useState<TableData[]>([]);
  /**
   * 表格实例  REF
   */
  const actionRef = useRef<ActionType>();
  /**
   * 多选状态
   */
  const [selectedRowsState, setSelectedRows] = useState<TableData[]>([]);
  /**
   *  节点展开所有
   */
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  /**
   * 表格所有节点的Key
   */
  const [allKeys, setAllKeys] = useState([]);

  /**
   * 递归收集所有 Key
   * @param data
   */
  const collectKeys = (data: TableData[]) => {
    let keys: any = [];
    data.forEach((item) => {
      keys.push(item.id);
      if (item.children) {
        keys = keys.concat(collectKeys(item.children));
      }
    });
    return keys;
  };

  /**
   *  删除节点
   * @param selectedRows
   */
  const handleRemove = async (selectedRows: TableData[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows || deleteShow === false || !tableApi.delete){
      message.warning('请选择需要删除的节点');
    }
    let ids = selectedRows.map(x => x.id)
    deleteApi(tableApi.delete, { ids: ids.join() || '' }).then( res => {
      if (res.success) {
        message.success(res.msg);
        actionRef.current?.reloadAndRest?.();
      }else {
        message.warning(res.msg);
      }
    }).finally(() => hide())
  }

  /**
   * 操作栏按钮，自定义按钮：operateRender
   */
  const defaultButton: ProDescriptionsItemProps<any>[] = operateShow !== false ? [
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          {editShow === false ? null :
            <UpdateForm<TableData>
              values={record}
              columns={columns}
              id={record.id}
              api={tableApi.edit}
              tableRef={actionRef}
              handleUpdate={handleUpdate}
            />
          }
          {deleteShow === false ? null :
            <>
              <Divider type="vertical" />
              <a onClick={() => { handleRemove([record]) }}>删除</a>
            </>
          }
          {operateRender === undefined ? null : (
            operateRender(record)
          )}
        </>
      ),
    }
  ] : []

  /**
   * 工具栏默认渲染
   */
  const defaultToolBarRender = () => [
    addShow !== false ? (
        <CreateForm<TableData>
          columns = { columns }
          api={tableApi.add}
          tableRef={actionRef}
          handleAdd={handleAdd}
        />
    ) : <></>,
    allKeys.length > dataSource.length ? (
      <>
        <Button onClick={() => setExpandedRowKeys(allKeys)}>
          展开全部
        </Button>
        <Button onClick={() => setExpandedRowKeys([])}>
          折叠全部
        </Button>
      </>
    ): <></>,
    toolBarRender
  ]

  const footerBar = () => {
    return selectedRowsState?.length > 0 && (
      <FooterToolbar
        extra={
          <div>
            已选择{' '}
            <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
            项&nbsp;&nbsp;
          </div>
        }
      >
        <Button
          danger
          onClick={async () => {
            await handleRemove(selectedRowsState);
            setSelectedRows([]);
            actionRef.current?.reloadAndRest?.();
          }}
        >
          批量删除
        </Button>
      </FooterToolbar>
    )
  }

  /**
   * 表格默认属性
   */
  const defaultProTableConfig: ProTableProps<TableData, any> = {
    headerTitle: "查询表格",
    actionRef: actionRef,
    rowKey: "id",
    search: searchConfig,
    toolBarRender: defaultToolBarRender,
    expandable: {
      expandedRowKeys: expandedRowKeys,
      onExpandedRowsChange: (expandedKeys) => { setExpandedRowKeys([...expandedKeys]) }
    },
    request: async (params, sorter, filter) => {
      const { data, success } = await listApi(tableApi.list, {
        ...params,
        sorter,
        filter,
      });
      setDataSource(data.data);
      setAllKeys(collectKeys(data.data));
      return {
        data: data?.data || [],
        success,
        total: data?.total
      };
    },
    columns: [...columns, ...defaultButton],
    rowSelection: rowSelectionShow !== false ? { onChange: (_, selectedRows) => setSelectedRows(selectedRows) } : undefined
  }

  return (
    <Watermark content="Xin Table">
      <ProTable<TableData>
        { ...Object.assign(defaultProTableConfig, tableConfig) }
      />
      {footerBar()}
    </Watermark>
  );
}

export default XinTable;
