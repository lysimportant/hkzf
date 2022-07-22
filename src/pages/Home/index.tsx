import React, { memo } from "react";
import { Outlet } from "react-router-dom";
import TabBar from "../../components/TabBar";
import { navList } from "./config";
const Home = memo(() => {
  return (
    <>
      <Outlet></Outlet>
      <TabBar navList={navList}></TabBar>
    </>
  );
});

export default Home;
