import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="relative w-20 h-20">
        <div className="absolute border-4 border-solid border-current opacity-100 rounded-full animate-ripple" />
        <div className="absolute border-4 border-solid border-current opacity-100 rounded-full animate-ripple animation-delay" />
      </div>
    </div>
  );
};

export default Loader;
