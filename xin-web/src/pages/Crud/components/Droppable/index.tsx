import React, {useState} from 'react';
import {useDroppable} from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import {MenuOutlined, SettingOutlined} from '@ant-design/icons';
import { CSS } from '@dnd-kit/utilities';
import {Form, Input} from "antd";
import './index.less'
import {ProFormColumnsAndProColumns} from "@/components/XinTable/typings";
import {Access} from "@@/exports";
import XinTable from "@/components/XinTable";

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'key': number;
  item: any;
}

const Row = ({ key , item }: RowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: key,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  return (
    <div>
      <Input addonBefore="属性值" addonAfter=".com" defaultValue="mysite" />
      <tr ref={setNodeRef} style={style} {...attributes}>
        {React.Children.map(children, (child) => {
          if ((child as React.ReactElement).key === 'sort') {
            return React.cloneElement(child as React.ReactElement, {
              children: (
                <MenuOutlined
                  ref={setActivatorNodeRef}
                  style={{ touchAction: 'none', cursor: 'move' }}
                  {...listeners}
                />
              ),
            });
          }
          return child;
        })}
      </tr>
    </div>

  );
};

interface Data {[key:string]: any}

const Droppable = () => {
  const {isOver, setNodeRef} = useDroppable({id: 'droppable'});

  const style: React.CSSProperties = {
    border: isOver? '2px dashed #95de64' : '2px dashed #ccc',
  };

  const api = {}

  const [columns,setColumns] = useState<ProFormColumnsAndProColumns<Data>[]>([
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

  ])

  return (
    <div className={'crud-card'}>
      <div ref={setNodeRef} style={style} className={'curd-card-header'}>
        <Form layout={'inline'}>
          <Form.Item>
            <Input addonBefore="文本框" addonAfter={<SettingOutlined />} defaultValue="mysite" />
          </Form.Item>
        </Form>
      </div>

      <div className={'crud-card-body'}>
        <XinTable<Data>
          tableApi={api}
          columns={columns}
        />
      </div>

      {/*<Row/>*/}
    </div>
  );
}


export default Droppable;