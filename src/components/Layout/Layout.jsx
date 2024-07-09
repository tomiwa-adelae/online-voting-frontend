import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div>
      <div className="">
        <Header />
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
