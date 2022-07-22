import React, { memo, useEffect, useState } from "react";

import { returnAxiosMapBody } from "@/hooks";
import { getHomeIndexBanner } from "@/service/Index/index_";
import HomeSearch from "../search/homesearch";

import style from "./style.module.css";
import { Swiper } from "antd-mobile";
const HomeIndexBanner = memo(props => {
  const [swipers, SetSwipers] = useState([]);

  useEffect(() => {
    returnAxiosMapBody(getHomeIndexBanner()).then(res => {
      SetSwipers(res);
    });
  }, []);

  return (
    <div className={style.swiper_container}>
      <HomeSearch></HomeSearch>
      {swipers.length > 1 && (
        <Swiper autoplay loop>
          {swipers.map((src: string, index: number) => (
            <Swiper.Item key={index}>
              <div className={style.swiper_item}>
                <img src={src} alt="" />
              </div>
            </Swiper.Item>
          ))}
        </Swiper>
      )}
    </div>
  );
});

export default HomeIndexBanner;
