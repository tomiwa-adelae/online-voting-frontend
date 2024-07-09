import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div>
      {/* header */}
      <div className="w-full bg-white shadow h-[60px] flex items-center justify-between gap-2 px-5">
        <div className=" flex items-center text-blue-900 font-light text-[20px] uppercase">
          Online voting system
        </div>
        <div className="flex items-center  gap-4 text-[13px] text-gray-700 cursor-pointer">
          <Link to="/" className="">
            Home
          </Link>
          <Link to="/signup" className="">
            Get Started
          </Link>
          <Link to="/signin" className="">
            Vote
          </Link>
        </div>
      </div>
      <div className="bg-blue-900 text-white">
        <div className="h-[calc(100vh-60px)] w-full flex items-center p-5 md:p-20">
          <div className="">
            <div className="text-[55px] font-bold">
              Fast, Secured and <br /> Accessible Voting System
            </div>
            <div className="text-[16px]">
              let's make voting and elections easy for every for you. This is{" "}
              <br />
              design to ensure a secured voting session
            </div>
            <Link to="/signup">
              <button className="bg-white text-[20] text-blue-900 p-2 rounded-full mt-3 px-5">
                Get Started as a voter
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="p-5 md:px-20 mt-12 text-center">
        <div className="font-bold text-blue-900">OUR FEATURES</div>
        <div className="">Secured System that guarantee seamless Election</div>
        <div className="flex  w-full items-center justify-center mt-5 gap-5">
          <div className=" border border-blue-200 p-5 w-1/3 md:w-1/4 h-[230px] flex items-center justify-center flex-col">
            <div className="w-[60px] h-[65px] bg-blue-200 rounded-full"></div>
            <div className="font-bold mt-3">Secured Platform</div>
            <div className="mt-3 text-[12px] text-gray-600">
              With our platform, your data is secured
            </div>
          </div>
          <div className=" border border-blue-200 p-5 w-1/3 md:w-1/4 h-[230px] flex items-center justify-center flex-col">
            <div className="w-[60px] h-[65px] bg-blue-200 rounded-full"></div>
            <div className="font-bold mt-3">Vote Online</div>
            <div className="mt-3 text-[12px] text-gray-600">
              With just low clicks, you can cote your preferd candidates
            </div>
          </div>
          <div className=" border border-blue-200 p-5 w-1/3 md:w-1/4 h-[230px] flex items-center justify-center flex-col">
            <div className="w-[60px] h-[65px] bg-blue-200 rounded-full"></div>
            <div className="font-bold mt-3">Real Time Results</div>
            <div className="mt-3 text-[12px] text-gray-600">
              View real time voting results and score each candiate
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 text-center px-5 md:px-20">
        <div className="font-bold">How it works</div>
        <div className="text-[12px]">
          It's simple and easy to use with these 3 steps
        </div>
        <div className=" text-left mt-4">
          <div className="mb-5">
            <div className="text-[14px] font-bold text-blue-900">Sign Up</div>
            <div className="text-gray-700 text-[12px]">
              Create an account with us on the voting platform
            </div>
          </div>
          <div className="mb-5">
            <div className="text-[14px] font-bold text-blue-900">Vote</div>
            <div className="text-gray-700 text-[12px]">
              Vote for your preferd candidates
            </div>
          </div>
          <div className="mb-5">
            <div className="text-[14px] font-bold text-blue-900">
              View Election Results
            </div>
            <div className="text-gray-700 text-[12px]">
              View Election Reslut of various candidates
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
