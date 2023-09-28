import { request } from '@umijs/max';

const api = {
  loginApi: '/admin.php/admin/login', // 用户登录
  logoutApi: '/admin.php/admin/logout', // 退出登录
  getAdminInfoApi: '/admin.php/admin/getAdminInfo', // 获取用户信息
  refreshAdminTokenApi: '/admin.php/admin/refreshToken', // 刷新 Token
}

/**
 * 管理端用户登录
 * @param data
 * @constructor
 */
export async function UserLogin(data: USER.UserLoginFrom) {
  return request<USER.LoginResult>(api.loginApi, {
    method: 'post',
    data
  });
}

/**
 * 获取管理员用户信息
 * @constructor
 */
export async function GetAdminInfo() {
  return request<USER.UserResult>(api.getAdminInfoApi, {
    method: 'get'
  });
}

/**
 * 刷新 Token
 * @constructor
 */
export async function refreshAdminToken() {
  return request<USER.ReToken>(api.refreshAdminTokenApi, {
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




