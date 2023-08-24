import { request } from '@umijs/max';

export async function saveData(data: {
  id: string;
  columns: string;
  sql_config: string;
  table_config: string;
}) {
  return request<API.ResponseStructure<any>>('online.online_table/saveData', {
    method: 'post',
    data
  });
}

export async function getData(params: {id:string}) {
  return request<API.ResponseStructure<any>>('online.online_table/getData', {
    method: 'get',
    params
  });
}
export async function crudApi(data: {
  id: any;
  columns: any;
  sql_config: any;
  table_config: any;
}) {
  return request<API.ResponseStructure<any>>('online.online_table/crud', {
    method: 'post',
    data
  });
}


