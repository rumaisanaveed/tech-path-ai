import React from "react";

export const ImageHeader = ({
  bgImage,
  heading = "Career Exploration",
  hide = false,
}) => {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl ${
        hide ? "hidden md:block" : ""
      }`}
    >
      <img
        src={bgImage}
        alt="career background"
        className="w-full h-40 sm:h-52 md:h-64 object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-bold text-center">
          {heading}
        </h1>
      </div>
    </div>
  );
};
