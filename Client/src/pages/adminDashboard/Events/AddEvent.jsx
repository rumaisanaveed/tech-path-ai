import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";

const AddEvent = () => {
  const initialValues = {
    name: "",
    description: "",
    date: "",
    time: "",
    venue: "",
    registrationLink: "",
    status: "pending",
    tags: [],
  };

  return (
    <AdminDashboardLayout>
      <div className="max-w-7xl mx-auto py-8 px-6 space-y-6">
        <h1 className="text-3xl font-bold text-custom-text-orange">
          Add New Event
        </h1>

        {/* <EventForm
          initialValues={initialValues}
          submitLabel="Create Event"
          onSubmit={handleCreate}
        /> */}
      </div>
    </AdminDashboardLayout>
  );
};

export default AddEvent;
