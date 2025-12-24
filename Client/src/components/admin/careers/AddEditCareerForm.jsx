import Editor from "@/components/editor/examples/full/editor";
import { InputField } from "@/components/InputField/InputField";
import { UploadImage } from "@/components/inputs/UploadImage";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { CareerFormSchema } from "@/validations";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export const AddEditCareerForm = ({ initialData, onSubmit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const { control, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      name: "",
      coverImage: null,
      coverImagePreview: null,
      description: null,
    },
    mode: "all",
    resolver: yupResolver(CareerFormSchema),
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name ?? "",
        coverImage: null,
        coverImagePreview: initialData.coverImage ?? null, // URL
        description: initialData.description ?? null,
      });
    }
  }, [initialData, reset]);

  const onFormSubmit = (data) => {
    const payload = {
      name: data.name,
      description: JSON.stringify(data.description),
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
        uploaderClassName="border-custom-orange-dark text-custom-orange-dark"
      />

      <InputField
        name="name"
        label="Career Name"
        control={control}
        placeholder="Enter Career Name"
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

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/admin/dashboard/careers/add")}
        >
          Cancel
        </Button>

        <Button
          variant="secondary"
          type="submit"
          className="!bg-custom-orange-light/100 text-white !font-light opacity-100"
        >
          <p>{isEditMode ? "Update Career" : "Add Career"}</p>
        </Button>
      </div>
    </form>
  );
};
