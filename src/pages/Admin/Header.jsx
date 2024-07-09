import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { logout } from "../../functions/redux/Slice/authSlice";
const Header = () => {
  const handleLogout = () => {
    const dispatch = useDispatch();
    Cookies.remove("currentUser");
    Cookies.remove("token");
    dispatch(logout());
  };
  return (
    <div className="w-full  h-[50px] bg-white shadow flex items-center justify-between p-5">
      <div className=""> </div>
      <div className="text-gray-300">
        <div
          className="hover:text-gray-700  text-[13px] cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>
    </div>
  );
};

export default Header;
