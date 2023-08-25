import { listApi, deleteApi } from '@/services/table';
import {
  ActionType,
  FooterToolbar,
  ProTable,
  ProDescriptionsItemProps
} from '@ant-design/pro-components';
import { Button, message, Divider, Watermark } from 'antd';
import React, {useRef,useState} from 'react';
import { TableProps } from './typings';
import UpdateForm from './components/UpdateForm';
import CreateForm from './components/CreateForm';
import { ProTableProps } from "@ant-design/pro-components";
import {Access, useAccess} from "@umijs/max";


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
    handleUpdate,
    handleAdd,
    addBefore,
    accessName
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

  const access = useAccess();

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
    if (!selectedRows || deleteShow === false){
      message.warning('请选择需要删除的节点');
      return
    }
    let ids = selectedRows.map(x => x.id)
    deleteApi(tableApi+'/delete', { ids: ids.join() || '' }).then( res => {
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
  const defaultButton: ProDescriptionsItemProps<TableData>[] = operateShow !== false ? [
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      // @ts-ignore
      align: 'center',
      render: (_, record) => (
        <>
          {editShow === false ? null :
            <Access accessible={ accessName?access.buttonAccess(accessName+':edit'):true }>
              <UpdateForm<TableData>
                values={record}
                columns={columns}
                id={record.id}
                api={tableApi+'/edit'}
                tableRef={actionRef}
                handleUpdate={handleUpdate}
              />
            </Access>
          }
          {deleteShow === false ? null :
            <Access accessible={ accessName?access.buttonAccess(accessName+':delete'):true }>
              <Divider type="vertical" />
              <a onClick={() => { handleRemove([record]) }}>删除</a>
            </Access>
          }
          {operateRender === undefined ? null :
            <>
              <Divider type="vertical" />
              {operateRender(record)}
            </>
          }
        </>
      ),
    }
  ] : []

  /**
   * 工具栏默认渲染
   */
  const defaultToolBarRender = () => [
    addShow !== false ? (
      <Access accessible={ accessName?access.buttonAccess(accessName+':add'):true}>
        <CreateForm<TableData>
          columns = { columns }
          api={tableApi+'/add'}
          tableRef={actionRef}
          handleAdd={handleAdd}
          addBefore={addBefore}
        />
      </Access>
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
      const { data, success } = await listApi(tableApi+'/list', {
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
    rowSelection: rowSelectionShow !== false ? { onChange: (_, selectedRows) => setSelectedRows(selectedRows) } : undefined
  }

  return (
    <Watermark>
      <ProTable<TableData>
        { ...Object.assign(defaultProTableConfig, props) }
        columns={[...columns, ...defaultButton]}
      />
      {footerBar()}
    </Watermark>
  );
}

export default XinTable;
