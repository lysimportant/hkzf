import React, { memo } from "react";
import style from "./topbar.module.css";
interface Props {
  left?: any;
  center?: any;
  right?: any;
  children?: any;
  leftBg?: string;
  centerBg?: string;
  rightBg?: string;
  backColor?: string;
  height?: string;
}
const TopBar = memo((props: Props) => {
  return (
    <div
      style={{ background: `${props.backColor}` }}
      className={style.TopBarContainer}
    >
      <div
        style={{
          background: `${props.leftBg}`,
          height: `${props.height ?? "35px"}`,
          lineHeight: `${props.height ?? "35px"}`
        }}
        className={style.TopBarLeft}
      >
        {props.left}
      </div>
      <div
        style={{
          background: `${props.centerBg}`,
          height: `${props.height ?? "35px"}`,
          lineHeight: `${props.height ?? "35px"}`
        }}
        className={style.TopBarCenter}
      >
        {props.center}
      </div>
      <div
        style={{
          background: `${props.rightBg}`,
          height: `${props.height ?? "35px"}`,
          lineHeight: `${props.height ?? "35px"}`
        }}
        className={style.TopBarRight}
      >
        {props.right}
      </div>
    </div>
  );
});
export default TopBar;
