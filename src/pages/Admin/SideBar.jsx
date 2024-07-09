import { InlineIcon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className=" w-[250px] h-full min-h-screen p-2 bg-blue-600 text-white fixed left-0 top-0">
      <div className="text-[25px] font-bold">Online Vote</div>
      <div className="flex items-center gap-2 mt-2 hover:bg-blue-900 p-2 rounded cursor-pointer">
        <div className="text-[25px]">
          <InlineIcon icon="mynaui:home" />
        </div>
        <div className="">Dashboard</div>
      </div>
      <Link to="/admin/users">
        <div className="flex items-center gap-2 mt-2 hover:bg-blue-900 p-2 rounded cursor-pointer">
          <div className="text-[25px]">
            <InlineIcon icon="majesticons:users" />
          </div>
          <div className="">Users</div>
        </div>
      </Link>
      <Link
        to="/admin/elections"
        className="flex items-center gap-2 mt-2 hover:bg-blue-900 p-2 rounded cursor-pointer"
      >
        <div className="text-[25px]">
          <InlineIcon icon="mdi:vote" />
        </div>
        <div className="">Election</div>
      </Link>
      <Link
        to="/admin/candidate"
        className="flex items-center gap-2 mt-2 hover:bg-blue-900 p-2 rounded cursor-pointer"
      >
        <div className="text-[25px]">
          <InlineIcon icon="raphael:users" />
        </div>
        <div className="">Candidates</div>
      </Link>
    </div>
  );
};

export default SideBar;
