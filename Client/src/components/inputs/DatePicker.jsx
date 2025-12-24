import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { InputWrapper } from "../InputWrapper/InputWrapper";

export const DatePicker = ({
  name,
  label,
  value,
  onChange,
  placeholder = "MM/DD/YYYY",
  disabled = false,
  error,
  isError = false,
  className = "",
  ...rest
}) => {
  const [open, setOpen] = useState(false);

  return (
    <InputWrapper
      showAsterisk={rest.showAsterisk}
      name={name}
      label={label}
      error={error}
      labelClassName={rest.labelClassName}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Input
            readOnly
            disabled={disabled}
            onClick={() => setOpen(true)}
            value={value ? new Date(value).toLocaleDateString("en-US") : ""}
            placeholder={placeholder}
            className={`cursor-pointer text-left ${
              isError ? "border-red-500" : ""
            } ${className}`}
            {...rest}
          />
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={value ? new Date(value) : undefined}
            onSelect={(date) => {
              onChange?.(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </InputWrapper>
  );
};
