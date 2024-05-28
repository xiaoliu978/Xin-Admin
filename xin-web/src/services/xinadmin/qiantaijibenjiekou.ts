// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取系统基本信息 查询列表 GET /api.php/index/index */
export async function index(options?: { [key: string]: any }) {
  return request<
    API.requestSuccess & {
      data?: {
        web_setting?: { title?: string; logo?: string; subtitle?: string };
        menus?: API.userRuleModel;
      };
    }
  >('/api.php/index/index', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 用户登录 用户登录 POST /api.php/index/login */
export async function login(
  body: {
    /** 登录方式 */
    loginType: string;
    /** 用户名 */
    username?: string;
    /** 密码 */
    password?: string;
    /** 登录方式 */
    email?: any;
    /** 邮箱验证码 */
    captcha?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.requestSuccess>('/api.php/index/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户注册 用户注册 POST /api.php/index/register */
export async function register(
  body: {
    /** 用户名 */
    username: string;
    /** 昵称 */
    nickname: string;
    /** 密码 */
    password: string;
    /** 确认密码 */
    rePassword: string;
    /** 注册方式 */
    regType: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.requestSuccess>('/api.php/index/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 发送邮箱验证码 发送邮箱验证码 GET /api.php/index/sendMailCode */
export async function sendMailCode(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.sendMailCodeParams,
  options?: { [key: string]: any },
) {
  const { email: param0, ...queryParams } = params;
  return request<API.requestSuccess>('/api.php/index/sendMailCode', {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
