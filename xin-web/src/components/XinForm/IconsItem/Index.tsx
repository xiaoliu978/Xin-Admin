/**
 * 图标选择
 */

import * as AntdIcons from "@ant-design/icons";
import {Col, Input, Modal, Radio, Row, Tabs, TabsProps} from "antd";
import React, {useState} from "react";
import {categories} from './fields';
import { createFromIconfontCN } from '@ant-design/icons';

const allIcons: { [key: string]: any } = AntdIcons;

const icons = (theme: 'suggestion' | 'direction' | 'editor' | 'data' | 'logo') => {
  let iconFilledList = categories[theme]
    .map((iconName) => iconName + 'Filled')
    .filter((iconName) => allIcons[iconName])
  let iconOutlinedList = categories[theme]
    .map((iconName) => iconName + 'Outlined')
    .filter((iconName) => allIcons[iconName])
  return [...iconFilledList,...iconOutlinedList]
}

let IconFont = createFromIconfontCN({
  // 以下是默认值，也可以按需要指定
  scriptUrl: '//at.alicdn.com/t/c/font_4413039_4ep4ccllu9b.js',
});

const getIcon = (
  icon?: string | React.ReactNode,
  iconPrefixes: string = 'icon-',
): React.ReactNode => {
  if (typeof icon === 'string' && icon !== '') {
    // 可加入多种图标类型的兼容写法，此处省略
    if (icon.startsWith(iconPrefixes)) {
      return <IconFont type={icon} className={icon} />;
    }
  }
  return icon;
};

const items: TabsProps['items'] = [
  {
    key: 'use',
    label: '自定义图标',
    children: (
      <Row gutter={[10,10]} style={{maxHeight: 400,overflow:'auto'}}>
        {categories['use'].map((item,key)=> (
          <Col key={key}>
            <Radio.Button value={item}>{getIcon(item)}</Radio.Button>
          </Col>
        ))}
      </Row>
    )
  },
  {
    key: 'suggestion',
    label: '网站通用图标',
    children: (
      <Row gutter={[10,10]} style={{maxHeight: 400,overflow:'auto'}}>
        {icons('suggestion').map((item,key)=> (
          <Col key={key}>
            <Radio.Button value={item}>{React.createElement(allIcons[item])}</Radio.Button>
          </Col>
        ))}
      </Row>
    ),
  },
  {
    key: 'direction',
    label: '方向性图标',
    children: (
      <Row gutter={[10,10]} style={{maxHeight: 400,overflow:'auto'}}>
        {icons('direction').map((item,key)=> (
          <Col key={key}>
            <Radio.Button value={item}>{React.createElement(allIcons[item])}</Radio.Button>
          </Col>
        ))}
      </Row>
    ),
  },
  {
    key: 'editor',
    label: '编辑类图标',
    children: (
      <Row gutter={[10,10]} style={{maxHeight: 400,overflow:'auto'}}>
        {icons('editor').map((item,key)=> (
          <Col key={key}>
            <Radio.Button value={item}>{React.createElement(allIcons[item])}</Radio.Button>
          </Col>
        ))}
      </Row>
    ),
  },
  {
    key: 'data',
    label: '数据类图标',
    children: (
      <Row gutter={[10,10]} style={{maxHeight: 400,overflow:'auto'}}>
        {icons('data').map((item,key)=> (
          <Col key={key}>
            <Radio.Button value={item}>{React.createElement(allIcons[item])}</Radio.Button>
          </Col>
        ))}
      </Row>
    ),
  },
  {
    key: 'logo',
    label: '品牌和标识',
    children: (
      <Row gutter={[10,10]} style={{maxHeight: 400,overflow:'auto'}}>
        {icons('logo').map((item,key)=> (
          <Col key={key}>
            <Radio.Button value={item}>{React.createElement(allIcons[item])}</Radio.Button>
          </Col>
        ))}
      </Row>
    ),
  },
];


export default (props: {config:any,form:any,schema:any}) => {
  const {config,form,schema} = props
  const [iconShow,setIconShow] = useState<boolean>(false);
  const [formIcon,setFormIcon] = useState('');
  return (
    <>
      <Input addonAfter={ allIcons[config.value]?React.createElement(allIcons[config.value],{onClick:()=>setIconShow(true)}): <span onClick={()=>setIconShow(true)}>请选择</span> } value={config.value} />
      <Modal open={iconShow} onCancel={()=>setIconShow(false)} width={680} onOk={()=>{
        schema.setFieldValue(form.key,formIcon)
        setIconShow(false)
      }}>
        <Radio.Group optionType="button" buttonStyle="solid"  onChange={({target}) => {
          console.log(target.value)
          setFormIcon(target.value)
        }}>
          <Tabs defaultActiveKey="use" items={items} />
        </Radio.Group>
      </Modal>
    </>
  )
}
