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
import { Button } from "@/components/ui/button";

const acceptedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = Array.from(
  { length: 50 },
  (_, i) => new Date().getFullYear() - i
);

// TODO : Fix stylings
export default function CertificationModal({
  mode = "add",
  defaultValues = {},
  onSubmit,
  open,
  setOpen,
}) {
  //   const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    issueMonth: "",
    issueYear: "",
    credentialId: "",
    credentialUrl: "",
    certificateImage: null,
  });
  const [errors, setErrors] = useState({});
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    if (mode === "edit" && defaultValues) {
      setFormData({ ...formData, ...defaultValues });
    }
  }, [mode, defaultValues]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "certificateImage") {
      const file = files[0];
      if (file && !acceptedImageTypes.includes(file.type)) {
        setImageError("Unsupported image format. Use jpg, png, webp, or gif.");
        setFormData((prev) => ({ ...prev, certificateImage: null }));
      } else {
        setImageError("");
        setFormData((prev) => ({ ...prev, certificateImage: file }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.organization.trim())
      newErrors.organization = "Issuing organization is required.";
    if (!formData.issueMonth) newErrors.issueMonth = "Select month.";
    if (!formData.issueYear) newErrors.issueYear = "Select year.";
    if (!formData.credentialId.trim())
      newErrors.credentialId = "Credential ID is required.";
    if (!formData.credentialUrl.trim())
      newErrors.credentialUrl = "Credential URL is required.";
    if (!formData.certificateImage && mode === "add")
      newErrors.certificateImage = "Certificate image is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      setOpen(false);
      setFormData({
        name: "",
        organization: "",
        issueMonth: "",
        issueYear: "",
        credentialId: "",
        credentialUrl: "",
        certificateImage: null,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          {mode === "edit" ? "Edit Certification" : "Add Certification"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit certification" : "Add certification"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              placeholder="e.g. AWS Certified Solutions Architect"
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Issuing Org */}
          <div>
            <Label htmlFor="organization">Issuing organization</Label>
            <Input
              id="organization"
              name="organization"
              value={formData.organization}
              placeholder="e.g. Amazon Web Services"
              onChange={handleChange}
            />
            {errors.organization && (
              <p className="text-red-500 text-sm">{errors.organization}</p>
            )}
          </div>

          {/* Issue Date */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <Label htmlFor="issueMonth">Issue Month</Label>
              <select
                name="issueMonth"
                value={formData.issueMonth}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select month</option>
                {months.map((m, i) => (
                  <option key={i} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              {errors.issueMonth && (
                <p className="text-red-500 text-sm">{errors.issueMonth}</p>
              )}
            </div>

            <div className="w-1/2">
              <Label htmlFor="issueYear">Issue Year</Label>
              <select
                name="issueYear"
                value={formData.issueYear}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select year</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              {errors.issueYear && (
                <p className="text-red-500 text-sm">{errors.issueYear}</p>
              )}
            </div>
          </div>

          {/* Credential ID */}
          <div>
            <Label htmlFor="credentialId">Credential ID</Label>
            <Input
              id="credentialId"
              name="credentialId"
              value={formData.credentialId}
              placeholder="e.g. ABC-123456"
              onChange={handleChange}
            />
            {errors.credentialId && (
              <p className="text-red-500 text-sm">{errors.credentialId}</p>
            )}
          </div>

          {/* Credential URL */}
          <div>
            <Label htmlFor="credentialUrl">Credential URL</Label>
            <Input
              id="credentialUrl"
              name="credentialUrl"
              value={formData.credentialUrl}
              placeholder="https://..."
              onChange={handleChange}
            />
            {errors.credentialUrl && (
              <p className="text-red-500 text-sm">{errors.credentialUrl}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <Label htmlFor="certificateImage">Certificate Image</Label>
            <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
              <p className="text-sm text-gray-500 mb-2">
                Drag and Drop to upload or{" "}
                <span className="text-blue-600 underline cursor-pointer">
                  Browse
                </span>
              </p>
              <Input
                type="file"
                name="certificateImage"
                accept="image/*"
                onChange={handleChange}
              />
              {imageError && (
                <p className="text-red-500 text-sm">{imageError}</p>
              )}
              {errors.certificateImage && (
                <p className="text-red-500 text-sm">
                  {errors.certificateImage}
                </p>
              )}
            </div>
          </div>

          {/* Submit */}
          <Button className="w-full mt-4" onClick={handleSubmit}>
            {mode === "edit" ? "Update Certification" : "Save Certification"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
