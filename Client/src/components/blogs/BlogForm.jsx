import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../editor/examples/full/editor";
import { InputField } from "../InputField/InputField";
import { TagInput } from "../inputs/TagsInput";
import { UploadImage } from "../inputs/UploadImage";
import { Button } from "../ui/button";
import { BlogFormSchema } from "@/validations";

export const AddEditBlogForm = ({ initialData, onSubmit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const { control, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      title: "",
      coverImage: null,
      coverImagePreview: null,
      description: null,
      tags: [],
    },
    mode: "all",
    resolver: yupResolver(BlogFormSchema),
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title ?? "",
        coverImage: null,
        coverImagePreview: initialData.coverImage ?? null, // URL
        description: initialData.description ?? null,
        tags: initialData.tags ?? [],
      });
    }
  }, [initialData, reset]);

  const onFormSubmit = (data) => {
    const payload = {
      title: data.title,
      description: JSON.stringify(data.description),
      tags: data.tags,
    };

    if (data.coverImage instanceof File) {
      payload.coverImage = data.coverImage;
    }

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <InputField
        name="coverImage"
        label="Cover Image"
        component={UploadImage}
        control={control}
        preview={watch("coverImagePreview")}
        setValue={setValue}
        labelClassName="!font-medium"
        showAsterisk
      />

      <InputField
        name="title"
        label="Blog Title"
        control={control}
        placeholder="Enter Blog Title"
        labelClassName="!font-medium"
        showAsterisk
      />

      <InputField
        name="description"
        label="Blog Description"
        control={control}
        component={Editor}
        placeholder="Enter Blog Description"
        labelClassName="!font-medium"
        showAsterisk
      />

      <InputField
        name="tags"
        label="Tags"
        control={control}
        component={TagInput}
        placeholder="Enter tags for blog"
        labelClassName="!font-medium"
        showAsterisk
      />

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/admin/dashboard/blogs")}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="bg-custom-light-blue hover:bg-custom-light-blue"
        >
          {isEditMode ? "Update Blog" : "Publish Blog"}
        </Button>
      </div>
    </form>
  );
};
