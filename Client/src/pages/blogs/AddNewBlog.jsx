import React, { useState } from "react";
import { Upload, X, Plus, Tag, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardLayout from "@/layouts/DashboardLayout";
import usePageTitle from "@/hooks/usePageTitle";

const AddNewBlog = () => {
  usePageTitle("Add blog");
  const [formData, setFormData] = useState({
    title: "",
    shortDesc: "",
    longDesc: "",
    image: null,
  });

  const [tags, setTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([
    "Technology",
    "Design",
    "Development",
    "Business",
    "Marketing",
    "Lifestyle",
  ]);
  const [newTag, setNewTag] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (file) => {
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const addTag = (tagName) => {
    if (tagName && !tags.includes(tagName)) {
      setTags((prev) => [...prev, tagName]);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleAddNewTag = () => {
    if (newTag.trim() && !availableTags.includes(newTag.trim())) {
      const trimmedTag = newTag.trim();
      setAvailableTags((prev) => [...prev, trimmedTag]);
      addTag(trimmedTag);
      setNewTag("");
    }
  };

  const handleSelectTag = (value) => {
    addTag(value);
    setSelectedTag("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { ...formData, tags });
    // Handle form submission here
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-3xl text-black lg:text-5xl font-bold sm:text-5xl mb-4">
              Create New Blog Post
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Share your thoughts with the world
            </p>
          </div>

          <div onSubmit={handleSubmit} className="space-y-12">
            {/* Image Upload Section */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Image className="w-5 h-5 text-custom-black-light" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-custom-black-light">
                  Featured Image
                </h2>
              </div>

              <div
                className={`relative border-2 border-dashed rounded-xl p-6 sm:p-8 lg:p-12 transition-all duration-300 ${
                  dragActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 bg-white hover:border-gray-400"
                } ${
                  imagePreview ? "bg-white border-solid border-gray-200" : ""
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-48 sm:h-64 lg:h-80 object-cover rounded-lg shadow-md"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-3 right-3 rounded-full w-8 h-8 p-0 shadow-lg hover:scale-105 transition-transform"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData((prev) => ({ ...prev, image: null }));
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                      <Upload className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-custom-black-dark mb-2">
                      Drop your image here, or click to browse
                    </h3>
                    <p className="text-gray-500 mb-6 text-sm sm:text-base">
                      PNG, JPG, GIF up to 10MB
                    </p>
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="image-upload"
                      onChange={(e) => handleImageUpload(e.target.files[0])}
                    />
                    <Label
                      htmlFor="image-upload"
                      className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                      Choose File
                    </Label>
                  </div>
                )}
              </div>
            </section>

            {/* Title and Description Section */}
            <section className="space-y-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-custom-black-light border-b-2 border-gray-200 pb-4">
                Content Details
              </h2>

              <div className="grid gap-8 lg:gap-12">
                {/* Title */}
                <div className="space-y-3">
                  <Label
                    htmlFor="title"
                    className="text-lg font-semibold text-custom-black-dark"
                  >
                    Blog Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter your compelling blog title..."
                    className="text-base sm:text-lg p-4 border-2 border-gray-200 focus:ring-blue-100 rounded-lg bg-white transition-all duration-200 w-full"
                    required
                  />
                </div>

                {/* Short Description */}
                <div className="space-y-3">
                  <Label
                    htmlFor="shortDesc"
                    className="text-lg font-semibold text-custom-black-dark"
                  >
                    Short Description
                  </Label>
                  <Input
                    id="shortDesc"
                    name="shortDesc"
                    value={formData.shortDesc}
                    onChange={handleInputChange}
                    placeholder="Brief description that captures your reader's attention..."
                    className="text-base sm:text-lg p-4 border-2 border-gray-200 focus:ring-blue-100 rounded-lg bg-white transition-all duration-200 w-full"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Tags Section */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Tag className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-custom-black-light">
                  Tags
                </h2>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-3">
                  <Label className="text-base font-medium text-custom-black-dark">
                    Select from existing tags
                  </Label>
                  <Select value={selectedTag} onValueChange={handleSelectTag}>
                    <SelectTrigger className="border-2 border-gray-200 focus:ring-4 focus:ring-blue-100 rounded-lg p-3 bg-white transition-all duration-200">
                      <SelectValue placeholder="Select from existing tags..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTags
                        .filter((tag) => !tags.includes(tag))
                        .map((tag) => (
                          <SelectItem key={tag} value={tag}>
                            {tag}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-medium text-custom-black-dark">
                    Create new tag
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Create new tag..."
                      className="border-2 border-gray-200 focus:ring-4 focus:ring-blue-100 rounded-lg bg-white transition-all duration-200 flex-1"
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), handleAddNewTag())
                      }
                    />
                    <Button
                      type="button"
                      onClick={handleAddNewTag}
                      className="bg-gradient-to-r from-[#F4C430] to-[#E17B47] hover:brightness-110rounded-lg px-4 transition-colors duration-200 shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Selected Tags */}
              {tags.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <p className="text-base font-medium text-custom-black-dark mb-4">
                    Selected Tags:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="bg-white border-2 border-gray-200 text-custom-black-light px-4 py-2 rounded-full flex items-center gap-2 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <span className="text-sm font-medium">{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 hover:text-red-500 transition-colors duration-200"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Content Section */}
            <section className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 border-b-2 border-gray-200 pb-4">
                Blog Content
              </h2>

              <div className="space-y-3">
                <Label
                  htmlFor="longDesc"
                  className="text-lg font-semibold text-gray-800"
                >
                  Main Content
                </Label>
                <Textarea
                  id="longDesc"
                  name="longDesc"
                  value={formData.longDesc}
                  onChange={handleInputChange}
                  placeholder="Write your amazing blog content here..."
                  className="min-h-80 text-base p-4 border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-lg bg-white resize-none transition-all duration-200 w-full"
                  required
                />
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold">💡 Note:</span> Rich text
                    editor will be added in future updates. For now, use plain
                    text formatting.
                  </p>
                </div>
              </div>
            </section>

            {/* Submit Button */}
            <div className="flex justify-center pt-8 pb-12">
              <Button
                type="submit"
                className="bg-gradient-to-r from-[#F4C430] to-[#E17B47] hover:brightness-110 text-white font-bold py-4 px-8 sm:px-12 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                Publish Blog Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddNewBlog;
