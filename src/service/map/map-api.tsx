import { request_ } from "../index";

/**
 * 请求城市数据
 * @param {}
 * */
export const getMapAreaInfo = (name: string) => {
  return request_.get({ url: "/area/info", params: { name } });
};

/**
 * 获取城市列表数据
 * @param {Integer} - label 数据选择 1 一级 2 二级城市列表
 * */
export const getMapCity = (level = 1) => {
  return request_.get({ url: "area/city", params: { level } });
};
