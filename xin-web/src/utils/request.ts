import { RefreshToken } from '@/services/admin';
import { history, request } from '@umijs/max';
import { message,notification } from 'antd';
import type { AxiosResponse } from '@umijs/max'
// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}

const requestConfig = {
  // 统一的请求设定
  baseURL: 'https://xineny.cn/admin.php',
  timeout: 5000,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },

  errorConfig: {
    errorThrower: (res: ResponseStructure) => {
      const { success, data, errorCode, msg, showType } = res;
      if (!success) {
        const error: any = new Error(msg);
        error.name = 'BizError';
        error.info = { errorCode, msg, showType, data };
        throw error;
      }
    },
    // 错误接收及处理
    errorHandler: async (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { msg, errorCode } = errorInfo;
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warning(msg);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(msg);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: msg,
                message: errorCode,
              });
              break;
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break;
            default:
              message.error(msg);
          }
        }
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        message.error('请求超时，请稍后再试！');
      } else {
        // 发送请求时出了点问题！
        message.error('发送请求时出了点问题！');
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    (config: any) => {
      // 拦截请求配置，进行个性化处理。
      let token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = token;
      }
      // const url = config.url.concat('?token = 123');
      return { ...config };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    async (response: AxiosResponse): Promise<AxiosResponse> => {
      // 拦截响应数据，进行个性化处理
      // 没有登录拒绝访问
      if (response.data.status === 403) {
        message.error('请先登录！');
        history.push('/login');
        return Promise.resolve(response);
      }
      // 登录状态过期，刷新令牌并重新发起请求
      if (response.data.status === 409) {
        let res = await RefreshToken()
        if (res.success) {
          localStorage.setItem('token', res.data.token);
          response.headers!.Authorization = res.data.token;
          // 重新发送请求
          let ress = await request(response.config.url!,response.config);
          return Promise.resolve(ress);
        } else {
          return Promise.reject(res);
        }
      }
      return Promise.resolve(response);
    }
  ],
};

export default requestConfig;