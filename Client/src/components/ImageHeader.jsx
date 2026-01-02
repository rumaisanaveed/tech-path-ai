import clsx from "clsx";
import React from "react";

export const ImageHeader = ({
  imagePath,
  customBody,
  customBodyContainerClassName,
  imageClassName = "",
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <div className="lg:col-span-2">
        <img
          src={imagePath}
          alt="background"
          className={clsx(
            "rounded-xl w-full h-full object-cover",
            imageClassName || "min-h-[300px]"
          )}
        />
      </div>
      <div
        className={clsx(
          "lg:col-span-1 rounded-xl p-5 lg:p-10 flex flex-col justify-center gap-2 lg:gap-4 h-full",
          customBodyContainerClassName
        )}
        style={{
          background:
            "linear-gradient(107deg, rgba(243, 179, 78, 0.20) 0%, rgba(255, 210, 114, 0.20) 50%, rgba(89, 164, 192, 0.20) 100%)",
        }}
      >
        {customBody}
      </div>
    </div>
  );
};