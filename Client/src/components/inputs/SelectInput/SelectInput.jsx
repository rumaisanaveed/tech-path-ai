import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import clsx from "clsx";
import React from "react";

export const SelectInput = ({
  items = [],
  placeholder = "",
  wrapperClassName = "",
  itemClassName = "",
  selectTriggerClassName = "",
  value,
  onChange,
  customItem,
  ...rest
}) => {
  return (
    <Select
      className={clsx("w-36", wrapperClassName)}
      value={value}
      onValueChange={onChange}
      {...rest}
    >
      <SelectTrigger className={clsx(selectTriggerClassName)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem
            key={item.value}
            value={item.value}
            className={clsx(itemClassName)}
          >
            {customItem ? customItem(item) : item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
