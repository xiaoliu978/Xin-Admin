import { request } from '@umijs/max';

export const gitDict = () => {
  return request<ResponseStructure>('/system.dictItem/dictList', {
    method: 'get',
  })
}