/**
 * Online 在线开发接口
 */

import { request } from '@umijs/max';

/**
 * 保存数据
 * @param data
 */
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

/**
 * 获取数据
 * @param params
 */
export async function getData(params: {id:string}) {
  return request<API.ResponseStructure<any>>('online.online_table/getData', {
    method: 'get',
    params
  });
}

/**
 * 代码生成接口
 * @param data
 */
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


