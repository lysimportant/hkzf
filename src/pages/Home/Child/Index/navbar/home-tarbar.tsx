import React, { memo } from "react";
import { Link } from "react-router-dom";
import { navbar } from "./config";
import style from "./style.module.css";
const HomeTabBar = memo(() => {
  return (
    <div className={style.nav_flex}>
      {navbar.map((nav, index) => {
        return (
          <Link to={nav.link} key={index}>
            <div key={nav.name} className={style.nav_flex_item}>
              <img src={nav.src} alt="" />
              <h2>{nav.name}</h2>
            </div>
          </Link>
        );
      })}
    </div>
  );
});

export default HomeTabBar;
