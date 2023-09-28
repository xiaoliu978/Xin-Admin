import { request } from '@umijs/max';
import React from "react";

const api = {
  getAdminMenuApi: '/admin.php/admin/getAdminMenu', // 获取 Admin 菜单
  getRulePidApi: '/admin.php/adminRule/getRulePid', // 获取权限Pid
  getRuleByGroupApi: '/admin.php/adminRule/getRuleByGroup', // 通过分组获取权限
  getGroupPidApi: '/admin.php/adminGroup/getGroupPid', // 获取分组 父ID
  setGroupRuleApi: '/admin.php/adminGroup/setGroupRule', // 设置分组权限
  getGroupRuleApi: '/admin.php/adminGroup/getGroupRule' /// 获取分组权限
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