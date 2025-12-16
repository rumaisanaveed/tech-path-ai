import { TagInput } from "@/components/inputs/TagsInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const EventForm = ({
  initialValues,
  onSubmit,
  submitLabel = "Save Event",
  loading = false,
}) => {
  const [formData, setFormData] = useState(
    initialValues
      ? initialValues
      : {
          name: "",
          description: "",
          date: "",
          time: "",
          venue: "",
          registrationLink: "",
          status: "pending",
          tags: [],
        }
  );
  const [tags, setTags] = useState(initialValues.tags || []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, tags });
  };

  const [value, setValue] = useState("simple text");

  function onChange(e) {
    setValue(e.target.value);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 lg:grid-cols-2 gap-10"
    >
      <div className="lg:col-span-2 space-y-8 min-h-screen">
        {/* Event Info */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Event Information
          </h2>

          <div className="space-y-3 col-span-1 lg:col-span-2">
            <Label>Event Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. AI Career Fair 2025"
            />
          </div>

          <div className="space-y-3 col-span-1 lg:col-span-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the event..."
              className="min-h-32"
            />
          </div>
        </section>

        {/* Date & Location */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Date & Location
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Venue</Label>
              <Input
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="Venue or Online"
              />
            </div>

            <div>
              <Label>Start Time</Label>
              <Input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div>
              <Label>End Time</Label>
              <Input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        {/* Registration */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Registration & Tags
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-4">
              <Label>Tags</Label>
              <TagInput
                name="tags"
                placeholder="Enter tags..."
                value={tags}
                onChange={setTags}
              />
            </div>
            <div className="space-y-4">
              <Label>Registration Link</Label>
              <Input
                name="registrationLink"
                value={formData.registrationLink}
                onChange={handleChange}
                placeholder="https://..."
                type="url"
              />
            </div>
          </div>
        </section>
      </div>

      {/* Actions */}
      <div className="lg:col-span-1 flex justify-end">
        <Button className="w-full bg-custom-text-orange" disabled={loading}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default EventForm;
