import { OnlineType } from '@/pages/backend/Online/typings';
import {mock} from 'mockjs';
import XinTable from '@/components/XinTable';
import React, { useContext } from 'react';
import TableConfigContext from '@/pages/backend/Online/Table/components/TableConfigContext';
const api = '/online.onlineTable';
export default () => {
  const {tableConfig} = useContext(TableConfigContext);
  return (
      <XinTable<any>
        {...tableConfig.tableSetting}
        tableApi={api}
        tableStyle={{}}
        columns={tableConfig.columns}
        params={{ data: tableConfig.columns }}
        request={async (params) => {
          let data = params.data;
          let dataIndex = {};
          data.forEach((item: OnlineType.ColumnsConfig) => {
            // @ts-ignore
            dataIndex[item.dataIndex] = item.mock;
          });
          return mock({
            'data|10': [dataIndex],
            current_page: 1,
            last_page: 1,
            per_page: 100,
            total: 5,
          });
        }}
      />
  )
}
