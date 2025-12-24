import { acceptedImageTypes } from "@/components/modals/ProjectModal";
import {
  EmailSchema,
  FirstNameValidation,
  LastNameValidation,
  PasswordSchema,
} from "./commonValidators";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const SignupFormSchema = yupResolver(
  yup.object({
    firstName: FirstNameValidation,
    lastName: LastNameValidation,
    dateOfBirth: yup.date().nullable().required("Date of Birth is required."),
    email: EmailSchema,
    password: PasswordSchema(),
    confirmPassword: PasswordSchema("password", "Confirm Password"),
  })
);

export const LoginFormSchema = yupResolver(
  yup.object({
    email: EmailSchema,
    password: PasswordSchema(),
  })
);

export const OtpSchema = yupResolver(
  yup.object({
    otp: yup
      .string()
      .required("OTP is required")
      .length(6, "OTP must be 6 digits"),
  })
);

export const ResendOtpFormSchema = yupResolver(
  yup.object({
    email: EmailSchema,
  })
);

export const EventFormSchema = yupResolver(
  yup.object({
    name: yup.string().trim().required("Event name is required"),
    description: yup.mixed().nullable().required("Description is required"),
    date: yup.date().nullable().required("Event date is required"),
    venue: yup.string().trim().required("Venue is required"),
    startTime: yup.string().required("Start time is required"),
    endTime: yup
      .string()
      .required("End time is required")
      .test(
        "time-comparison",
        "End time must be greater than start time",
        function (endTime) {
          const { startTime } = this.parent;

          if (!startTime || !endTime) return true;

          if (startTime === endTime) {
            return this.createError({
              message: "Start time and end time cannot be the same",
            });
          }

          if (endTime < startTime) {
            return this.createError({
              message: "End time must be later than start time",
            });
          }

          return true;
        }
      ),
    registrationLink: yup
      .string()
      .required("Registration link is required")
      .url("Enter a valid URL")
      .nullable(),
    tags: yup.array().of(yup.string()).optional(),
    status: yup.string().oneOf(["pending", "approved", "rejected"]).required(),
  })
);

export const EditProfileSchema = yupResolver(
  yup.object({
    firstName: FirstNameValidation,
    lastName: LastNameValidation,
  })
);

export const ChangePasswordSchema = yupResolver(
  yup.object({
    currentPassword: PasswordSchema("", "Current Password"),
    newPassword: PasswordSchema("", "New Password"),
    confirmNewPassword: PasswordSchema("newPassword", "Confirm Password"),
  })
);

const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const BlogFormSchema = yup.object({
  title: yup.string().trim().required("Blog title is required"),

  coverImage: yup
    .mixed()
    .nullable()
    .test("image-required", "Cover image is required", function (file) {
      const { coverImagePreview } = this.parent;
      if (coverImagePreview) return true;
      if (!file) return false;
      return true;
    })
    .test(
      "file-type",
      "Cover image must be a JPG, PNG, GIF, or WEBP",
      (file) => {
        if (!file) return true;
        return acceptedImageTypes.includes(file.type);
      }
    )
    .test("file-size", "Cover image must be less than 10MB", (file) => {
      if (!file) return true;
      return file.size <= MAX_FILE_SIZE;
    }),

  coverImagePreview: yup.string().nullable(),

  description: yup.mixed().required("Description is required"),

  tags: yup
    .array()
    .of(yup.string())
    .min(3, "Please add at least 3 tags")
    .required(),
});

export const CareerFormSchema = BlogFormSchema.pick([
  "coverImage",
  "coverImagePreview",
  "description",
]).shape({
  name: yup.string().trim().required("Career Name is required"),
});
