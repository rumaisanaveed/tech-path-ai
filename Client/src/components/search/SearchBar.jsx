import { Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import clsx from "clsx";

export const SearchBar = ({
  outerWrapperClassName = "",
  wrapperClassName = "",
  placeholder = "",
  onSearch,
  OuterComponent = "div",
  icon: Icon = Search,
  iconClassName = "",
  inputClassName = "",
  variant = "default" | "compact",
  ...rest
}) => {
  return (
    <>
      {variant === "default" ? (
        <div
          className={clsx(
            "p-[2px] rounded-3xl md:rounded-full bg-custom-off-white w-full border border-custom-gray-dark",
            outerWrapperClassName
          )}
        >
          <div
            className={clsx(
              "flex items-center bg-custom-off-white rounded-full px-4 py-2 md:py-2.5 gap-2",
              wrapperClassName
            )}
          >
            <Icon
              className={clsx(
                "h-5 w-5 md:w-6 md:h-6 text-custom-gray-dark",
                iconClassName
              )}
            />
            <Input
              type="text"
              className={clsx(
                "w-full bg-custom-off-white border-none text-sm md:text-base text-black font-normal placeholder:text-custom-gray-dark placeholder:font-normal",
                "outline-none focus:outline-none",
                "ring-0 focus:ring-0 focus:ring-offset-0",
                "shadow-none focus:shadow-none",
                inputClassName
              )}
              placeholder={placeholder}
              {...rest}
            />
          </div>
        </div>
      ) : (
        <div className={clsx("relative", wrapperClassName)}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            className={clsx(inputClassName, "pl-10")}
            placeholder="Search events, venue or tags..."
            {...rest}
          />
        </div>
      )}
    </>
  );
};
