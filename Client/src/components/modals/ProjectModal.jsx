import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const acceptedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

// TODO : Fix stylings
export default function ProjectModal({
  mode = "add",
  defaultValues = {},
  open,
  setOpen,
  onSubmit,
}) {
  //   const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    techStack: "",
    url: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [imageError, setImageError] = useState("");

  // Pre-fill form in edit mode
  useEffect(() => {
    if (mode === "edit" && defaultValues) {
      setFormData({ ...formData, ...defaultValues });
    }
  }, [mode, defaultValues]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      if (file && !acceptedImageTypes.includes(file.type)) {
        setImageError(
          "Unsupported image format. Please upload jpg, png, webp, or gif."
        );
        setFormData((prev) => ({ ...prev, image: null }));
      } else {
        setImageError("");
        setFormData((prev) => ({ ...prev, image: file }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.projectName.trim())
      newErrors.projectName = "Project name is required.";
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    if (!formData.techStack.trim())
      newErrors.techStack = "Tech stack is required.";
    if (!formData.url.trim()) newErrors.url = "URL is required.";
    if (!formData.image && mode === "add")
      newErrors.image = "Project image is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // You can now call your backend or callback
      onSubmit(formData);
      setOpen(false);
      setFormData({
        projectName: "",
        description: "",
        techStack: "",
        url: "",
        image: null,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Project" : "Add Project"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Project Name */}
          <div>
            <Label htmlFor="projectName">Project name</Label>
            <Input
              id="projectName"
              name="projectName"
              placeholder="Enter project name"
              value={formData.projectName}
              onChange={handleChange}
            />
            {errors.projectName && (
              <p className="text-red-500 text-sm">{errors.projectName}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter project description"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Tech Stack */}
          <div>
            <Label htmlFor="techStack">Tech Stack</Label>
            <Input
              id="techStack"
              name="techStack"
              placeholder="e.g. React, Node.js"
              value={formData.techStack}
              onChange={handleChange}
            />
            {errors.techStack && (
              <p className="text-red-500 text-sm">{errors.techStack}</p>
            )}
          </div>

          {/* URL */}
          <div>
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              name="url"
              placeholder="https://yourproject.com"
              value={formData.url}
              onChange={handleChange}
            />
            {errors.url && <p className="text-red-500 text-sm">{errors.url}</p>}
          </div>

          {/* Project Image */}
          <div>
            <Label htmlFor="image">Project Image</Label>
            <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
              <p className="text-sm text-gray-500 mb-2">
                Drag and Drop to upload or{" "}
                <span className="text-blue-600 underline cursor-pointer">
                  Browse
                </span>
              </p>
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
              />
              {imageError && (
                <p className="text-red-500 text-sm">{imageError}</p>
              )}
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button className="w-full mt-4" onClick={handleSubmit}>
            {mode === "edit" ? "Update Project" : "Save Project"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
