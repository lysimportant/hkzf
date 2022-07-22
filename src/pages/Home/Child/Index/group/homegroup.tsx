import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import type { MapState } from "@/store/features/map/map-feature";

import { returnAxiosMapBody } from "@/hooks";
import { getHomeGroup } from "@/service/Index/index_";

import style from "./group.module.css";

const HomeGroup = memo(() => {
  const select = useSelector<RootState, MapState>(state => state.MapSlice);
  const [group, SetGroup] = useState([]);
  useEffect(() => {
    returnAxiosMapBody(getHomeGroup(select.value), true).then(res => {
      SetGroup(res);
    });
  }, []);
  return (
    <div className={style.home_group}>
      <header>
        <h1>租房小组</h1>
        <span>更多</span>
      </header>
      <div className={style.home_group_container}>
        {group.map((item: any) => {
          return (
            <div key={item.id} className={style.home_group_container_item}>
              <div className="left">
                <h1>{item.title}</h1>
                <span>{item.desc}</span>
              </div>
              <img src={item.imgSrc} alt="" className="right" />
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default HomeGroup;
