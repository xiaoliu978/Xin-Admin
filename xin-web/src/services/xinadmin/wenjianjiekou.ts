// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除文件 基础控制器删除方法 DELETE /admin.php/file.file/delete */
export async function fileDelete(
  body: {
    /** 删除的Ids */
    ids?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.requestSuccess>('/admin.php/file.file/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑文件记录 修改 PUT /admin.php/file.file/edit */
export async function fileEdit(body: API.fileModel, options?: { [key: string]: any }) {
  return request<API.baseList & { data?: { data?: API.fileModel } }>('/admin.php/file.file/edit', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询文件列表 查询列表 GET /admin.php/file.file/list */
export async function fileList(options?: { [key: string]: any }) {
  return request<API.baseList & { data?: { data?: API.fileModel } }>('/admin.php/file.file/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 新增文件分组 POST /admin.php/file.group/add */
export async function fileGroupAdd(body: API.fileGroupModel, options?: { [key: string]: any }) {
  return request<API.requestSuccess>('/admin.php/file.group/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除文件分组 删除商品分组 DELETE /admin.php/file.group/delete */
export async function fileGroupDelete(
  body: {
    /** 删除的Ids */
    ids?: string;
  },
  options?: { [key: string]: any },
) {
  return request<API.requestSuccess>('/admin.php/file.group/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 编辑文件分组 修改 PUT /admin.php/file.group/edit */
export async function fileGroupEdit(body: API.fileGroupModel, options?: { [key: string]: any }) {
  return request<API.baseList & { data?: { data?: API.fileGroupModel } }>(
    '/admin.php/file.group/edit',
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

/** 文件分组列表列表 查询列表 GET /admin.php/file.group/list */
export async function fileGroupList(options?: { [key: string]: any }) {
  return request<API.baseList & { data?: { data?: API.fileGroupModel } }>(
    '/admin.php/file.group/list',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 未知文件上传接口 POST /admin.php/file.upload/annex */
export async function fileUploadAnnex(
  body: {
    /** 分组ID */
    group_id?: number;
    /** 文件 */
    file?: Record<string, any>;
  },
  options?: { [key: string]: any },
) {
  return request<API.requestSuccess>('/admin.php/file.upload/annex', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 图片上传接口 POST /admin.php/file.upload/image */
export async function fileUploadImage(
  body: {
    /** 分组ID */
    group_id?: number;
    /** 文件 */
    file?: Record<string, any>;
  },
  options?: { [key: string]: any },
) {
  return request<API.requestSuccess>('/admin.php/file.upload/image', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 音频文件上传接口 POST /admin.php/file.upload/mp3 */
export async function fileUploadMp3(
  body: {
    /** 分组ID */
    group_id?: number;
    /** 文件 */
    file?: Record<string, any>;
  },
  options?: { [key: string]: any },
) {
  return request<API.requestSuccess>('/admin.php/file.upload/mp3', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 视频上传接口 POST /admin.php/file.upload/video */
export async function fileUploadVideo(
  body: {
    /** 分组ID */
    group_id?: number;
    /** 文件 */
    file?: Record<string, any>;
  },
  options?: { [key: string]: any },
) {
  return request<API.requestSuccess>('/admin.php/file.upload/video', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 压缩文件上传接口 POST /admin.php/file.upload/zip */
export async function fileUploadZip(
  body: {
    /** 分组ID */
    group_id?: number;
    /** 文件 */
    file?: Record<string, any>;
  },
  options?: { [key: string]: any },
) {
  return request<API.requestSuccess>('/admin.php/file.upload/zip', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
