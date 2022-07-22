import React, { memo, useEffect, useState } from "react";
import style from "./map.module.css";
// import { Map, useMap, APILoader } from "@uiw/react-baidu-map";
import TopBar from "@/components/TopBar/topbar";
import { useNavigate } from "react-router-dom";
const BMapGL = window.BMapGL;
const labelStyle = {
  cursor: 'pointer',
  border: '0px solid rgb(255, 0, 0)',
  padding: '0px',
  whiteSpace: 'nowrap',
  fontSize: '12px',
  color: 'rgb(255, 255, 255)',
  textAlign: 'center'
}
const Map_ = memo(() => {
  const navigate = useNavigate();
  // const [point, setpoint] = useState<any>("成都");
  // 初始化地图
  function initMap() {
    // document.getElementsByClassName("BMap_smcbg")[0].innerHTML = "123"
    // document.getElementsByClassName("BMap_button_new")[1]
    const { label, value } = JSON.parse(
      window.sessionStorage.getItem("area") + ""
    );
    // ts报错.
    const map = new BMapGL.Map("container");
    // const _point = new BMapGL!.Point(116.404, 39.915);
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
          ); // 添加比例尺控件
          // map.addControl(new BMapGL.LocationControl(opts1));// 添加缩放控件
          // map.addControl(new BMapGL.ZoomControl());// 添加缩放控件
          // map.addControl(new BMapGL.CityListControl());// 添加城市列表控件
          map.addControl(
            new BMapGL.ZoomControl({ offset: new BMapGL.Size(10, 60) })
          );
          // 画图
          const opts = {
            position: point,
            offset: new BMapGL.Size(-35, -35)
          }
          const label_ = new BMapGL.Label(null, opts)
          label_.setContent(`
          <div class="${style.bubble}">
            <p class="${style.name}">广州</p>
            <p>99套</p>
          </div>
        `)
          // 设置样式
          label_.setStyle(labelStyle)
          // 添加点击事件
          label_.addEventListener("click", () => {
            console.log("覆盖物被点击了~")
          })
          // 渲染到地图
          map.addOverlay(label_)
          // 允许滑轮放大
          map.enableScrollWheelZoom(true);
          // map.addOverlay(
          //   new BMapGL.Marker(point, { title: label })
          // );
        } else {
          alert("您选择的地址没有解析到结果！");
        }
      },
      label
    );
    // map.centerAndZoom(_point, 15)
    // setpoint(_point);
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
      <div id="container" className={style.container}>
        {/* <APILoader akay="GTrnXa5hwXGwgQnTBG28SHBubErMKm3f">
          <Map center={point} enableScrollWheelZoom={false} />
        </APILoader> */}
      </div>
    </>
  );
});

export default Map_;
