import React from "react";
import { Button } from "../ui/button";

export const Filters = ({
  options = [],
  value,
  onChange,
  activeFilterClassName = "",
  filterClassName = "",
  size = "sm",
  defaultFilter = options[0]?.value || "",
  customLabel,
  ...rest
}) => {
  return (
    <>
      {options.map((opt) => (
        <Button
          key={opt.value}
          size={size}
          variant={value === opt.value ? "default" : "outline"}
          onClick={() => onChange(opt.value)}
          className={
            value === opt.value ? activeFilterClassName : filterClassName
          }
          {...rest}
        >
          {customLabel ? customLabel(opt) : opt.label}
        </Button>
      ))}
    </>
  );
};
