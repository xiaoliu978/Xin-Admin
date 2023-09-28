import { request } from '@umijs/max';

const api = {
  index: '/api.php/index',
  login: '/api.php/index/login'
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

/**
 * 用户登录
 */
export async function login(data: API.UserLoginFrom) {
  return request<API.ResponseStructure<any>>(api.login, {
    method: 'post',
    data
  });
}