import React, { useEffect } from "react";
import { Upload, X } from "lucide-react";
import { InputWrapper } from "../InputWrapper/InputWrapper";
import clsx from "clsx";

export const UploadImage = ({
  label,
  value,
  preview,
  setValue,
  name = "coverImage",
  previewName = "coverImagePreview",
  error,
  uploaderClassName = "",
  uploaderWrapperClassName = "",
  imageClassName = "",
  imageWrapperClassName = "",
  deleteButtonClassName = "",
  ...rest
}) => {
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);

    setValue(name, file, { shouldValidate: true });
    setValue(previewName, objectUrl);
  };

  const handleImageDelete = () => {
    setValue(name, null, { shouldValidate: true });
    setValue(previewName, null);
  };

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <InputWrapper label={label} error={error} showAsterisk {...rest}>
      {!preview ? (
        <div
          className={clsx("flex items-center gap-6", uploaderWrapperClassName)}
        >
          <label
            htmlFor={name}
            className={clsx(
              "flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-dashed border-[#59A4C0]/40 text-[#59A4C0] cursor-pointer hover:bg-[#59A4C0]/5 transition w-full h-52",
              uploaderClassName
            )}
          >
            <Upload size={16} />
            Upload Image
          </label>

          <input
            id={name}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      ) : (
        <div className={clsx("relative w-fit", imageWrapperClassName)}>
          <img
            src={preview}
            alt="Preview"
            className={clsx(
              "h-52 rounded-lg w-full object-cover",
              imageClassName
            )}
          />
          <button
            type="button"
            onClick={handleImageDelete}
            className={clsx(
              "bg-gray-200 rounded-full p-1.5 absolute top-2 right-2 cursor-pointer",
              deleteButtonClassName
            )}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </InputWrapper>
  );
};
