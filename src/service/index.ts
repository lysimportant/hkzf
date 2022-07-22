import HJRequest from "./request";
export const BASE_URL = "http://120.78.137.246:8881";
export const request_ = new HJRequest({
  baseURL: BASE_URL,
  timeout: 10000
});
