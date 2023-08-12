import { request } from '@umijs/max';

export async function queryUserInfo() {
    return request<API.Result_PageInfo_UserInfo__>('', {
        method: 'post'
    });
}