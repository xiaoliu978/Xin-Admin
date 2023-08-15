import { request } from '@umijs/max';

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


export async function getAdminList(params: any) {
  return request<ResponseStructure>('/admin/list', {
    method: 'get',
    params
  });
}

export async function getRulePid() {
  return request<ResponseStructure>('/adminRule/getRulePid', {
    method: 'get'
  });
}