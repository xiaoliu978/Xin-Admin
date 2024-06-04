// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取管理员信息 获取用户信息 GET /admin.php/admin/getAdminInfo */
export async function getAdminInfo(options?: { [key: string]: any }) {
  return request<API.requestSuccess>('/admin.php/admin/getAdminInfo', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登录 用户登录 POST /admin.php/admin/login */
export async function loginAdmin(
  body: {
    /** 登录方式 */
    loginType: string;
    /** 用户名 */
    username?: string;
    /** 密码 */
    password?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.requestSuccess>('/admin.php/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 退出登录 退出登录 GET /admin.php/admin/logout */
export async function logoutAdmin(options?: { [key: string]: any }) {
  return request<API.requestSuccess>('/admin.php/admin/logout', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 后台测试接口 查询列表 GET /admin.php/index/index */
export async function adminIndex(options?: { [key: string]: any }) {
  return request<
    API.requestSuccess & {
      data?: { webSetting?: { title?: string; logo?: string; subtitle?: string } };
    }
  >('/admin.php/index/index', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 刷新令牌 查询列表 GET /admin.php/index/refreshToken */
export async function refreshAdminToken(options?: { [key: string]: any }) {
  return request<API.requestSuccess & { data?: { token?: string } }>(
    '/admin.php/index/refreshToken',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
