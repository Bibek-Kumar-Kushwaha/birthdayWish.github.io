import React from "react";

const LandingPage = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center text-white">
      <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg">
        🎉 Welcome to Birthday Wishes 🎉
      </h1>
      <p className="text-xl mb-8">
        Create a personalized, magical birthday wish for your loved ones.
      </p>
      <button
        onClick={onStart}
        className="px-8 py-4 bg-white text-purple-600 font-bold text-lg rounded-xl shadow-lg hover:bg-purple-100 transition duration-300"
      >
        Let’s Celebrate! 🎈
      </button>
    </div>
  );
};

export default LandingPage;
