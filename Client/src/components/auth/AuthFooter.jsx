import React from "react";
import { Link } from "react-router-dom";

export const AuthFooter = ({ text = "", title = "", href = "" }) => {
  return (
    <div className="flex justify-center place-items-end mt-5 mb-4">
      <p className="text-sm font-normal flex items-center">
        {text}&nbsp;
        <Link to={href} className="text-custom-light-blue font-medium">
          {title}
        </Link>
      </p>
    </div>
  );
};
