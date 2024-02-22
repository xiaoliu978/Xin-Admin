import { OnlineType } from '@/pages/backend/Online/typings';
import {mock} from 'mockjs';
import XinTable from '@/components/XinTable';
import React from 'react';
const api = '/online.onlineTable';
export default (
  props: {
    tableSetting: OnlineType.TableConfig;
    columns: OnlineType.ColumnsConfig[];
  }
) => {
  const {tableSetting,columns} = props
  return (
    <XinTable<any>
      {...tableSetting}
      tableApi={api}
      columns={columns}
      params={{ data: columns }}
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
