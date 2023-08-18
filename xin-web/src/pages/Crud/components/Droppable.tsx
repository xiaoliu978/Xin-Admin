import React, {useState} from 'react';
import {useDroppable} from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import {MenuOutlined} from '@ant-design/icons';
import { CSS } from '@dnd-kit/utilities';
import {Form, Input} from "antd";
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


const Droppable = () => {
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });

  const nodeList = useState([])


  const style: React.CSSProperties = {
    border: isOver? '3px dashed #ccc' : '3px dashed #fff',
    boxSizing: 'content-box',
    zIndex: -1,
    height: 'calc(100vh - 180px)',
    background: '#fff',
    borderRadius: '10px',
    padding: '10px',
    transition: 'box-shadow .25s ease',
  };
  return (
    <div ref={setNodeRef} style={style}>
      <div>
        <Form
          layout={'inline'}
        >
          <Form.Item label="字段名">
            <Input placeholder="请输入字段名" />
          </Form.Item>
          <Form.Item label="字段注释">
            <Input placeholder="请输入字段值" />
          </Form.Item>
        </Form>
        <Input addonBefore="属性值" defaultValue="mysite" />
        <Input addonBefore="字段注释" defaultValue="mysite" />
      </div>


      {
        nodeList.map((item,index) =>
          <>
            {/*<Row key={index} item={item}/>*/}
          </>
        )
      }
      {/*<Row/>*/}
    </div>
  );
}

export default Droppable;