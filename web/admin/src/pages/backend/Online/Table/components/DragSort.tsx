import type { ProColumns } from '@ant-design/pro-components';
import { DragSortTable } from '@ant-design/pro-components';
import { message } from 'antd';
import { OnlineType } from '@/pages/backend/Online/typings';

const columns: ProColumns[] = [
  {
    title: '排序',
    dataIndex: 'sort',
    width: 60,
    className: 'drag-visible',
  },
  {
    title: '字段名',
    dataIndex: 'dataIndex',
  },
  {
    title: '字段备注',
    dataIndex: 'title',
  }
];

export default (props: {
  defaultData: OnlineType.ColumnsConfig[];
  setColumns:  React.Dispatch<React.SetStateAction<OnlineType.ColumnsConfig[]>>;
}) => {
  const {defaultData,setColumns} = props;

  const handleDragSortEnd = (
    beforeIndex: number,
    afterIndex: number,
    newDataSource: any,
  ) => {
    console.log('排序后的数据', newDataSource);
    setColumns(newDataSource);
    message.success('修改列表排序成功');
  };

  return (
    <DragSortTable
      headerTitle={null}
      columns={columns}
      options={false}
      search={false}
      rowKey="key"
      pagination={false}
      dataSource={defaultData}
      dragSortKey="sort"
      cardProps={{
        bodyStyle: {padding: 0}
      }}
      onDragSortEnd={handleDragSortEnd}
    />
  );
};
