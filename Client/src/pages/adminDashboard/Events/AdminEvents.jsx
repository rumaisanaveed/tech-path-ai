import {
  EventsGrid,
  EventsHeader,
} from "@/components/admin/events/EventsComponents";
import { SearchBar } from "@/components/search/SearchBar";
import usePageTitle from "@/hooks/usePageTitle";
import AdminDashboardLayout from "@/layouts/AdmindashboardLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockEvents } from "../../../components/admin/events/constants";

const AdminEvents = () => {
  usePageTitle("Admin Events");

  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      setEvents(mockEvents);
      setLoading(false);
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.venue?.toLowerCase().includes(search.toLowerCase()) ||
      event.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesSearch;
  });

  return (
    <AdminDashboardLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8 space-y-4">
          <EventsHeader
            onAddButtonClick={() => navigate("/admin/dashboard/events/add")}
          />

          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            wrapperClassName="flex-1 max-w-md"
            variant="compact"
          />

          <EventsGrid events={filteredEvents} isLoading={loading} />
        </div>
      </div>
    </AdminDashboardLayout>
  );
};

export default AdminEvents;
