import { request } from '@umijs/max';

const api = {
  getUserInfo: 'api.php/user/getUserInfo',
  login: 'api.php/index/login',
  logoutApi: 'api.php/user/logout',
}

/**
 * 获取网站信息
 * @constructor
 */
export async function getUserInfo() {
  return request<API.ResponseStructure<any>>(api.getUserInfo, {
    method: 'get'
  });
}


/**
 * 刷新 Token
 * @constructor
 */
export async function refreshUserToken() {
  return request<USER.ReToken>('api.php/user/refreshToken', {
    method: 'post',
    headers: {
      'RefreshToken': localStorage.getItem('refresh_token') || ''
    }
  });
}

/**
 * 退出登录
 * @constructor
 */
export async function Logout() {
  return request<ResponseStructure<any>>(api.logoutApi, {
    method: 'post'
  });
}