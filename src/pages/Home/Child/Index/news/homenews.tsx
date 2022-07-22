import React, { memo, useEffect, useState } from "react";
import { returnAxiosMapBody } from "@/hooks";
import { getHomeNews } from "@/service/Index/index_";

import style from "./news.module.css";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import type { MapState } from "@/store/features/map/map-feature";
const HomeNews = memo(() => {
  const selectMap = useSelector<RootState, MapState>(state => state.MapSlice);
  const [news, SetNews] = useState([]);
  useEffect(() => {
    returnAxiosMapBody(getHomeNews(selectMap.value), true).then(res => {
      SetNews(res);
    });
  }, []);
  return (
    <div className={style.newContainer}>
      <h2>最新资讯</h2>
      {news.map((item: any) => {
        return (
          <div key={item.title} className={style.newContainerItem}>
            <img src={item.imgSrc} alt="" />
            <div className={style.content}>
              <h1>{item.title}</h1>
              <div>
                <span>{item.from}</span> <span>{item.date}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default HomeNews;
