import { request } from '@umijs/max';


interface XinApi {
   (
      url: string,
      params?: {
        keyword?: string;
        current?: number;
        pageSize?: number;
      } | { [key: string]: any },
      data?: { [key: string]: any },
      options?: { [key: string]: any }
    ): Promise<API.ResponseStructure<any>>
}

export const listApi: XinApi = (url,params,options) =>  {
  return request<API.ResponseStructure<any>>(url, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export const addApi: XinApi = (url,data,options) => {
  return request<API.ResponseStructure<any>>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
    ...(options || {}),
  });
}

export const editApi: XinApi = (url,data,options) =>  {
  return request<API.ResponseStructure<any>>(url, {
    method: 'PUT',
    data: { ...data },
    ...(options || {}),
  });
}

export const deleteApi: XinApi = (url,params,options) => {
  return request<API.ResponseStructure<any>>(url, {
    method: 'DELETE',
    params: { ...params },
    ...(options || {}),
  });
}

// interface XinApi {
//
//   url: string,
//   params?: {
//     keyword?: string;
//     current?: number;
//     pageSize?: number;
//   } | { [key: string]: any },
//   data?: { [key: string]: any },
//   options?: { [key: string]: any }
//
// }
//
// export function listApi<T>(props: XinApi){
//   const { url,params,options } = props
//   return request<API.ResponseStructure<T>>(url, {
//     method: 'GET',
//     params: {
//       ...params,
//     },
//     ...(options || {}),
//   });
// }
//
//
// export function addApi<T>(props: XinApi){
//   const { url,data,options } = props;
//   return request<API.ResponseStructure<T>>(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     data: data,
//     ...(options || {}),
//   });
// }
//
// export function editApi<T>(props:XinApi){
//   const { url,params,options } = props
//   return request<API.ResponseStructure<T>>(url, {
//     method: 'GET',
//     params: { ...params },
//     ...(options || {}),
//   });
// }
//
// export function deleteApi<T>(props:XinApi){
//   const { url,params,options } = props;
//   return request<API.ResponseStructure<T>>(url, {
//     method: 'DELETE',
//     params: { ...params },
//     ...(options || {}),
//   });
// }
