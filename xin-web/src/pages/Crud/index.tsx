import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';

import Droppable from './components/Droppable';
import Draggable from './components/Draggable';
import {Col, Row} from "antd";

function App() {
  const [isDropped, setIsDropped] = useState(false);


  const cardStyle = {
    background: '#fff',
    paddingBottom: '10px',
    paddingTop: '10px',
    paddingRight: '10px',
    paddingLeft: '10px',
    borderRadius: '10px'
  }

  return (
    <DndContext>
      <Row justify="space-between">
        <Col span={6} style={{zIndex:1}}>
          <div style={cardStyle}>
            <Draggable/>
          </div>
        </Col>
        <Col span={11}>
          <Droppable/>
        </Col>
        <Col style={cardStyle} span={6}>
          <div style={cardStyle}>col-6</div>
        </Col>
      </Row>
    </DndContext>
  );


}

export default App