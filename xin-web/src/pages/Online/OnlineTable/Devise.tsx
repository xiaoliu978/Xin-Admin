import {useParams} from "@umijs/max";
import {Row, Col, Collapse, Form, Input, CollapseProps, Radio, Button, Space, message} from 'antd';
import XinTable from "@/components/XinTable";
import React, {useEffect, useState} from "react";
import './index.less'
import ColumnsFrom from "@/pages/Online/OnlineTable/components/ColumnsFrom";
import XinDict from "@/components/XinDict";
import {DeleteFilled, KeyOutlined} from "@ant-design/icons";
import {OnlineType} from "@/pages/Online/typings";
import {crudApi, getData, saveData} from "@/services/online";


const api = '/online.test';

const Devise = () => {

  const params  = useParams();

  /**
   * columns 表格行默认字段
   */
  const [columns,setColumns] = useState<OnlineType.ColumnsConfig[]>([
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'digit',
      hideInForm: true,
      order: 99
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'date',
      hideInForm: true,
      order: 1,
      sqlType: 'int',
      defaultValue: 'null',
      remark: '创建时间'
    },
    {
      title: '修改时间',
      dataIndex: 'update_time',
      valueType: 'date',
      hideInForm: true,
      order: 0,
      sqlType: 'int',
      defaultValue: 'null',
      remark: '修改时间'
    },
  ]);

  /**
   * pro table 设置
   */
  const [tableConfig,setTableConfig] = useState<OnlineType.TableConfig>({})
  const [tableForm] = Form.useForm<OnlineType.TableConfig>();
  const [sqlForm] = Form.useForm<OnlineType.SqlConfig>();
  const [crudForm] = Form.useForm<OnlineType.CrudConfig>();


  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: '页面设置',
      children: (
        <Form
          layout={"horizontal"}
          form={tableForm}
          labelAlign={'left'}
          labelCol={{span: 8}}
          wrapperCol={{ span: 14 }}
          initialValues={{
            headerTitle: '查询表格',
            search: true,
            addShow: true,
            operateShow: true,
            editShow: true,
            deleteShow: true,
            rowSelectionShow: true
          }}
          onValuesChange={(changedValues, allValues)=>{
            setTableConfig(allValues)
          }}
        >
          <Form.Item label="表格标题" name="headerTitle">
            <Input/>
          </Form.Item>
          <Form.Item label="表格查询" name="search">
            <Radio.Group>
              <Radio value={true}> 启用 </Radio>
              <Radio value={false}> 关闭 </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="表格新增" name="addShow">
            <Radio.Group>
              <Radio value={true}> 启用 </Radio>
              <Radio value={false}> 关闭 </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="表格操作栏" name="operateShow">
            <Radio.Group>
              <Radio value={true}> 启用 </Radio>
              <Radio value={false}> 关闭 </Radio>
            </Radio.Group>
          </Form.Item>
          {tableConfig.operateShow? <>
            <Form.Item label="表格行编辑" name="editShow" >
              <Radio.Group>
                <Radio value={true}> 启用 </Radio>
                <Radio value={false}> 关闭 </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="表格行删除" name="deleteShow">
              <Radio.Group>
                <Radio value={true}> 启用 </Radio>
                <Radio value={false}> 关闭 </Radio>
              </Radio.Group>
            </Form.Item>
            </> : <></>
          }
          <Form.Item label="表格多选" name="rowSelectionShow">
            <Radio.Group>
              <Radio value={true}> 启用 </Radio>
              <Radio value={false}> 关闭 </Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: '2',
      label: '数据表设置',
      children: (
        <Form
          layout={"horizontal"}
          labelAlign={'left'}
          labelCol={{span: 8}}
          form={sqlForm}
          wrapperCol={{ span: 14 }}
        >
          <Form.Item label="数据表名" name="sqlTableName">
            <Input placeholder="请输入完整的数据表名称"/>
          </Form.Item>
          <Form.Item label="数据库备注" name="sqlTableRemark">
            <Input placeholder="请输入数据表备注"/>
          </Form.Item>
          <Form.Item>
            <Button onClick={()=>{}}>导入现有数据表</Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: '3',
      label: '字段设置',
      children: (
        <Form
          layout={"horizontal"}
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
                      {
                        item.isKey ? <KeyOutlined style={{color:'#000'}}/> : ''
                      }
                      <ColumnsFrom defaultColumns={columns} setColumns={setColumns} itemIndex={index}></ColumnsFrom>
                      <DeleteFilled onClick={()=>{
                        columns.splice(index,1)
                        setColumns([...columns])
                      }} style={{color:'#000'}}/>
                    </Space>
                  } disabled value={`${item.dataIndex}`} addonBefore={<XinDict value={item.valueType}  dict={'valueType'} />}  />
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
      key: '4',
      label: 'CRUD 设置',
      children: (
        <Form
          layout={"horizontal"}
          form={crudForm}
          labelAlign={'left'}
          labelCol={{span: 8}}
          wrapperCol={{ span: 14 }}
          initialValues={{
            name: 'TableName',
            controllerPath: 'app/admin/controller',
            modelPath: 'app/admin/model',
            validatePath: 'app/admin/validate',
            pagePath: 'src/pages'
          }}
        >
          <Form.Item label="文件名" name="name">
            <Input/>
          </Form.Item>
          <Form.Item label="控制器目录" name="controllerPath">
            <Input/>
          </Form.Item>
          <Form.Item label="模型目录" name="modelPath">
            <Input/>
          </Form.Item>
          <Form.Item label="验证器目录" name="validatePath">
            <Input/>
          </Form.Item>
          <Form.Item label="前端页面目录" name="pagePath">
            <Input/>
          </Form.Item>
        </Form>
      ),
    },
  ];

  useEffect(()=>{
    if(!params.id){
      return
    }
    getData({id:params.id}).then((res:API.ResponseStructure<{
      data: {
        columns: string;
        table_config: string;
        sql_config: string;
        crud_config: string
      }
    }>)=>{

      let columns: OnlineType.ColumnsConfig[] = JSON.parse(res.data.data.columns)
      if(columns) {
        setColumns(columns)
      }
      let table_config: OnlineType.TableConfig = JSON.parse(res.data.data.table_config)
      if(table_config){
        setTableConfig(table_config)
        tableForm.setFieldsValue(table_config)
      }
      let sql_config: OnlineType.SqlConfig = JSON.parse(res.data.data.sql_config)
      if(sql_config) {
        sqlForm.setFieldsValue(sql_config)
      }
      let crud_config: OnlineType.CrudConfig = JSON.parse(res.data.data.crud_config)
      if(crud_config) {
        crudForm.setFieldsValue(crud_config)
      }

    })
  },[params])

  const colStyle = {
    paddingTop: '16px',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingBottom: '16px',
  }

  return (
    <Row gutter={[16, 16]} className={'devise-row'} style={{marginRight: 0,marginLeft:0}}>
      <Col span={5} className={'devise-col'} style={colStyle}>
        <Collapse size="small" defaultActiveKey={['1','2','3','4']} items={items}/>
        <Space style={{marginTop: '10px',float:'right'}}>
          <Button onClick={()=> {
            if(!params.id) {
              message.warning('在线开发ID不存在')
              return
            }
            let data = {
              id: params.id,
              columns: columns,
              table_config:tableForm.getFieldsValue(),
              sql_config: sqlForm.getFieldsValue(),
              crud_config: crudForm.getFieldsValue()
            }
            console.log(data)
            crudApi(data).then(res=>{
              if(res.success){
                message.success('代码生成成功！')
              }
            })
          }} type={'primary'}>代码生成</Button>
          <Button onClick={()=> {
            if(!params.id) {
              message.warning('在线开发ID不存在')
              return
            }
            let data = {
              id: params.id,
              columns: JSON.stringify(columns),
              table_config: JSON.stringify(tableForm.getFieldsValue()),
              sql_config: JSON.stringify(sqlForm.getFieldsValue()),
              crud_config: JSON.stringify(crudForm.getFieldsValue())
            }
            console.log(data)
            saveData(data).then(res=>{
              if(res.success){
                message.success('保存成功！')
              }
            })
          }} type={'primary'}>保存编辑</Button>
        </Space>
      </Col>
      <Col span={19} className={'devise-col-body'} style={colStyle}>
        <XinTable<any>
          {...tableConfig}
          tableApi={api}
          columns={columns}
        />
      </Col>
    </Row>
  )
}

export default Devise;


