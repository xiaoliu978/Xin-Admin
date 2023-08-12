import {Col, ConfigProvider, Row} from 'antd';
import BCard from './components/BCard';
import ACard from "./components/ACard";
import CCard from "./components/CCard";
import RcResizeObserver from "rc-resize-observer";
import {useState} from "react";
// import MiniCard from "./components/MiniCard";

const HomePage: React.FC = () => {
  // const theme = {
  //   token: {
  //     paddingSM: 0
  //   },
  // }

  const [responsive, setResponsive] = useState(false);

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 949);
      }}
    >
      <Row gutter={[16,16]}>
        <Col span={responsive?24:18}>
          <Row gutter={[16,16]}>
            <Col span={24}><ACard></ACard></Col>
            <Col span={24}><BCard></BCard></Col>
          </Row>
        </Col>
        <Col span={responsive?24:6}>
          <CCard></CCard>
        </Col>
      </Row>
    </RcResizeObserver>

    // <ConfigProvider theme={theme}>
    //     {/*<MiniCard></MiniCard>*/}
    //   {/*<ACard></ACard>*/}
    //   {/*<BCard></BCard>*/}
    // </ConfigProvider>
  );
};

export default HomePage;
