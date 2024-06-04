// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 新增 POST /admin.php/test_table/add */
export async function testTableAdd(body: API.testTableModel, options?: { [key: string]: any }) {
  return request<API.requestSuccess>('/admin.php/test_table/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除 DELETE /admin.php/test_table/delete */
export async function testTableDelete(
  body: {
    /** 删除的Ids */
    ids?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.requestSuccess>('/admin.php/test_table/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑 修改 PUT /admin.php/test_table/edit */
export async function testTableEdit(body: API.testTableModel, options?: { [key: string]: any }) {
  return request<API.baseList & { data?: { data?: API.testTableModel } }>(
    '/admin.php/test_table/edit',
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

/** 查询列表 查询列表 GET /admin.php/test_table/list */
export async function testTableList(options?: { [key: string]: any }) {
  return request<API.baseList & { data?: { data?: API.testTableModel } }>(
    '/admin.php/test_table/list',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}
