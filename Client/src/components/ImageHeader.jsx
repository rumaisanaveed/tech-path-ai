import React from "react";

export const ImageHeader = ({
  imagePath,
  variant = "blog" || "event",
  blogData,
  eventData,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <img
          src={imagePath}
          alt="background"
          className="rounded-xl w-full h-auto object-cover"
        />
      </div>
      <div
        className="lg:col-span-1 rounded-xl p-5 lg:p-10 flex flex-col justify-center gap-2 lg:gap-6"
        style={{
          background:
            "linear-gradient(107deg, rgba(243, 179, 78, 0.20) 0%, rgba(255, 210, 114, 0.20) 50%, rgba(89, 164, 192, 0.20) 100%)",
        }}
      >
        {variant === "blog" ? (
          <>
            <span className="text-sm md:text-base text-black bg-white rounded-full w-fit px-4 py-1 font-medium">
              Back-end Development
            </span>
            <h1 className="text-2xl md:text-4xl font-semibold">
              What is Backend Development? A Beginner’s Guide
            </h1>
            <p className="text-sm md:text-base text-black font-medium">
              By Author Name
            </p>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
