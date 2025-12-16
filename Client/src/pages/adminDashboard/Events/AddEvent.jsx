import EventForm from "@/components/admin/events/EventForm";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";

const AddEvent = () => {
  const initialValues = {
    name: "My Event",
    description: "This is the event description",
    date: "24/05/2023",
    startTime: "12:00",
    endTime: "21:00",
    venue: "Nastp, Karachi",
    registrationLink: "https://placeholder.com",
    status: "pending",
    tags: ["First Event", "Tech", "Workshop"],
  };

  const handleCreate = (data) => {
    console.log("Form data", data);
    // TODO: api call here
  };

  return (
    <AdminDashboardLayout>
      <div className="max-w-7xl mx-auto py-8 px-6 space-y-6">
        <h1 className="text-3xl font-bold text-custom-text-orange">
          Add New Event
        </h1>

        <EventForm
          initialValues={initialValues}
          submitLabel="Create Event"
          onSubmit={handleCreate}
        />
      </div>
    </AdminDashboardLayout>
  );
};

export default AddEvent;
