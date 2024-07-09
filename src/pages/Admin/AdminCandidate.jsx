import React, { useState } from "react";
import { Link } from "react-router-dom";
import PopUp from "../../components/UI/PopUp";
import AddCandidates from "../../components/AdminUser/AddCandidates";
import CandidateTable from "../../components/AdminUser/CandidateTable";

const AdminCandidate = () => {
  const [showAddCandidate, setShowAddCandidate] = useState(false);

  return (
    <div className="container mx-auto p-5">
      <div className="text-[25px] font-bold">Elections Data</div>
      <div className="text-gray-400">
        This is the data of the candidates that is been uploaded in the the
        database.
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-1 items-center">
          <Link to="/admin" className="text-gray-400">
            Dashboard
          </Link>
          <svg
            className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <div className="">Candidates</div>
        </div>
        <div className="">
          <button
            className="bg-blue-500 px-5 py-2 text-white rounded  "
            onClick={() => {
              setShowAddCandidate(true);
            }}
          >
            Add Candidates
          </button>
        </div>
      </div>
      <div className="mt-4">
        <div className="mt-5 border w-full p-4 rounded">
          <CandidateTable />
        </div>
      </div>

      {showAddCandidate && (
        <PopUp>
          <AddCandidates setShowAddCandidate={setShowAddCandidate} />
        </PopUp>
      )}
    </div>
  );
};

export default AdminCandidate;
