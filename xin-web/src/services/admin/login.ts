import { request } from '@umijs/max';

export async function UserLogin(data: USER.UserLoginFrom) {
  return request<USER.UserResult>('/admin/login', {
    method: 'post',
    data
  });
}