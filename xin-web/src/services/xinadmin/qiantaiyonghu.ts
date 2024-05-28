// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取用户余额记录 获取用户余额记录 GET /api.php/user/getMoneyLog */
export async function getMoneyLog(options?: { [key: string]: any }) {
  return request<API.requestSuccess>('/api.php/user/getMoneyLog', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取用户信息 获取用户信息 GET /api.php/user/getUserInfo */
export async function getUserInfo(options?: { [key: string]: any }) {
  return request<
    API.requestSuccess & {
      data?: { info?: API.userModel; access?: Record<string, any>; menus?: API.userRuleModel };
    }
  >('/api.php/user/getUserInfo', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录 退出登录 GET /api.php/user/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<API.requestSuccess>('/api.php/user/logout', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 刷新 Token 刷新 Token GET /api.php/user/refreshToken */
export async function refreshToken(options?: { [key: string]: any }) {
  return request<API.requestSuccess>('/api.php/user/refreshToken', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 设置密码 设置密码 POST /api.php/user/setPassword */
export async function setPassword(body: API.setUserPassword, options?: { [key: string]: any }) {
  return request<API.requestSuccess>('/api.php/user/setPassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 设置用户信息 设置用户信息 POST /api.php/user/setUserInfo */
export async function setUserInfo(body: API.setUserInfo, options?: { [key: string]: any }) {
  return request<API.requestSuccess>('/api.php/user/setUserInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 头像上传接口 头像上传 GET /api.php/user/upAvatar */
export async function upAvatar(options?: { [key: string]: any }) {
  return request<API.requestSuccess & { data?: { fileInfo?: API.fileModel } }>(
    '/api.php/user/upAvatar',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
