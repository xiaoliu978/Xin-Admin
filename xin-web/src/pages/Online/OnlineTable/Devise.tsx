import {useParams} from "@umijs/max";
import {Row, Col, Collapse, Form, Input, CollapseProps, Radio, Button, Space} from 'antd';
import XinTable from "@/components/XinTable";
import React, {useRef, useState} from "react";
import {ProFormColumnsAndProColumns} from "@/components/XinTable/typings";
import './index.less'
import {ActionType, ProTableProps} from "@ant-design/pro-components";
import ColumnsFrom from "@/pages/Online/OnlineTable/components/ColumnsFrom";
import XinDict from "@/components/XinDict";
import {DeleteFilled} from "@ant-design/icons";


const api = {
  list: '/system.dict/list',
  add: '/system.dict/add',
  edit: '/system.dict/edit',
  delete: '/system.dict/delete'
}


const Devise = () => {
  const params  = useParams();
  console.log(params.id)
  const actionRef = useRef<ActionType>();
  const [columns,setColumns] = useState<ProFormColumnsAndProColumns<any>[]>([
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'date',
      hideInForm: true,

    },
    {
      title: '修改时间',
      dataIndex: 'update_time',
      valueType: 'date',
      hideInForm: true,
      order: 1000
    },
  ]);
  const [tableConfig,setTableConfig] = useState<ProTableProps<any, any>>({})
  const [form] = Form.useForm<ProTableProps<any, any>>();
  const [addShow,setAddShow] = useState(true)
  const [editShow,setEditShow] = useState(true)
  const [deleteShow,setDeleteShow] = useState(true)
  const [operateShow,setOperateShow] = useState(true)
  const [rowSelectionShow,setRowSelectionShow] = useState(true)

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: '基本设置',
      children: (
        <Form
          layout={"horizontal"}
          form={form}
          labelAlign={'left'}
          labelCol={{span: 8}}
          wrapperCol={{ span: 14 }}
          initialValues={{
            headerTitle: '查询表格',
            search: true,
            addShow: addShow,
            operateShow: operateShow,
            editShow: editShow,
            deleteShow: deleteShow,
            rowSelectionShow: rowSelectionShow
          }}
        >
          <Form.Item label="表格标题" name="headerTitle">
            <Input onChange={({target})=>{
              setTableConfig({...tableConfig,headerTitle:target.value})
            }}/>
          </Form.Item>
          <Form.Item label="表格查询" name="search">
            <Radio.Group onChange={({target})=>{
              setTableConfig({...tableConfig,search:target.value})
            }}>
              <Radio value={true}> 启用 </Radio>
              <Radio value={false}> 关闭 </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="表格新增" name="addShow">
            <Radio.Group onChange={({target})=>{
              setAddShow(target.value)
            }}>
              <Radio value={true}> 启用 </Radio>
              <Radio value={false}> 关闭 </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="表格操作栏" name="operateShow">
            <Radio.Group onChange={({target})=>{
              setOperateShow(target.value)
            }}>
              <Radio value={true}> 启用 </Radio>
              <Radio value={false}> 关闭 </Radio>
            </Radio.Group>
          </Form.Item>
          {operateShow? <>
            <Form.Item label="表格行编辑" name="editShow" >
              <Radio.Group onChange={({target})=>{
                setEditShow(target.value)
              }}>
                <Radio value={true}> 启用 </Radio>
                <Radio value={false}> 关闭 </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="表格行删除" name="deleteShow">
              <Radio.Group onChange={({target})=>{
                setDeleteShow(target.value)
              }}>
                <Radio value={true}> 启用 </Radio>
                <Radio value={false}> 关闭 </Radio>
              </Radio.Group>
            </Form.Item>
            </> : <></>
          }
          <Form.Item label="表格多选" name="rowSelectionShow">
            <Radio.Group onChange={({target})=>{
              setRowSelectionShow(target.value)
            }}>
              <Radio value={true}> 启用 </Radio>
              <Radio value={false}> 关闭 </Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: '2',
      label: '字段设置',
      children: (
        <Form
          layout={"horizontal"}
          form={form}
          labelAlign={'left'}
          labelCol={{span: 6}}
          wrapperCol={{ span: 18 }}
        >
          {
            columns.map((item,index) =>
              <Form.Item name="headerTitle" key={index} label={<>{item.title}</>}>
                <Space direction="horizontal">
                  <Input addonAfter={
                    <Space direction="horizontal">
                      <ColumnsFrom defaultColumns={columns} setColumns={setColumns} itemIndex={index}></ColumnsFrom>
                      <DeleteFilled onClick={()=>{
                        columns.splice(index,1)
                        setColumns([...columns])
                      }}/>
                    </Space>
                  } defaultValue={`${item.dataIndex}`} addonBefore={<XinDict value={item.valueType}  dict={'valueType'} />} />
                </Space>
              </Form.Item>
            )
          }
          <Form.Item>
            <ColumnsFrom defaultColumns={columns} setColumns={setColumns}></ColumnsFrom>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: '3',
      label: '高级设置',
      children: (
        <div className={'nodeClass'}>

        </div>
      ),
    },
  ];


  return (
    <Row gutter={[16, 16]} className={'devise-row'} style={{marginRight: 0}}>
      <Col span={5} className={'devise-col'} style={{padding: '16px'}}>
        <Collapse size="small" defaultActiveKey={['1']} items={items}/>
        <Button onClick={()=> actionRef.current?.reloadAndRest?.()}>导出</Button>
      </Col>
      <Col span={19} className={'devise-col-body'}>
        <XinTable<any>
          tableConfig={tableConfig}
          tableApi={api}
          columns={columns}
          addShow={addShow}
          editShow={editShow}
          deleteShow={deleteShow}
          operateShow={operateShow}
          rowSelectionShow={rowSelectionShow}
        />
      </Col>
    </Row>
  )
}

export default Devise;