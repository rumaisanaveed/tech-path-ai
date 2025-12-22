import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import Editor from "@/components/editor/examples/full/editor";
import { Button } from "@/components/ui/button";

export const AddEditCareerForm = ({ initialData, onSubmit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState(
    initialData ?? {
      name: "",
      image: null,
    }
  );

  const [description, setDescription] = useState(
    initialData?.description ? initialData.description : null
  );

  const [preview, setPreview] = useState(
    initialData?.image ? initialData.image : null
  );

  /* ---------------- IMAGE HANDLERS ---------------- */

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData((p) => ({ ...p, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleImageDelete = () => {
    setFormData((p) => ({ ...p, image: null }));
    setPreview(null);
  };

  /* ---------------- INPUT HANDLERS ---------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      ...formData,
      description: JSON.stringify(description),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Career Image */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-custom-black-dark">
          Career Image <span className="text-red-500">*</span>
        </label>

        {!preview && (
          <label
            htmlFor="careerImage"
            className="
              flex items-center justify-center gap-2
              h-52 w-full
              rounded-lg
              border border-dashed border-custom-orange-dark/40
              text-custom-orange-dark
              cursor-pointer
              hover:bg-custom-orange-dark/5
              transition
            "
          >
            <Upload size={16} />
            Upload Image
          </label>
        )}

        <input
          id="careerImage"
          type="file"
          accept="image/*"
          className="hidden"
          required={!isEditMode}
          onChange={handleImageChange}
        />

        {preview && (
          <div className="relative w-fit">
            <img
              src={preview}
              alt="Preview"
              className="h-52 w-full rounded-lg object-cover"
            />
            <button
              type="button"
              onClick={handleImageDelete}
              className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow cursor-pointer"
            >
              <X className="h-4 w-4 text-gray-700" />
            </button>
          </div>
        )}
      </div>

      {/* Career Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-custom-black-dark">
          Career Name <span className="text-red-500">*</span>
        </label>

        <Input
          name="name"
          placeholder="e.g. Software Engineer"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-custom-black-dark">
          Description <span className="text-red-500">*</span>
        </label>

        <Editor
          initialContent={description}
          onChange={(content) => setDescription(content)}
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/admin/dashboard/careers/add")}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          className="bg-custom-orange-dark hover:bg-custom-orange-dark/90"
        >
          {isEditMode ? "Update Career" : "Add Career"}
        </Button>
      </div>
    </form>
  );
};
