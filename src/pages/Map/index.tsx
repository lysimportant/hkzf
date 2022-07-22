import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAreaHouseInfo, getCommunityHouseData } from "@/service/map/map-api";
import { Link } from "react-router-dom";
import TopBar from "@/components/TopBar/topbar";
import MapShowHouses from "./Child/house";
import { labelStyle } from "./config";
import style from "./map.module.css";
const BMapGL = window.BMapGL;

const Map_ = memo(() => {
  const navigate = useNavigate();
  const [houseLists, SetHousesList] = useState([]);
  const [showList, SetShowList] = useState(false);

  // 初始化地图
  function initMap() {
    const { label, value } = JSON.parse(
      window.sessionStorage.getItem("area") + ""
    );
    const map = new BMapGL.Map("container");
    //创建地址解析器实例
    const myGeo = new BMapGL.Geocoder();
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(
      label,
      function (point: any) {
        if (point) {
          // 地图初始化
          map.centerAndZoom(point, 11);
          // 添加控件
          map.addControl(
            new BMapGL.ScaleControl({
              offset: new BMapGL.Size(10, 60)
            })
          );
          map.addControl(
            new BMapGL.ZoomControl({ offset: new BMapGL.Size(10, 60) })
          );
          map.enableScrollWheelZoom(true); // 允许滑轮放大
          getHouseInfo(value, map);
        } else {
          alert("您选择的地址没有解析到结果！");
        }
      },
      label
    );
    map.addEventListener("movestart", () => {
      showList && SetShowList(false);
    });
  }
  // 获取放大级别
  function getTypeAndZoom(map: any) {
    const zoom = map.getZoom();
    let nextZoom;
    let type;
    if (zoom >= 10 && zoom < 12) {
      // 区
      nextZoom = 13; // 下一级缩放
      type = "circle"; // 绘制原型
    } else if (zoom >= 12 && zoom < 14) {
      nextZoom = 15; // 下一级缩放
      type = "circle"; // 绘制原型
    } else if (zoom >= 14 && zoom < 16) {
      type = "rect"; // 绘制矩形
    }
    return { nextZoom, type };
  }
  // 创建区
  function createCircle(item: any, map: any) {
    const {
      coord: { latitude, longitude },
      label,
      count,
      value,
      next
    } = item;

    const point = new BMapGL.Point(longitude, latitude);
    const opts = {
      position: point,
      offset: new BMapGL.Size(-35, -35)
    };
    const label_ = new BMapGL.Label(null, opts);
    label_.setContent(`
   <div class="${style.bubble}">
     <p class="${style.name}">${label}</p>
     <p>${count}套</p>
   </div>
 `);
    // 设置样式
    label_.setStyle(labelStyle);
    // 添加点击事件
    label_.addEventListener("click", () => {
      getHouseInfo(value, map);
      map.centerAndZoom(point, next);
      map.clearOverlays();
    });
    // 渲染到地图
    map.addOverlay(label_);
  }
  // 创建小区
  function createRect(item: any, map: any) {
    const {
      coord: { latitude, longitude },
      label,
      count,
      value
    } = item;

    const point = new BMapGL.Point(longitude, latitude);
    const opts = {
      position: point,
      offset: new BMapGL.Size(-50, -28)
    };
    const label_ = new BMapGL.Label(null, opts);
    label_.setContent(`
     <div class="${style.rect}">
       <span class="${style.housename}">${label}</span>
       <span class="${style.housenum}">${count}套</span>
       <i class="${style.arrow}"></i>
     </div>
   `);
    // 设置样式
    label_.setStyle(labelStyle);
    // 添加点击事件
    label_.addEventListener("click", (e: any) => {
      // 请求房子数据
      const target = e.domEvent.changedTouches[0];
      getHouseData(value);
      map.panBy(
        window.innerWidth / 2 - target.clientX,
        (window.innerHeight - 330) / 2 - target.clientY
      );
    });
    // 渲染到地图
    map.addOverlay(label_);
  }
  // 判断创建的类型
  function createOverlays(item: any, type: string, map: any, next?: number) {
    item.next = next;
    if (type === "circle") {
      createCircle(item, map);
    } else {
      createRect(item, map);
    }
  }
  async function getHouseInfo(value: string, map: any) {
    const res_: any = await getAreaHouseInfo(value);
    console.log(res_);
    const { type, nextZoom } = getTypeAndZoom(map);
    res_?.body.forEach((item: any) => {
      createOverlays(item, type as string, map, nextZoom);
    });
  }
  // 获取详细的房屋数据源
  async function getHouseData(id: string) {
    const res: any = await getCommunityHouseData(id);
    console.log(res.body.list);
    SetHousesList(res.body.list);
    SetShowList(true);
  }
  useEffect(() => {
    initMap();
  }, []);
  return (
    <>
      <TopBar
        height="44px"
        left={
          <i onClick={() => navigate(-1)} className="iconfont icon-back"></i>
        }
        center={<div className={style.center}>地图找房</div>}
      ></TopBar>
      <div id="container" className={style.container}></div>
      {/* 房源数据列表 */}
      <div className={[style.houseList, showList ? style.show : " "].join(" ")}>
        <header className={style.listWrap}>
          <h1 className={style.listTitle}>房屋列表</h1>
          <Link to="/home/list" className={style.titleMore}>
            更多房源
          </Link>
        </header>
        <div className={style.houseItems}>
          <MapShowHouses list={houseLists}></MapShowHouses>
        </div>
      </div>
    </>
  );
});
Map_.displayName = "Map";
export default Map_;
