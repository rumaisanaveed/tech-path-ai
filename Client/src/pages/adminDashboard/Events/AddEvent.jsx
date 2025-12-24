import EventForm from "@/components/admin/events/EventForm";
import usePageTitle from "@/hooks/usePageTitle";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";

const AddEvent = () => {
  usePageTitle("Add New Event");

  const handleCreate = (data) => {
    // console.log("Add Event Form data", data);
  };

  return (
    <AdminDashboardLayout>
      <div className="max-w-7xl mx-auto py-8 px-6 space-y-6">
        <h1 className="text-3xl font-bold text-custom-text-orange">
          Add New Event
        </h1>

        <EventForm submitLabel="Create Event" onSubmit={handleCreate} />
      </div>
    </AdminDashboardLayout>
  );
};

export default AddEvent;
