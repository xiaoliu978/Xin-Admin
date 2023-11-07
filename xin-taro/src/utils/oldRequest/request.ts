import Taro from '@tarojs/taro';
import apiConfig from "./apiConfig";
import toast from '../toast';

//网络请求拦截器
const interceptor: Taro.interceptor = function (chain) {
  const requestParams = chain.requestParams
  let token = Taro.getStorageSync('TOKEN') //拿到本地缓存中存的token
  if(token) {
    requestParams.header = {
      ...requestParams.header,
      Authorization: 'Bearer ' + token //将token添加到头部
    }
  }
  return chain.proceed(requestParams).then(res => { return res })
}

Taro.addInterceptor(interceptor)

enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}

const request = async (method, url, params) => {
  //由于post请求时习惯性query参数使用params，body参数使用data，而taro只有data参数，使用contentType作为区分，因此此处需要做一个判断
  let contentType = params?.data ? 'application/json' : 'application/x-www-form-urlencoded';
  if (params) contentType = params?.headers?.contentType || contentType;
  const option = {
    method,
    isShowLoading: false,
    url: apiConfig.baseUrl + url,
    data: params && (params?.data || params?.params),
    header: {
      'content-type': contentType,
    },
    success(res) {
      const {data, msg} = res;
      if(data.success) {

      }else {
        switch (res.showType) {
          case ErrorShowType.SILENT:
            // do nothing
            break;
          case ErrorShowType.WARN_MESSAGE:
            toast('warn',msg)
            break;
          case ErrorShowType.ERROR_MESSAGE:
            toast('fail',msg)
            break;
          case ErrorShowType.NOTIFICATION:
            toast('text',msg)
            break;
          case ErrorShowType.REDIRECT:
            // TODO: redirect
            break;
          default:
            toast('fail',msg)
        }
      }
    },
    error() {
      toast('fail','请求接口出现问题')
    }
  }
  const resp = await Taro.request(option);
  return resp.data;
}

export default {
  get: (url, config = {})  => {
    return request('GET', url, config);
  },
  post: (url, config = {}) => {
    return request('POST', url, config);
  },
  put: (url, config = {}) => {
    return request('PUT', url, config);
  },
  delete: (url, config = {}) => {
    return request('DELETE', url, config);
  },
  patch: (url, config = {}) => {
    return request('PATCH', url, config);
  },
}
