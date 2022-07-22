import axios, { AxiosResponse } from "axios";
import type { AxiosRequestConfig, AxiosInstance } from "axios";
import { Toast } from "antd-mobile";

interface AxiosInterceptor<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (err: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (err: any) => any;
}
interface HJConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptor?: AxiosInterceptor<T>;
  show?: boolean;
}
class HJRequest {
  instance: AxiosInstance;
  show?: boolean;
  interceptor?: AxiosInterceptor;
  constructor(config: HJConfig) {
    this.show = true;
    console.log(config, this.show);
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
        this.show &&
          Toast.show({
            icon: "loading",
            content: "加载中…"
          });
        return config;
      },
      error => {
        this.show && Toast.clear();
        return error;
      }
    );

    this.instance.interceptors.response.use(
      res => {
        this.show && Toast.clear();
        return res.data;
      },
      error => {
        this.show && Toast.clear();
        return error;
      }
    );
  }

  request<T>(config: HJConfig<T>): Promise<T> {
    console.log("要开启Loading吗?", config);
    this.show = config.show ?? this.show;
    return new Promise((resolve, reject) => {
      if (config.interceptor?.requestInterceptor) {
        config = config.interceptor?.requestInterceptor(config);
      }
      this.instance.request<any, T>(config).then(res => {
        if (config.interceptor?.responseInterceptor) {
          res = config.interceptor.responseInterceptor(res);
        }
        this.show = false;
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
