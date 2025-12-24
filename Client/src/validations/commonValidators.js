import * as yup from "yup";

const EMAIL_REGEX =
  /^(?=.{6,320}$)([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

const SPACES = /^\S*$/;

export const FirstNameValidation = yup
  .string()
  .required("First name is required.");

export const LastNameValidation = yup
  .string()
  .required("Last name is required.");

export const EmailSchema = yup
  .string()
  .required("Email is required")
  .matches(EMAIL_REGEX, "Please enter valid email address.");

export const PasswordSchema = (ref = "", name = "Password") => {
  let validation = yup
    .string()
    .required(`${name} is required.`)
    .matches(SPACES, "Password cannot contain spaces.")
    .min(8, "Password must be at least 8 characters.")
    .max(128, "Password cannot exceed 128 characters.");

  if (ref) {
    validation = validation.test(
      "not-same-as-ref",
      "Password's don't match.",
      function (value) {
        const refValue = this.parent?.[ref];
        if (!value || !refValue) return true;
        return value === refValue;
      }
    );
  }
  return validation;
};
