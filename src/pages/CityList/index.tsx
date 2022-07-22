import React, { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { getMapCity } from "@/service/map/map-api";
import { useAppDispatch } from "@/hooks";
import { MapState, saveMapList } from "@/store/features/map/map-feature";
import { formatCityData } from "@/utils/format";

import TopBar from "@/components/TopBar/topbar";
import VirtualList from "./Child/virtual-list";
import style from "./style.module.css";

import type { RootState } from "@/store";

const CityList = memo(() => {
  // state
  const navigate = useNavigate();
  const selectMap = useSelector<RootState, MapState>(state => state.MapSlice);
  const dispatch = useAppDispatch();
  // hooks
  useEffect(() => {
    selectMap.mapList.cityIndex.length > 0
      ? null
      : getMapCity().then((res: any) => {
          const obj = { label: selectMap.area, value: selectMap.value };
          dispatch(saveMapList(formatCityData(res.body, obj)));
        });
  }, [selectMap]);
  // render
  return (
    <div className={style.cityContainer}>
      <header>
        <TopBar
          height="44px"
          left={
            <i onClick={() => navigate(-1)} className="iconfont icon-back"></i>
          }
          center={<div className={style.center}>城市选择</div>}
        ></TopBar>
      </header>
      <section>
        <VirtualList></VirtualList>
      </section>
    </div>
  );
});

export default CityList;
