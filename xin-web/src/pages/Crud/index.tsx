import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';

import Droppable from './components/Droppable';
import Draggable from './components/Draggable';
import {Col, Row} from "antd";

function App() {
  const [isDropped, setIsDropped] = useState(false);


  return (
    <DndContext>
      <Row gutter={16}>
        <Col span={6} style={{zIndex:1}}>
          <Draggable/>
        </Col>
        <Col span={18}>
          <Droppable/>
        </Col>
      </Row>
    </DndContext>
  );


}

export default App