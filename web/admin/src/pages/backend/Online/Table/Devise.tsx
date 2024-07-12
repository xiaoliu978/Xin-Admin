import { useParams } from '@umijs/max';
import React, { useEffect, useState } from 'react';
import './index.less';
import { Button, Col, message, Row, Space, Tabs } from 'antd';
import { crudApi, getData, saveData } from '@/services/admin/online';
import TableSetting, { defaultTableSetting } from './components/TableSetting';
import ColumnsFrom from './components/ColumnsFrom';
import { buildColumns } from './components/utils';
import Preview from './components/Preview';
import CrudFrom from './components/CrudFrom';
import TableConfigContext from './components/TableConfigContext';
import DragSort from '@/pages/backend/Online/Table/components/DragSort';


const Devise = () => {
  /**
   * 路由参数
   */
  const params = useParams();

  /**
   * 表格配置
   */
  const [tableConfig, setTableConfig] = useState<{
    tableSetting: OnlineType.TableConfig,
    crudConfig: OnlineType.CrudConfig,
    columns: OnlineType.ColumnsConfig[],
    id: string
  }>({
    tableSetting: defaultTableSetting,
    crudConfig: {
      name: 'TableName',
      controllerPath: 'app/admin/controller',
      modelPath: 'app/admin/model',
      validatePath: 'app/admin/validate',
      pagePath: 'src/pages/backend',
    },
    columns: [],
    id: '',
  });


  /**
   * 获取远程数据
   * @param id
   */
  const request = async (id: string) => {
    let { data: { data: resData } } = await getData({ id });
    let columns: OnlineType.ColumnsConfig[] = JSON.parse(resData.columns) || [];
    let table_config: OnlineType.TableConfig = JSON.parse(resData.table_config) || {};
    let crud_config: OnlineType.CrudConfig = JSON.parse(resData.crud_config) || {};
    setTableConfig({
      columns: buildColumns(columns),
      tableSetting: table_config,
      crudConfig: crud_config,
      id,
    });
  };

  useEffect(() => {
    if (params.id) request(params.id).then(() => {
    });
  }, [params]);

  /**
   * 保存数据
   */
  const saveOnlineTable = () => {
    if (!tableConfig.id) {
      message.warning('在线开发ID不存在');
      return;
    }
    let data = {
      id: tableConfig.id,
      columns: JSON.stringify(tableConfig.columns),
      table_config: JSON.stringify(tableConfig.tableSetting),
      crud_config: JSON.stringify(tableConfig.crudConfig),
    };
    saveData(data).then(res => {
      if (res.success) {
        message.success('保存成功！');
      }
    })
  };

  /**
   * 保存并生成代码
   */
  const crud = () => {
    saveOnlineTable();
    let tableSetting: OnlineType.TableConfig = {...tableConfig.tableSetting}
    delete tableSetting.paginationShow;
    delete tableSetting.searchShow;
    delete tableSetting.optionsShow
    let data = {
      id: params.id,
      columns: tableConfig.columns,
      table_config:tableSetting,
      crud_config: tableConfig.crudConfig,
    };
    crudApi(data).then(res => {
      if (res.success) {
        message.success('代码生成成功！');
      }
    });
  };

  const [tabChange, setTableChange] = useState('1');
  const tabItem = [
    {
      key: '1',
      label: '表格配置',
      children: <TableSetting />,
    },
    {
      key: '2',
      label: '字段配置',
      children: <>
        <DragSort />
        <ColumnsFrom />
      </>,
    },
  ];

  return (
    <TableConfigContext.Provider value={{ tableConfig, setTableConfig }}>
      <Row>
        <Col span={6} style={{padding: '10px 20px'}}>
          <Tabs
            defaultActiveKey='1'
            style={{ marginBottom: 32 }}
            items={tabItem}
            activeKey={tabChange}
            onChange={setTableChange}
          />
        </Col>
        <Col span={18} style={{overflow: "auto"}}>
          <div style={{ padding: '20px 20px',borderLeft: "1px solid #efefef" }}>
            <CrudFrom/>
            <div style={{marginTop: 10, display: "flex",flexDirection: 'row-reverse'}}>
              <Space>
                <Button onClick={saveOnlineTable} type={'primary'}>保存编辑</Button>
                <Button onClick={crud} type={'primary'}>保存并生成代码</Button>
              </Space>
            </div>
          </div>
          <div style={{padding: 20, background: '#efefef'}}>
            <Preview />
          </div>
        </Col>
      </Row>
    </TableConfigContext.Provider>
  );
};

export default Devise;
