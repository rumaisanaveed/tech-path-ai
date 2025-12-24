import EventForm from "@/components/admin/events/EventForm";
import usePageTitle from "@/hooks/usePageTitle";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import React from "react";

const initialValues = {
  name: "My Event",
  description:
    '{"type":"doc","content":[{"type":"heading","attrs":{"level":1},"content":[{"type":"text","text":"Hey, There"}]},{"type":"codeBlock","attrs":{"language":"actionscript-3"},"content":[{"type":"text","text":"Hello world"}]},{"type":"paragraph"},{"type":"table","content":[{"type":"tableRow","content":[{"type":"tableCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null},"content":[{"type":"paragraph"}]},{"type":"tableCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null},"content":[{"type":"paragraph"}]},{"type":"tableCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null},"content":[{"type":"paragraph"}]}]},{"type":"tableRow","content":[{"type":"tableCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null},"content":[{"type":"paragraph","content":[{"type":"text","text":"Table 1"}]}]},{"type":"tableCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null},"content":[{"type":"paragraph","content":[{"type":"text","text":"Table1"}]}]},{"type":"tableCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null},"content":[{"type":"paragraph","content":[{"type":"text","text":"Table 1"}]}]}]},{"type":"tableRow","content":[{"type":"tableCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null},"content":[{"type":"paragraph"}]},{"type":"tableCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null},"content":[{"type":"paragraph"}]},{"type":"tableCell","attrs":{"colspan":1,"rowspan":1,"colwidth":null},"content":[{"type":"paragraph"}]}]}]},{"type":"paragraph","content":[{"type":"text","text":"Some text"}]},{"type":"image","attrs":{"src":"http://tmpfiles.org/dl/15841128/whatsappimage2025-12-14at1.09.55am.jpeg","width":1186,"height":600}},{"type":"paragraph","content":[{"type":"text","text":"Some other text, want to text the web."}]}]}',
  date: "05/24/2023",
  startTime: "12:00",
  endTime: "21:00",
  venue: "Nastp, Karachi",
  registrationLink: "https://placeholder.com",
  status: "pending",
  tags: ["First Event", "Tech", "Workshop"],
};

const EditEvent = () => {
  usePageTitle("Edit Event");

  const handleUpdate = (data) => {
    // console.log("Edit event form data", data);
  };

  return (
    <AdminDashboardLayout>
      <div className="max-w-7xl mx-auto py-8 px-6 space-y-6">
        <h1 className="text-3xl font-bold text-custom-text-orange">
          Edit Event
        </h1>

        <EventForm
          initialValues={initialValues}
          submitLabel="Update Event"
          onSubmit={handleUpdate}
        />
      </div>
    </AdminDashboardLayout>
  );
};

export default EditEvent;
