import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { InputWrapper } from "../InputWrapper/InputWrapper";

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
    >
      <div className="relative">
        <Component
          id={name}
          placeholder={placeholder}
          type={inputType}
          {...(isTextArea && { rows: 10 })}
          // aria-invalid={isError ? true : false}
          disabled={disabled}
          label={label}
          className={`${isError ? "border-red-500" : ""}`}
          {...rest}
        />
        {type == "password" && (
          <button
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
