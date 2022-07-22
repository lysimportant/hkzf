import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import style from "./style.module.css";
export interface ListItem {
  link: string;
  title: string;
  icon?: string;
  selectIcon?: string;
}
interface Props {
  navList: ListItem[];
}
const TabBar = memo((props: Props) => {
  return (
    <div className={style.tarbar}>
      {props.navList.map(nav => {
        return (
          <NavLink
            end
            className={({ isActive }) => (isActive ? style.active : undefined)}
            to={nav.link}
            key={nav.link}
          >
            <div className={`${style.tarbaritem}`}>
              <span className={`iconfont ${nav.icon} ${style.icon}`}></span>
              <span>{nav.title}</span>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
});

export default TabBar;
