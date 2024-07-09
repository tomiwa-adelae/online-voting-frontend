import React from "react";

const PopUp = ({ children }) => {
  return (
    <div className="fixed top-0 left-0 w-full min-h-screen h-wull bg-opacity-75 bg-gray-700 backdrop-blur-[60%] flex items-center justify-center">
      {children}
    </div>
  );
};

export default PopUp;
