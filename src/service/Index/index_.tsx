import { request_ } from "../index";

/**
 * 请求轮播图数据
 * @param {}
 * */
export const getHomeIndexBanner = () => {
  return request_.get({ url: "/home/swiper" });
};

/**
 * 获取租房小组的信息
 * @param {String} - area 地理信息
 */
export const getHomeGroup = (area: string) => {
  return request_.get({ url: "/home/groups", params: { area } });
};

/**
 * 获取资讯数据
 * @param {String} - area 地理信息
 */
export const getHomeNews = (area: string) => {
  return request_.get({ url: "/home/news", params: { area } });
};
