import {Col, Row} from 'antd';
import BCard from './components/BCard';
import ACard from "./components/ACard";
import CCard from "./components/CCard";
import RcResizeObserver from "rc-resize-observer";
import {useState} from "react";
import { ProCard } from '@ant-design/pro-components';


const HomePage = () => {
  const [responsive, setResponsive] = useState(false);

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 949);
      }}
    >
      <Row gutter={[24,24]}>
        <Col span={responsive?24:18}>
          <Row gutter={[24,24]}>
            <Col span={24}>
              <ProCard bordered>
                <ACard></ACard>
              </ProCard>
            </Col>
            <Col span={24}>
              <ProCard bordered>
                <BCard></BCard>
              </ProCard>
            </Col>
          </Row>
        </Col>
        <Col span={responsive?24:6}>
          <ProCard bordered>
            <CCard></CCard>
          </ProCard>
        </Col>
      </Row>
    </RcResizeObserver>
  );
};

export default HomePage;
