import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { InputWrapper } from "../InputWrapper/InputWrapper";
import clsx from "clsx";

export const BasicTextInput = ({
  name = "",
  placeholder = "",
  type = "",
  isTextArea = false,
  isError,
  error,
  disabled,
  label,
  showAsterisk,
  isCommaSeparated = false,
  ...rest
}) => {
  const Component = isTextArea ? Textarea : Input;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputType =
    type === "password" ? (isPasswordVisible ? "text" : "password") : type;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <InputWrapper
      name={name}
      label={label}
      error={error}
      showAsterisk={showAsterisk}
      labelClassName={rest.labelClassName}
      inputWrapperClassName={rest.inputWrapperClassName}
    >
      <div className={clsx("relative", rest.wrapperClassName)}>
        <Component
          id={name}
          placeholder={placeholder}
          type={inputType}
          {...(isTextArea && { rows: 10 })}
          aria-invalid={isError ? true : false}
          disabled={disabled}
          label={label}
          className={clsx("w-full", rest.wrapperClassName, {
            "border-red-500": isError,
          })}
          // important for email and password inputs
          {...rest}
        />
        {type == "password" && (
          <button
            type="button"
            className="absolute right-3 bottom-2"
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <Eye color="black" size={18} />
            ) : (
              <EyeClosed color="black" size={18} />
            )}
          </button>
        )}
      </div>
    </InputWrapper>
  );
};
