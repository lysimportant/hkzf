import React, { memo, useEffect, useState } from "react";
import TopBar from "@/components/TopBar/topbar";
import { Link } from "react-router-dom";
import { getAreaInfoThunkAction } from "@/store/features/map/thunk";
import { useAppDispatch } from "@/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { MapState } from "@/store/features/map/map-feature";
import style from "./search.module.css";
const HomeSearch = memo(() => {
  const dispatch = useAppDispatch();
  const select = useSelector<RootState, MapState>(state => state.MapSlice);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      console.log("获取定位");
      const myCity = new BMapGL!.LocalCity();
      myCity.get((res: any) => {
        select.area ? "" : dispatch(getAreaInfoThunkAction(res.name));
      });
      /*
        常用:latitude 纬度 longitude 经度
        知道: accuracy 经纬度的精度
              altitude 海拔高度
              altitudeAccuracy 海拔高度的精度
              heading 设备行进方向/
              speed 速度
      */
    });
  }, [select]);
  const left = (
    <Link to="/citylist" className={style.left}>
      <span>{select.area.length > 1 ? select.area : "北京"}</span>
      <i className="iconfont icon-arrow"></i>
    </Link>
  );
  const center = (
    <Link to={"/search"} className={style.center}>
      <i className="iconfont icon-seach"></i>
      <span>请输入小区或地址</span>
    </Link>
  );
  const right = (
    <Link to="/map">
      <i
        style={{ fontSize: "20px", color: "#fff" }}
        className="iconfont icon-map"
      ></i>
    </Link>
  );
  return (
    <div className="home-search">
      <TopBar
        left={left}
        center={center}
        right={right}
        leftBg="#fff"
        centerBg="#fff"
        rightBg="transparent"
      ></TopBar>
    </div>
  );
});

export default HomeSearch;
