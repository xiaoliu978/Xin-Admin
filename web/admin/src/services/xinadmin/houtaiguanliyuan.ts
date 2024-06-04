// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 新增管理员分组 POST /admin.php/admin_group/add */
export async function adminGroupAdd(body: API.adminGroupModel, options?: { [key: string]: any }) {
  return request<API.requestSuccess>('/admin.php/admin_group/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除管理员分组 DELETE /admin.php/admin_group/delete */
export async function adminGroupDelete(
  body: {
    /** 删除的Ids */
    ids?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.requestSuccess>('/admin.php/admin_group/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑管理员分组 修改 PUT /admin.php/admin_group/edit */
export async function adminGroupEdit(body: API.adminGroupModel, options?: { [key: string]: any }) {
  return request<API.baseList & { data?: { data?: API.adminGroupModel } }>(
    '/admin.php/admin_group/edit',
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

/** 获取管理员分组列表 获取管理员分组列表 GET /admin.php/admin_group/list */
export async function adminGroupList(options?: { [key: string]: any }) {
  return request<API.baseList & { data?: { data?: API.adminGroupModel } }>(
    '/admin.php/admin_group/list',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 设置分组权限 设置分组权限 POST /admin.php/admin_group/setGroupRule */
export async function adminGroupSetGroupRule(
  body: {
    /** 设置分组ID */
    id?: number;
    /** 权限ID */
    rule_ids?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.requestSuccess>('/admin.php/admin_group/setGroupRule', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增管理员权限 POST /admin.php/admin_rule/add */
export async function adminRuleAdd(body: API.adminRuleModel, options?: { [key: string]: any }) {
  return request<API.requestSuccess>('/admin.php/admin_rule/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除管理员权限 DELETE /admin.php/admin_rule/delete */
export async function adminRuleDelete(
  body: {
    /** 删除的Ids */
    ids?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.requestSuccess>('/admin.php/admin_rule/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改管理员权限 修改 PUT /admin.php/admin_rule/edit */
export async function adminRuleEdit(body: API.adminRuleModel, options?: { [key: string]: any }) {
  return request<API.baseList & { data?: { data?: API.adminRuleModel } }>(
    '/admin.php/admin_rule/edit',
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

/** 获取权限菜单节点 获取菜单节点，用于选择父节点 GET /admin.php/admin_rule/getRulePid */
export async function adminRuleGetRulePid(options?: { [key: string]: any }) {
  return request<API.requestSuccess>('/admin.php/admin_rule/getRulePid', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取管理员权限列表 获取管理员权限列表 GET /admin.php/admin_rule/list */
export async function adminRuleList(options?: { [key: string]: any }) {
  return request<API.baseList & { data?: { data?: API.adminRuleModel } }>(
    '/admin.php/admin_rule/list',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 新增管理员 新增管理员 POST /admin.php/admin/add */
export async function adminAdd(body: API.adminModel, options?: { [key: string]: any }) {
  return request<API.requestSuccess>('/admin.php/admin/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除管理员 DELETE /admin.php/admin/delete */
export async function adminDelete(
  body: {
    /** 删除的Ids */
    ids?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.requestSuccess>('/admin.php/admin/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑管理员 编辑管理员 PUT /admin.php/admin/edit */
export async function adminEdit(body: API.adminModel, options?: { [key: string]: any }) {
  return request<API.baseList & { data?: { data?: API.adminModel } }>('/admin.php/admin/edit', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取管理员列表 查询列表 GET /admin.php/admin/list */
export async function adminList(options?: { [key: string]: any }) {
  return request<API.baseList & { data?: { data?: API.adminModel } }>('/admin.php/admin/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改管理员信息 修改管理员信息 PUT /admin.php/admin/updateAdmin */
export async function adminUpdateAdmin(
  body: {
    /** 用户ID */
    username?: number;
    /** 手机号 */
    mobile?: string;
    /** 昵称 */
    nickname?: string;
    /** 邮箱 */
    email?: string;
    /** 头像ID */
    avatar_id?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.requestSuccess>('/admin.php/admin/updateAdmin', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改管理员密码 修改管理员密码 PUT /admin.php/admin/updatePassword */
export async function adminUpdatePassword(
  body: {
    /** 用户ID */
    id?: number;
    /** 密码 */
    password?: string;
    /** 确认密码 */
    rePassword?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.requestSuccess>('/admin.php/admin/updatePassword', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
