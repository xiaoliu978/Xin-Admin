// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 新增用户分组 POST /admin.php/user.user_group/add */
export async function userGroupAdd(body: API.userGroupModel, options?: { [key: string]: any }) {
  return request<API.requestSuccess>('/admin.php/user.user_group/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户分组 DELETE /admin.php/user.user_group/delete */
export async function userGroupDelete(
  body: {
    /** 删除的Ids */
    ids?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.requestSuccess>('/admin.php/user.user_group/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑用户分组 修改 PUT /admin.php/user.user_group/edit */
export async function userGroupEdit(body: API.userGroupModel, options?: { [key: string]: any }) {
  return request<API.baseList & { data?: { data?: API.userGroupModel } }>(
    '/admin.php/user.user_group/edit',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 用户分组列表 查询列表 GET /admin.php/user.user_group/list */
export async function userGroupList(options?: { [key: string]: any }) {
  return request<API.baseList & { data?: { data?: API.userGroupModel } }>(
    '/admin.php/user.user_group/list',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 设置分组权限 设置分组权限 POST /admin.php/user.user_group/setGroupRule */
export async function userGroupSetGroupRule(
  body: {
    /** 设置分组ID */
    id?: number;
    /** 权限ID */
    rule_ids?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.requestSuccess>('/admin.php/user.user_group/setGroupRule', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增用户余额变动记录 POST /admin.php/user.user_money_log/add */
export async function userMoneyLogAdd(
  body: {
    /** 用户ID */
    id?: number;
    /** 变动余额 */
    money?: number;
    /** 备注 */
    remark?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.requestSuccess>('/admin.php/user.user_money_log/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户余额记录 DELETE /admin.php/user.user_money_log/delete */
export async function userMoneyLogDelete(
  body: {
    /** 删除的Ids */
    ids?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.requestSuccess>('/admin.php/user.user_money_log/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑用户余额记录 修改 PUT /admin.php/user.user_money_log/edit */
export async function userMoneyLogEdit(
  body: API.userMoneyLogModel,
  options?: { [key: string]: any },
) {
  return request<API.baseList & { data?: { data?: API.userMoneyLogModel } }>(
    '/admin.php/user.user_money_log/edit',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 用户余额记录列表 查询列表 GET /admin.php/user.user_money_log/list */
export async function userMoneyLogList(options?: { [key: string]: any }) {
  return request<API.baseList & { data?: { data?: API.userMoneyLogModel } }>(
    '/admin.php/user.user_money_log/list',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 新增用户权限 POST /admin.php/user.user_rule/add */
export async function userRuleAdd(body: API.userRuleModel, options?: { [key: string]: any }) {
  return request<API.requestSuccess>('/admin.php/user.user_rule/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户权限 DELETE /admin.php/user.user_rule/delete */
export async function userRuleDelete(
  body: {
    /** 删除的Ids */
    ids?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.requestSuccess>('/admin.php/user.user_rule/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改用户权限 修改 PUT /admin.php/user.user_rule/edit */
export async function userRuleEdit(body: API.userRuleModel, options?: { [key: string]: any }) {
  return request<API.baseList & { data?: { data?: API.userRuleModel } }>(
    '/admin.php/user.user_rule/edit',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 获取用户权限父ID列表 查询列表 GET /admin.php/user.user_rule/getRulePid */
export async function userRuleGetRulePid(options?: { [key: string]: any }) {
  return request<API.baseList & { data?: { data?: API.userRuleModel } }>(
    '/admin.php/user.user_rule/getRulePid',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 获取用户权限列表 查询列表 GET /admin.php/user.user_rule/list */
export async function userRuleList(options?: { [key: string]: any }) {
  return request<API.baseList & { data?: { data?: API.userRuleModel } }>(
    '/admin.php/user.user_rule/list',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 新增用户 POST /admin.php/user.user/add */
export async function userAdd(body: API.userModel, options?: { [key: string]: any }) {
  return request<API.requestSuccess>('/admin.php/user.user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 DELETE /admin.php/user.user/delete */
export async function userDelete(
  body: {
    /** 删除的Ids */
    ids?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.requestSuccess>('/admin.php/user.user/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑用户 修改 PUT /admin.php/user.user/edit */
export async function userEdit(body: API.userModel, options?: { [key: string]: any }) {
  return request<API.baseList & { data?: { data?: API.userModel } }>('/admin.php/user.user/edit', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户列表 查询列表 GET /admin.php/user.user/list */
export async function userList(options?: { [key: string]: any }) {
  return request<API.baseList & { data?: { data?: API.userModel } }>('/admin.php/user.user/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 搜索用户 查询列表 GET /admin.php/user.user/vagueSearch */
export async function userVagueSearch(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.userVagueSearchParams,
  options?: { [key: string]: any },
) {
  const { search: param0, ...queryParams } = params;
  return request<API.baseList & { data?: { data?: API.userModel } }>(
    '/admin.php/user.user/vagueSearch',
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}
