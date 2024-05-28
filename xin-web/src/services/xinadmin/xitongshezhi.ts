// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 新增字典项 POST /admin.php/system.dict_item/add */
export async function dictItemAdd(body: API.dictItemModel, options?: { [key: string]: any }) {
  return request<API.requestSuccess>('/admin.php/system.dict_item/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除字典项 DELETE /admin.php/system.dict_item/delete */
export async function dictItemDelete(
  body: {
    /** 删除的Ids */
    ids?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.requestSuccess>('/admin.php/system.dict_item/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取字典 查询列表 GET /admin.php/system.dict_item/dictList */
export async function dictItemDictList(options?: { [key: string]: any }) {
  return request<API.baseList & { data?: { data?: API.dictItemModel } }>(
    '/admin.php/system.dict_item/dictList',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 编辑字典项 修改 PUT /admin.php/system.dict_item/edit */
export async function dictItemEdit(body: API.dictItemModel, options?: { [key: string]: any }) {
  return request<API.baseList & { data?: { data?: API.dictItemModel } }>(
    '/admin.php/system.dict_item/edit',
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

/** 获取字典项列表 查询列表 GET /admin.php/system.dict_item/list */
export async function dictItemList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.dictItemListParams,
  options?: { [key: string]: any },
) {
  const { int: param0, ...queryParams } = params;
  return request<API.baseList & { data?: { data?: API.dictItemModel } }>(
    '/admin.php/system.dict_item/list',
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 新增字典 POST /admin.php/system.dict/add */
export async function dictAdd(body: API.dictModel, options?: { [key: string]: any }) {
  return request<API.requestSuccess>('/admin.php/system.dict/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除字典 DELETE /admin.php/system.dict/delete */
export async function dictDelete(
  body: {
    /** 删除的Ids */
    ids?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.requestSuccess>('/admin.php/system.dict/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑字典 修改 PUT /admin.php/system.dict/edit */
export async function dictEdit(body: API.dictModel, options?: { [key: string]: any }) {
  return request<API.baseList & { data?: { data?: API.dictModel } }>(
    '/admin.php/system.dict/edit',
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

/** 获取字典列表 查询列表 GET /admin.php/system.dict/list */
export async function dictList(options?: { [key: string]: any }) {
  return request<API.baseList & { data?: { data?: API.dictModel } }>(
    '/admin.php/system.dict/list',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 新增设置 POST /admin.php/system.setting/add */
export async function settingAdd(body: API.settingModel, options?: { [key: string]: any }) {
  return request<API.requestSuccess>('/admin.php/system.setting/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增分组 新增分组 POST /admin.php/system.setting/addGroup */
export async function settingAddGroup(options?: { [key: string]: any }) {
  return request<API.requestSuccess>('/admin.php/system.setting/addGroup', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除设置 DELETE /admin.php/system.setting/delete */
export async function settingDelete(
  body: {
    /** 删除的Ids */
    ids?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.requestSuccess>('/admin.php/system.setting/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑设置 修改 PUT /admin.php/system.setting/edit */
export async function settingEdit(body: API.settingModel, options?: { [key: string]: any }) {
  return request<API.baseList & { data?: { data?: API.settingModel } }>(
    '/admin.php/system.setting/edit',
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

/** 获取设置列表 查询列表 GET /admin.php/system.setting/list */
export async function settingList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.settingListParams,
  options?: { [key: string]: any },
) {
  const { int: param0, ...queryParams } = params;
  return request<API.baseList & { data?: { data?: API.settingModel } }>(
    '/admin.php/system.setting/list',
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 查询设置分组 查询列表 GET /admin.php/system.setting/querySettingGroup */
export async function settingQuerySettingGroup(options?: { [key: string]: any }) {
  return request<API.requestSuccess>('/admin.php/system.setting/querySettingGroup', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 保存设置 保存设置 POST /admin.php/system.setting/saveSetting */
export async function settingSaveSetting(options?: { [key: string]: any }) {
  return request<API.requestSuccess>('/admin.php/system.setting/saveSetting', {
    method: 'POST',
    ...(options || {}),
  });
}
