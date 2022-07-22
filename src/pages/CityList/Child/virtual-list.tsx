import React, { createRef, memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/hooks";
import { useNavigate } from "react-router-dom";

import { initState } from "@/store/features/map/map-feature";
import { RootState } from "@/store";
import { MapState } from "@/store/features/map/map-feature";
import { formatCityIndex } from "@/utils/format";
import { HotCity } from "@/utils/format";
// import { AutoSizer } from 'react-virtualized'
import { Toast } from "antd-mobile";
import List from "react-virtualized/dist/commonjs/List";
import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";

import style_ from "../style.module.css";
// List data as an array of strings
// const list = Array(100).fill("text");
interface rowR {
  key: string;
  index: number;
  isScrolling: boolean;
  isVisible: boolean;
  style: any;
}

const VirtualList = memo(() => {
  // 当前索引值
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const listRef = createRef();
  const [activeIndex, SetActiveIndex] = useState(0);
  const [flag, SetFlag] = useState(false);
  const selectMap = useSelector<RootState, MapState>(state => state.MapSlice);
  // 列表选择函数
  function changeCity(item: any) {
    const flag = HotCity.findIndex(city => city.label === item.label);
    if (flag !== -1) {
      navigate(-1);
      return dispatch(initState(item));
    }
    Toast.show({
      content: `${item.label} 暂无房源数据`
    });
  }
  function rowRenderer({ key, index, isScrolling, isVisible, style }: rowR) {
    const { cityIndex, cityList } = selectMap.mapList;
    // 字母索引集合
    const letter = cityIndex[index];
    // 获取指定字母索引下的城市列表数据

    return (
      <div key={key} style={style} className={style_.city}>
        <div className={style_.title}>{formatCityIndex(letter)}</div>
        {cityList[letter]?.map((item: any) => (
          <div
            onClick={() => changeCity(item)}
            key={item.value}
            className={style_.name}
          >
            {item.label === "" ? "暂无定位信息" : item.label}
          </div>
        ))}
      </div>
    );
  }
  // 计算每一个行的高度
  function getROwHeight(e: any): number {
    const { cityIndex, cityList } = selectMap.mapList;
    return 36 + cityList[cityIndex[e.index]]?.length * 50;
  }
  // list组件渲染信息
  function onRowsRendered(e: any) {
    e.startIndex !== activeIndex ? SetActiveIndex(e.startIndex) : null;
    // 提前计算高度
  }
  // 滚动到对应的行数
  function scrollToRow(index: number) {
    SetActiveIndex(index);
    listRef.current && listRef.current.scrollToRow(index);
  }
  //
  setTimeout(() => {
    SetFlag(true);
  }, 1000);
  useEffect(() => {
    flag && listRef.current && listRef.current.measureAllRows();
  }, [flag]);
  return (
    <>
      <AutoSizer>
        {({ height, width }) => (
          <List
            ref={listRef}
            height={height}
            rowCount={selectMap.mapList.cityIndex.length}
            rowHeight={getROwHeight}
            rowRenderer={rowRenderer}
            width={width}
            onRowsRendered={onRowsRendered}
            scrollToAlignment={"start"}
          />
        )}
      </AutoSizer>
      <div className={style_.cityindexcontainer}>
        <ul className="city-index">
          {selectMap.mapList.cityIndex.map((item, index) => (
            <li
              onClick={() => scrollToRow(index)}
              className={index === activeIndex ? style_.active : ""}
              key={item}
            >
              {item === "hot" ? "热" : item?.toUpperCase()}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
});

export default VirtualList;
