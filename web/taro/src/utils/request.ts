// 迁移 Umi Max 封装 request 使 Xin Admin Api 统一
import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from 'axios';
import requestMax from "./requestConfig";

// request 方法 opts 参数的接口
interface IRequestOptions extends AxiosRequestConfig {
  skipErrorHandler?: boolean;
  requestInterceptors?: IRequestInterceptorTuple[];
  responseInterceptors?: IResponseInterceptorTuple[];
  [key: string]: any;
}

type RequestError = AxiosError | Error

interface IErrorHandler {
  (error: RequestError, opts: IRequestOptions): void;
}

type IRequestInterceptor = (config: IRequestOptions) => IRequestOptions;
type IErrorInterceptor = (error: Error) => Promise<Error>;
type IResponseInterceptor = <T = any>(response : AxiosResponse<T>) => AxiosResponse<T> ;
type IRequestInterceptorTuple = [IRequestInterceptor , IErrorInterceptor] | [ IRequestInterceptor ] | IRequestInterceptor
type IResponseInterceptorTuple = [IResponseInterceptor, IErrorInterceptor] | [IResponseInterceptor] | IResponseInterceptor

export interface RequestConfig<T = any> extends AxiosRequestConfig {
  errorConfig?: {
    errorHandler?: IErrorHandler;
    errorThrower?: ( res: T ) => void
  };
  requestInterceptors?: IRequestInterceptorTuple[];
  responseInterceptors?: IResponseInterceptorTuple[];
}

let requestInstance: AxiosInstance;
let config: RequestConfig;
const getConfig = (): RequestConfig => {
  if (config) return config;
  config = requestMax;
  return config;
};

const getRequestInstance = (): AxiosInstance => {
  if (requestInstance) return requestInstance;
  const config = getConfig();
  requestInstance = axios.create(config);

  config?.requestInterceptors?.forEach((interceptor) => {
    if(interceptor instanceof Array){
      requestInstance.interceptors.request.use((config) => {
        if(interceptor[0].length === 2){
          const { url: newUrl, options } = interceptor[0](config);
          return { ...options, url: newUrl };
        }
        return interceptor[0](config);
      }, interceptor[1]);
    } else {
      requestInstance.interceptors.request.use((config) => {
        if(interceptor.length === 2){
          const { url: newUrl, options } = interceptor(config);
          return { ...options, url: newUrl };
        }
        return interceptor(config);
      })
    }
  });

  config?.responseInterceptors?.forEach((interceptor) => {
    interceptor instanceof Array ?
      requestInstance.interceptors.response.use(interceptor[0], interceptor[1]):
      requestInstance.interceptors.response.use(interceptor);
  });

  // 当响应的数据 success 是 false 的时候，抛出 error 以供 errorHandler 处理。
  requestInstance.interceptors.response.use((response) => {
    const { data } = response;
    if(data?.success === false && config?.errorConfig?.errorThrower){
      config.errorConfig.errorThrower(data);
    }
    return response;
  })
  return requestInstance;
};

function request<T>(url: string, opts: IRequestOptions = { method: 'GET' }){
  const requestInstance = getRequestInstance();
  const config = getConfig();
  const { getResponse = false, requestInterceptors, responseInterceptors } = opts;
  const requestInterceptorsToEject = requestInterceptors?.map((interceptor) => {
    if(interceptor instanceof Array){
      return requestInstance.interceptors.request.use((config) => {
        if(interceptor[0].length === 2){
          const { url: newUrl, options } = interceptor[0](config);
          return { ...options, url: newUrl };
        }
        return interceptor[0](config);
      }, interceptor[1]);
    } else {
      return requestInstance.interceptors.request.use((config) => {
        if(interceptor.length === 2){
          const { url: newUrl, options } = interceptor(config);
          return { ...options, url: newUrl };
        }
        return interceptor(config);
      })
    }
  });
  const responseInterceptorsToEject = responseInterceptors?.map((interceptor) => {
    return interceptor instanceof Array ?
      requestInstance.interceptors.response.use(interceptor[0], interceptor[1]):
      requestInstance.interceptors.response.use(interceptor);
  });
  return new Promise<T>((resolve, reject)=>{
    requestInstance
      .request({...opts, url})
      .then((res)=>{
        requestInterceptorsToEject?.forEach((interceptor) => {
          requestInstance.interceptors.request.eject(interceptor);
        });
        responseInterceptorsToEject?.forEach((interceptor) => {
          requestInstance.interceptors.response.eject(interceptor);
        });
        resolve(getResponse ? res : res.data);
      })
      .catch((error)=>{
        requestInterceptorsToEject?.forEach((interceptor) => {
          requestInstance.interceptors.request.eject(interceptor);
        });
        responseInterceptorsToEject?.forEach((interceptor) => {
          requestInstance.interceptors.response.eject(interceptor);
        });
        try {
          const handler =
            config?.errorConfig?.errorHandler;
          if(handler)
            handler(error, opts);
        } catch (e) {
          reject(e);
        }
        reject(error);
      })
  })
}

export {
  request,
  getRequestInstance,
};

export type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  RequestError,
};
