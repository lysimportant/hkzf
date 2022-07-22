import axios, { AxiosResponse } from "axios";
import type { AxiosRequestConfig, AxiosInstance } from "axios";

interface AxiosInterceptor<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (err: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (err: any) => any;
}
interface HJConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptor?: AxiosInterceptor<T>;
}
class HJRequest {
  instance: AxiosInstance;
  interceptor?: AxiosInterceptor;
  constructor(config: HJConfig) {
    this.interceptor = config.interceptor;
    this.instance = axios.create(config);
    // 实例拦截器
    this.instance.interceptors.request.use(
      this.interceptor?.requestInterceptor,
      this.interceptor?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptor?.responseInterceptor,
      this.interceptor?.responseInterceptorCatch
    );
    // 全局拦截器
    this.instance.interceptors.request.use(
      config => {
        return config;
      },
      error => error
    );

    this.instance.interceptors.response.use(
      res => {
        return res.data;
      },
      error => error
    );
  }

  request<T>(config: HJConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptor?.requestInterceptor) {
        config = config.interceptor?.requestInterceptor(config);
      }
      this.instance.request<any, T>(config).then(res => {
        if (config.interceptor?.responseInterceptor) {
          res = config.interceptor.responseInterceptor(res);
        }
        resolve(res);
      });
    });
  }
  get<T>(config: HJConfig<T>): Promise<T> {
    return this.request({ ...config, method: "GET" });
  }
  post<T>(config: HJConfig<T>): Promise<T> {
    return this.request({ ...config, method: "POST" });
  }
  delete<T>(config: HJConfig<T>): Promise<T> {
    return this.request({ ...config, method: "DELETE" });
  }
  put<T>(config: HJConfig<T>): Promise<T> {
    return this.request({ ...config, method: "PATCH" });
  }
}

export default HJRequest;
