import React, { memo } from "react";
import { BASE_URL } from "@/service";
import style from "../map.module.css";
const MapShowHouses = memo((props: { list: any[] }) => {
  const { list } = props;
  return (
    <>
      {list.map((item: any, index) => {
        return (
          <div key={index} className={style.house}>
            <div className={style.imgWrap}>
              <img
                className={style.img}
                src={`${BASE_URL}${item.houseImg}`}
                alt=""
              />
            </div>
            <div className={style.content}>
              <h1 className={style.title}>{item.desc}</h1>
              <div className={style.desc}>{item.title}</div>
              <div>
                {item.tags.length &&
                  item.tags.map((ta: string, index: number) => {
                    const cls = "tag" + (index + 1);
                    return (
                      <span
                        key={ta}
                        className={[style.tag, style[cls]].join(" ")}
                      >
                        {ta}
                      </span>
                    );
                  })}
              </div>
              <div className={style.price}>
                <span className={style.priceNum}>{item?.price}</span>元/月
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
});

export default MapShowHouses;
