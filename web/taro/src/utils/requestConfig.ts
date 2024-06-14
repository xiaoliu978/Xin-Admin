// UmiJs 的请求配置
import Taro from "@tarojs/taro";
import type { RequestConfig} from './request';
import toast from './toast';
import {request} from "./request";
import {refreshUserToken} from "../api";
import storage from "./storage";

enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}

let baseUrlPrefix = ''
const env = process.env.NODE_ENV === 'development' ? 'development' : 'production'
console.log('编译环境：',process.env.NODE_ENV)
switch (env) {
  case 'development':
    baseUrlPrefix = 'http://127.0.0.1:8000'
    break
  case 'production':
    baseUrlPrefix = 'http://127.0.0.1:8000'
    break
}

const requestConfig: RequestConfig = {
  timeout: 5000,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  baseURL: baseUrlPrefix,
  // 请求拦截器
  requestInterceptors: [
    (config: any) => {
      let XUserToken = storage.get('x-user-token');
      if (XUserToken) {
        config.headers['x-user-token'] = XUserToken;
      }
      return { ...config };
    },
  ],
  responseInterceptors: [
    [
      async function (response: any) {
        if(response.data.status === 202) {
          try {
            // 登录状态过期，刷新令牌并重新发起请求
            let res = await refreshUserToken()
            storage.set('x-user-token', res.data.token);
            response.headers!.xUserToken = res.data.token;
            // 重新发送请求
            return await request(response.config.url!, response.config);

          }catch (e) {
            return Promise.reject(e);
          }
        }
        return response;
      },
      async function (response: any) {
        if(!response.response) {
          toast('error',`服务器异常: ${response.message}`);
          return Promise.reject(response);
        }
        let { success, status, msg, showType } = response.response.data;
        switch (status){
          case 500:
            // 服务器异常
            toast('error',`服务器异常: ${status}`);
            return Promise.reject(response);
          case 401:
            // 没有登录拒绝访问
            storage.clear();
            Taro.navigateTo({ url: '/pages/index/index' })
            return Promise.reject(response);
          case 403:
          case 400:
            // 预期用户操作错误
            if(success) return Promise.resolve(response);
            switch (showType) {
              case ErrorShowType.SILENT:
                // do nothing
                break;
              case ErrorShowType.WARN_MESSAGE:
                toast('none',msg);
                break;
              case ErrorShowType.ERROR_MESSAGE:
                toast('error',msg);
                break;
              case ErrorShowType.NOTIFICATION:
                toast('none',msg);
                break;
              case ErrorShowType.REDIRECT:
                // TODO: redirect
                break;
              default:
                toast('error',msg);
            }
            return Promise.reject(response);
          default:
            toast('error',`Response status:${response.data.status}`);
            return Promise.reject(response);
        }
      }
    ]
  ]
};

export default requestConfig;
