import { useParams } from '@umijs/max';
import React, { useEffect, useState } from 'react';
import './index.less';
import { ProCard, ProCardTabsProps } from '@ant-design/pro-components';
import DefaultTable, { defaultTableSetting } from './components/defaultTable';
import { Button, Form, Input, message, Space, Switch } from 'antd';
import { OnlineType } from '@/pages/backend/Online/typings';
import ColumnsFrom from '@/pages/backend/Online/Table/components/ColumnsFrom';
import DragSort from '@/pages/backend/Online/Table/components/DragSort';
import { crudApi, getData, saveData } from '@/services/admin/online';
import { buildColumns } from '@/pages/backend/Online/Table/components/utils';
import Preview from '@/pages/backend/Online/Table/components/Preview';

const Devise = () => {
  const params = useParams();
  const [tableSetting, setTableSetting] = useState<OnlineType.TableConfig>(defaultTableSetting);
  const [crudForm] = Form.useForm<OnlineType.CrudConfig>();
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState<OnlineType.ColumnsConfig[]>([]);
  const request = async (id: string) => {
    let resData = await getData({ id });
    let columns: OnlineType.ColumnsConfig[] = JSON.parse(resData.data.data.columns);
    if (columns) setColumns(buildColumns(columns));
    // 表格设置
    let table_config: OnlineType.TableConfig = JSON.parse(resData.data.data.table_config);
    if (table_config) setTableSetting(table_config);
    // crud设置
    let crud_config: OnlineType.CrudConfig = JSON.parse(resData.data.data.crud_config);
    if (crud_config) crudForm.setFieldsValue(crud_config);
  };
  useEffect(() => {
    if (params.id) {
      request(params.id).then(() => {
        message.success('获取数据成功！');
      });
    }
  }, [params]);

  const tabs: ProCardTabsProps = {
    items: [
      {
        label: '表格配置',
        key: 'table',
        children: (
          <DefaultTable setTableSetting={setTableSetting} tableSetting={tableSetting}></DefaultTable>
        ),
      },
      {
        key: '3',
        label: '字段设置',
        children: (
          <>
            <DragSort setColumns={setColumns} defaultData={columns}></DragSort>
            <ColumnsFrom setColumns={setColumns} defaultData={columns}></ColumnsFrom>
          </>
        ),
      },
      {
        key: '4',
        label: '生成设置',
        children: (
          <Form
            layout={'horizontal'}
            form={crudForm}
            labelAlign={'left'}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 14 }}
            initialValues={{
              name: 'TableName',
              controllerPath: 'app/admin/controller',
              modelPath: 'app/admin/model',
              validatePath: 'app/admin/validate',
              pagePath: 'src/pages',
            }}
          >
            <Form.Item label='数据表名' name='sqlTableName'>
              <Input placeholder='请输入数据表名称' addonBefore="xin-"/>
            </Form.Item>
            <Form.Item label='数据库备注' name='sqlTableRemark'>
              <Input placeholder='请输入数据表备注' />
            </Form.Item>
            <Form.Item label='开启软删除' name='autoDeletetime' valuePropName='checked'>
              <Switch />
            </Form.Item>
            {/*<Form.Item>*/}
            {/*  <Button onClick={()=>{}}>导入现有数据表</Button>*/}
            {/*</Form.Item>*/}
            <Form.Item label='文件名' name='name'>
              <Input />
            </Form.Item>
            <Form.Item label='控制器目录' name='controllerPath'>
              <Input />
            </Form.Item>
            <Form.Item label='模型目录' name='modelPath'>
              <Input />
            </Form.Item>
            <Form.Item label='验证器目录' name='validatePath'>
              <Input />
            </Form.Item>
            <Form.Item label='前端页面目录' name='pagePath'>
              <Input />
            </Form.Item>
          </Form>
        ),
      },
    ],
  };

  const saveOnlineTable = () => {
    if (!params.id) {
      message.warning('在线开发ID不存在');
      return;
    }
    let data = {
      id: params.id,
      columns: JSON.stringify(columns),
      table_config: JSON.stringify(tableSetting),
      sql_config: '{}',
      crud_config: JSON.stringify(crudForm.getFieldsValue()),
    };
    setLoading(true);
    saveData(data).then(res => {
      if (res.success) {
        message.success('保存成功！');
      }
    }).finally(() => setLoading(false));
  };

  const crud = ()=> {
    saveOnlineTable()
    let data = {
      id: params.id,
      columns: columns,
      table_config: tableSetting,
      sql_config: {},
      crud_config: crudForm.getFieldsValue(),
    }
    crudApi(data).then(res => {
      if (res.success) {
        message.success('代码生成成功！');
      }
    });
  }

  const extra = (
    <Space>
      <Button onClick={saveOnlineTable} type={'primary'}>保存编辑</Button>
      <Button onClick={crud} type={'primary'}>保存并生成代码</Button>
    </Space>
  );

  return (
    <ProCard split='vertical' style={{ width: '100vw', height: '100vh' }}>
      <ProCard loading={loading} colSpan='450px' tabs={tabs} style={{ height: '100vh', overflow: 'auto' }}></ProCard>
      <ProCard loading={loading} title='表格预览' headerBordered bodyStyle={{ background: '#f5f5f5' }} extra={extra}>
        <Preview columns={columns} tableSetting={tableSetting}></Preview>
      </ProCard>
    </ProCard>
  );
}

export default Devise;
