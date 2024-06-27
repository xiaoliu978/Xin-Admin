import { useParams } from '@umijs/max';
import React, { useEffect, useState } from 'react';
import './index.less';
import { Button, message, Space, Tabs, Watermark } from 'antd';
import { OnlineType } from '@/pages/backend/Online/typings';
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
   * 加载状态
   */
  const [loading, setLoading] = useState(false);

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
    let columns: OnlineType.ColumnsConfig[] = JSON.parse(resData.columns);
    let table_config: OnlineType.TableConfig = JSON.parse(resData.table_config);
    let crud_config: OnlineType.CrudConfig = JSON.parse(resData.crud_config);
    if (columns && table_config && crud_config) {
      setTableConfig({
        columns: buildColumns(columns),
        tableSetting: table_config,
        crudConfig: crud_config,
        id,
      });
      message.success('获取数据成功！');
    } else {
      message.warning('数据不完整！');
    }
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
      sql_config: '{}',
      crud_config: JSON.stringify(tableConfig.crudConfig),
    };
    setLoading(true);
    saveData(data).then(res => {
      if (res.success) {
        message.success('保存成功！');
      }
    }).finally(() => setLoading(false));
  };

  /**
   * 保存并生成代码
   */
  const crud = () => {
    saveOnlineTable();
    let data = {
      id: params.id,
      columns: tableConfig.columns,
      table_config: tableConfig.tableSetting,
      sql_config: {},
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
      label: '基础配置',
      children: <CrudFrom />,
    },
    {
      key: '2',
      label: '表格配置',
      children: <TableSetting />,
    },
    {
      key: '3',
      label: '字段配置',
      children: <>
        <DragSort />
        <ColumnsFrom />
      </>,
    },
  ];

  return (
    <TableConfigContext.Provider value={{ tableConfig, setTableConfig }}>
      <div style={{ width: '100vw', height: '100vh', display: 'flex', flexWrap: 'wrap', background: '#efefef' }}>
        <div style={{ width: '24%', height: '100%', padding: '14px' }}>
          <div style={{ background: '#fff', padding: '20px 10px 20px 20px', height: '100%', borderRadius: 5 }}>
            <div style={{ height: '100%', overflowX: 'auto', padding: '5px' }}>
              <Tabs
                defaultActiveKey='1'
                style={{ marginBottom: 32 }}
                items={tabItem}
                activeKey={tabChange}
                onChange={setTableChange}
              />
              <Space>
                <Button onClick={saveOnlineTable} type={'primary'}>保存编辑</Button>
                <Button onClick={crud} type={'primary'}>保存并生成代码</Button>
              </Space>
            </div>
          </div>
        </div>
        <div style={{ width: '76%', height: '100%', padding: '14px 14px 14px 0' }}>
          <Watermark content={['预览', 'XinAdmin']}>
            <div style={{
              width: '100%',
              height: 'calc(100% - 120px)',
              overflow: 'auto',
              padding: '10px',
              border: '1px solid red',
              borderRadius: 5,
              marginBottom: 10,
            }}>
              <Preview />
            </div>
          </Watermark>
        </div>
      </div>
    </TableConfigContext.Provider>
  );
}

export default Devise;
