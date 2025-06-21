import React from "react";

export const Message = ({ variant = "error", message }) => {
  return (
    <>
      {variant === "success" ? (
        <p className="text-green-500 pb-2 text-sm font-normal">{message}</p>
      ) : (
        <p className="text-red-500 text-sm pb-2 font-normal">{message}</p>
      )}
    </>
  );
};
