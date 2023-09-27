import { request } from '@umijs/max';
import React from "react";

const api = {
  loginApi: '/admin.php/admin/login', // 用户登录
  logoutApi: '/admin.php/admin/logout', // 退出登录
  getAdminInfoApi: '/admin.php/admin/getAdminInfo', // 获取用户信息
  getAdminMenuApi: '/admin.php/admin/getAdminMenu', // 获取 Admin 菜单
  refreshAdminTokenApi: '/admin.php/admin/refreshToken', // 刷新 Token
  getRulePidApi: '/admin.php/adminRule/getRulePid', // 获取权限Pid
  getRuleByGroupApi: '/admin.php/adminRule/getRuleByGroup', // 通过分组获取权限
  getGroupPidApi: '/admin.php/adminGroup/getGroupPid', // 获取分组 父ID
  setGroupRuleApi: '/admin.php/adminGroup/setGroupRule', // 设置分组权限
  getGroupRuleApi: '/admin.php/adminGroup/getGroupRule' /// 获取分组权限
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

/**
 * 获取权限父节点ID
 */
export async function GetRulePid() {
  return request<ResponseStructure<any>>(api.getRulePidApi, {
    method: 'get'
  });
}

/**
 * 根据管理员分组获取权限
 * @param params
 */
export async function GetRuleByGroup(params: {group_id:number}) {
  return request<ResponseStructure<any>>(api.getRuleByGroupApi, {
    method: 'get',
    params
  });
}

/**
 * 获取与管理员分组父id
 */
export async function GetAdminGroupPid() {
  return request<ResponseStructure<any>>(api.getGroupPidApi, {
    method: 'get'
  });
}

/**
 * 设置管理员分组权限
 * @param data
 */
export async function SetGroupRule(data: {id:number, rule_ids: React.Key[]}) {
  return request<ResponseStructure<any>>(api.setGroupRuleApi, {
    method: 'post',
    data: data
  });
}

/**
 * 通过管理员分组获取权限
 * @param params
 */
export async function GetGroupRule(params: {group_id:number}) {
  return request<ResponseStructure<any>>(api.getGroupRuleApi, {
    method: 'get',
    params
  });
}


