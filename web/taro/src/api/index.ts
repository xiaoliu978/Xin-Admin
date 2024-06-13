import {request} from "../utils/request";

const api = {
  index: '/api.php/index',
  login: '/api.php/index/login',
  reTokenApi: '/api.php/user/refreshToken',
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

/**
 * 刷新 Token
 * @constructor
 */
export async function refreshUserToken() {
  return request<any>(api.reTokenApi, {
    method: 'post',
    headers: {
      'x-user-refresh-token': localStorage.getItem('x-user-refresh-token') || ''
    }
  });
}
