import React, { memo, useEffect, useState } from "react";

import HomeIndexBanner from "@/pages/Home/Child/Index/banners/home-index-banner";
import HomeTabBar from "@/pages/Home/Child/Index/navbar/home-tarbar";
import HomeGroup from "./group/homegroup";
import HomeNews from "./news/homenews";

const HomeIndex = memo(() => {
  return (
    <>
      <HomeIndexBanner></HomeIndexBanner>
      <HomeTabBar></HomeTabBar>
      <HomeGroup></HomeGroup>
      <HomeNews></HomeNews>
    </>
  );
});

export default HomeIndex;
