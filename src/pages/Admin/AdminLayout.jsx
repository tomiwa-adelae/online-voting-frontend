import React from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      {/* Side bar */}
      <div className="">
        <SideBar />
      </div>
      <div className="ml-[250px]">
        <div className="">
          <Header />
        </div>
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
