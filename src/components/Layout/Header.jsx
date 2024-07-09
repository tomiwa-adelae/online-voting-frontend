import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { logout } from "../../functions/redux/Slice/authSlice";

const Header = () => {
  const dispatch = useDispatch()
  const handleLogout= () => {
     Cookies.remove("currentUser");
     Cookies.remove("token");
     dispatch(logout())
  }
  const { currentUser } = useSelector((state) => state.auth);
  return (
    <div className="w-screen h-[60px] bg-white shadow px-16 flex items-center">
      <div className="w-full flex items-center justify-between">
        <div className="text-blue-500 text-[25px] uppercase font-bold">
          Online Voting
        </div>
        <div className="flex gap-2">
          <Link to="/home" className="hover:text-gray-700 text-[13px]">
            Home
          </Link>

          <div className="hover:text-gray-700  text-[13px] cursor-pointer" onClick={handleLogout}>Logout</div>
          {currentUser?.userType === "admin" && (
            <Link to="/admin" className="hover:text-gray-700  text-[13px]">
              Admin
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
