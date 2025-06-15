import React from "react";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";

export const EyeButton = ({ showPassword, setShowPassword }) => {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => setShowPassword((prev) => !prev)}
      className="absolute top-1/2 right-2 -translate-y-1/2 h-7 w-7"
    >
      {showPassword ? (
        <Eye className="h-4 w-4" />
      ) : (
        <EyeOff className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle password visibility</span>
    </Button>
  );
};
