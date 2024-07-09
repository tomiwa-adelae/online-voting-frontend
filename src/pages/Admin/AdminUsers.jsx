import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserTable from "../../components/AdminUser/UserTable";

const AdminUsers = () => {
  return (
    <div className="container mx-auto p-5">
      <div className="text-[25px] font-bold">User Data</div>
      <div className="text-gray-400">
        This is the data of the users that has an account.
      </div>
      <div className="flex gap-1 items-center">
        <Link to="/admin" className="text-gray-400">
          Dashboard
        </Link>
        <svg
          class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
        <div className="">Users</div>
      </div>
      <div className="mt-4">
        <div className="mt-5 border w-full p-4 rounded">
          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
