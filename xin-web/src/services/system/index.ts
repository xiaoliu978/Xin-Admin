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

export const gitSetting = () => {
  return request<ResponseStructure>('/system.setting/list', {
    method: 'get',
  })
}