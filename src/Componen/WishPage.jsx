import React from "react";
import Balloons from "./Balloons";
import DownloadButton from "./DownloadButton";

function WishPage({ name, message }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#E5989B] via-[#B5828C] to-[#FFB4A2] text-white">
      <div className="p-8 text-center bg-white rounded-xl shadow-xl max-w-md w-full">
        <h1 className="text-4xl font-bold text-[#E5989B] mb-4">🎉 Happy Birthday, {name}! 🎂</h1>
        <p className="text-xl mb-6 text-[#B5828C]">{message}</p>
        {/* <DownloadButton /> */}
      </div>
      {/* <Balloons /> */}
    </div>
  );
}

export default WishPage;
