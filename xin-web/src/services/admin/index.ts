import { request } from '@umijs/max';
import React from "react";

export async function UserLogin(data: USER.UserLoginFrom) {
  return request<USER.LoginResult>('/admin/login', {
    method: 'post',
    data
  });
}

export async function GetAdminInfo() {
  return request<USER.UserResult>('/admin/getAdminInfo', {
    method: 'get'
  });
}

export async function RefreshToken() {
  return request<USER.ReToken>('/admin/refreshToken', {
    method: 'post',
    headers: {
      'RefreshToken': localStorage.getItem('refresh_token') || ''
    }
  });
}

export async function Logout() {
  return request<ResponseStructure>('/admin/logout', {
    method: 'post'
  });
}

export async function getAdminRule() {
  return request<ResponseStructure>('/admin/getAdminRule', {
    method: 'get'
  });
}

export async function getRulePid() {
  return request<ResponseStructure>('/adminRule/getRulePid', {
    method: 'get'
  });
}

export async function getRuleByGroup(params: {group_id:number}) {
  return request<ResponseStructure>('/adminRule/getRuleByGroup', {
    method: 'get',
    params
  });
}

export async function getAdminGroupPid() {
  return request<ResponseStructure>('/adminGroup/getGroupPid', {
    method: 'get'
  });
}

export async function setGroupRule(data: {id:number, rule_ids: React.Key[]}) {
  return request<ResponseStructure>('/adminGroup/setGroupRule', {
    method: 'post',
    data: data
  });
}

export async function getGroupRule(params: {group_id:number}) {
  return request<ResponseStructure>('/adminGroup/getGroupRule', {
    method: 'get',
    params
  });
}


