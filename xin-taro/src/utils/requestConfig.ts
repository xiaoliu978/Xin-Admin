// UmiJs 的请求配置
import type { AxiosResponse , RequestConfig} from './request';
import toast from './toast';
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}

interface ResponseStructure<T> {
  success: boolean
  data: T
  errorCode?: number
  msg?: string
  showType?: number
  status?: number
}

let baseUrlPrefix = ''
const env = process.env.NODE_ENV === 'development' ? 'development' : 'production'
console.log('编译环境：',process.env.NODE_ENV)
switch (env) {
  case 'development':
    baseUrlPrefix = 'http://127.0.0.1:8000'
    break
  case 'production':
    baseUrlPrefix = 'https://127.0.0.1:8000'
    break
}

const requestConfig: RequestConfig = {
  timeout: 5000,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  baseURL: baseUrlPrefix,
  errorConfig: {
    errorThrower: (res: ResponseStructure<any>) => {
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
        const errorInfo: ResponseStructure<any> | undefined = error.info;
        if (errorInfo) {
          const { msg } = errorInfo;
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              toast('warn',msg);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              toast('fail',msg);
              break;
            case ErrorShowType.NOTIFICATION:
              toast('text',msg);
              break;
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break;
            default:
              toast('fail',msg);
          }
        }
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        toast('fail','请求超时');
      } else {
        // 发送请求时出了点问题！
        toast('fail','发送请求时出了点问题！');
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
    // @ts-ignore
    async (response: AxiosResponse): Promise<AxiosResponse> => {
      // 拦截响应数据，进行个性化处理
      // 没有登录拒绝访问
      if (response.data.status === 403) {
        localStorage.removeItem('token')
        return Promise.resolve(response);
      }
      // 登录状态过期，刷新令牌并重新发起请求
      if (response.data.status === 409) {

      }
      if (response.data.status !== 200) {
        return Promise.reject(response);
      }
      return Promise.resolve(response);
    }
  ],
};

export default requestConfig;
