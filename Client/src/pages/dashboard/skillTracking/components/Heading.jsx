import React from "react";

export const Heading = ({ heading = "" }) => {
  return (
    <h1 className="text-black font-medium text-xl md:text-3xl">{heading}</h1>
  );
};
