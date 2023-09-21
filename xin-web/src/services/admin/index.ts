import { request } from '@umijs/max';
import React from "react";


/**
 * 管理端用户登录
 * @param data
 * @constructor
 */
export async function UserLogin(data: USER.UserLoginFrom) {
  return request<USER.LoginResult>('/admin/login', {
    method: 'post',
    data
  });
}

/**
 * 获取管理员用户信息
 * @constructor
 */
export async function GetAdminInfo() {
  return request<USER.UserResult>('/admin/getAdminInfo', {
    method: 'get'
  });
}

/**
 * 获取管理员用户信息
 * @constructor
 */
export async function GetWebSet() {
  return request<ResponseStructure<{[key: string]: any}>>('/index', {
    method: 'get'
  });
}

/**
 * 获取菜单路由
 * @constructor
 */
export async function GetAdminMenu() {
  return request<USER.MenuType>('/admin/getAdminMenu', {
    method: 'get'
  });
}

/**
 * 刷新 Token
 * @constructor
 */
export async function RefreshToken() {
  return request<USER.ReToken>('/admin/refreshToken', {
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
  return request<ResponseStructure<any>>('/admin/logout', {
    method: 'post'
  });
}

/**
 * 获取权限父节点ID
 */
export async function getRulePid() {
  return request<ResponseStructure<any>>('/adminRule/getRulePid', {
    method: 'get'
  });
}

/**
 * 根据管理员分组获取权限
 * @param params
 */
export async function getRuleByGroup(params: {group_id:number}) {
  return request<ResponseStructure<any>>('/adminRule/getRuleByGroup', {
    method: 'get',
    params
  });
}

/**
 * 获取与管理员分组父id
 */
export async function getAdminGroupPid() {
  return request<ResponseStructure<any>>('/adminGroup/getGroupPid', {
    method: 'get'
  });
}

/**
 * 设置管理员分组权限
 * @param data
 */
export async function setGroupRule(data: {id:number, rule_ids: React.Key[]}) {
  return request<ResponseStructure<any>>('/adminGroup/setGroupRule', {
    method: 'post',
    data: data
  });
}

/**
 * 通过管理员分组获取权限
 * @param params
 */
export async function getGroupRule(params: {group_id:number}) {
  return request<ResponseStructure<any>>('/adminGroup/getGroupRule', {
    method: 'get',
    params
  });
}


