import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const EventForm = ({
  initialValues,
  onSubmit,
  submitLabel = "Save Event",
  loading = false,
}) => {
  const [formData, setFormData] = useState(initialValues);
  const [tags, setTags] = useState(initialValues.tags || []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  return (
    <form
      onSubmit={onSubmit}
      className="grid grid-cols-1 lg:grid-cols-3 gap-10"
    >
      {/* LEFT */}
      <div className="lg:col-span-2 space-y-8">
        {/* Event Info */}
        <section className="space-y-4 border-b pb-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Event Information
          </h2>

          <div className="space-y-3">
            <Label>Event Name</Label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. AI Career Fair 2025"
            />
          </div>

          <div className="space-y-3">
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
        <section className="space-y-4 border-b pb-6">
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
              <Label>Time</Label>
              <Input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
              />
            </div>
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
        </section>

        {/* Registration */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Registration</h2>

          <Input
            name="registrationLink"
            value={formData.registrationLink}
            onChange={handleChange}
            placeholder="https://..."
          />
        </section>
      </div>

      {/* RIGHT */}
      <aside className="space-y-6">
        {/* Status */}
        <div className="border rounded-xl p-5 space-y-4">
          <Label>Status</Label>
          <select
            className="w-full border rounded-md p-2"
            value={formData.status}
            onChange={(e) =>
              setFormData((p) => ({ ...p, status: e.target.value }))
            }
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Tags */}
        <div className="border rounded-xl p-5 space-y-4">
          <Label>Tags</Label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            type="submit"
            className="w-full bg-custom-text-orange"
            disabled={loading}
          >
            {submitLabel}
          </Button>
        </div>
      </aside>
    </form>
  );
};

export default EventForm;
