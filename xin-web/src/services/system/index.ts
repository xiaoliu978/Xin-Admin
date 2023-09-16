/**
 * 系统服务接口
 */

import { request } from '@umijs/max';

/**
 * 获取系统字典
 */
export const gitDict = () => {
  return request<ResponseStructure>('/system.dictItem/dictList', {
    method: 'get',
  })
}

export const getSettingGroup = () => {
  return request<ResponseStructure>('/system.setting/querySettingGroup', {
    method: 'get',
  })
}

export const querySettingPid = () => {
  return request<ResponseStructure>('/system.setting/querySettingPid', {
    method: 'get',
  })
}

export const addGroup = (data: {
  key: string,
  title: string,
  pid?: number
}) => {
  return request<ResponseStructure>('/system.setting/addGroup', {
    method: 'post',
    data
  })
}