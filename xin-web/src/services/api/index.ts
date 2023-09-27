import { request } from '@umijs/max';

const api = {
  index: 'api.php/index'
}

/**
 * 获取网站信息
 * @constructor
 */
export async function index() {
  return request<API.ResponseStructure<any>>(api.index, {
    method: 'get'
  });
}