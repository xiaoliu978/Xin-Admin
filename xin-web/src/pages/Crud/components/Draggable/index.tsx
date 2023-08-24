import React, {CSSProperties} from 'react';
import {useDraggable} from '@dnd-kit/core';
import {Tag, Collapse, CollapseProps, Space} from "antd";
import './index.less'

const draggingTag: React.CSSProperties = {
  appearance: 'none',
  outline: 'none',
  border: 0,
  padding: '10px 20px',
  backgroundColor: '#181a22',
  borderRadius: '6px',
  transition: 'transform .25s cubic-bezier(.18,.67,.6,1.22),box-shadow .3s ease',
  transform: 'scale(1)',
  touchAction: 'none',
}

export default function Draggable() {
  const textNode = useDraggable({
    id: 'textNode',
  });
  const numberNode = useDraggable({
    id: 'numberNode'
  });
  const textareaNode = useDraggable({
    id: 'textareaNode'
  });
  const dateNode = useDraggable({
    id: 'dateNode'
  });
  const selectNode = useDraggable({
    id: 'selectNode'
  });
  const checkboxNode = useDraggable({
    id: 'checkboxNode'
  });

  const style = (node: { transform: any }) => {
    let data: CSSProperties = {
      display: 'inline-block',
      transform: '',
      position: 'relative',
      cursor: 'move',
      zIndex: 0,
      marginBottom: '10px'
    }
    if(node.transform){
      data.transform = `translate3d(${node.transform.x}px, ${node.transform.y}px, 0)`
      data.zIndex = 999
      return data
    }else {
      return data
    }
  }

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: '常规组件',
      children: (
        <div className={'nodeClass'}>
          <div ref={textNode.setNodeRef} style={style(textNode)} {...textNode.attributes} {...textNode.listeners}>
            <Tag color="#55acee" style={draggingTag} className={'dragging-tag'}>文本框</Tag>
          </div>
          <div ref={numberNode.setNodeRef} style={style(numberNode)} {...numberNode.attributes} {...numberNode.listeners}>
            <Tag color="#55acee" style={draggingTag} className={'dragging-tag'}>数字框</Tag>
          </div>
          <div ref={textareaNode.setNodeRef} style={style(textareaNode)} {...textareaNode.attributes} {...textareaNode.listeners}>
            <Tag color="#55acee" style={draggingTag} className={'dragging-tag'}>文本域</Tag>
          </div>
          <div ref={dateNode.setNodeRef} style={style(dateNode)} {...dateNode.attributes} {...dateNode.listeners}>
            <Tag color="#55acee" style={draggingTag} className={'dragging-tag'}>日期框</Tag>
          </div>
          <div ref={selectNode.setNodeRef} style={style(selectNode)} {...selectNode.attributes} {...selectNode.listeners}>
            <Tag color="#55acee" style={draggingTag} className={'dragging-tag'}>下拉选择</Tag>
          </div>
          <div ref={checkboxNode.setNodeRef} style={style(checkboxNode)} {...checkboxNode.attributes} {...checkboxNode.listeners}>
            <Tag color="#55acee" style={draggingTag} className={'dragging-tag'}>多选框</Tag>
          </div>
        </div>
      ),
    },
  ];


  return (
    <div className={'crud-items'}>
      <Collapse defaultActiveKey={['1']} ghost items={items}/>
    </div>
  );

  // const style = transform ? {
  //   transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  // } : undefined;
  //
  //
  // return (
  //   <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
  //     {props.children}
  //   </button>
  // );
}