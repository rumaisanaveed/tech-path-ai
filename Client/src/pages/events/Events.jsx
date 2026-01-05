import { FetchEventsForUsers } from "@/apiService/Events";
import EventsBg from "@/assets/images/career-bg.png";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { CustomPagination } from "@/components/CustomPagination";
import { SearchBar } from "@/components/search/SearchBar";
import { EventSkeleton } from "@/components/skeletons/events/EventSkeleton";
import useDebounce from "@/hooks/debouncing";
import usePageTitle from "@/hooks/usePageTitle";
import MainLayout from "@/layouts/MainLayout";
import { getCategory } from "@/utils/helpers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Events = () => {
  usePageTitle("Events");
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const { data, isLoading } = FetchEventsForUsers({
    page,
    limit,
    search: debouncedSearch,
  });

  const events = data?.events || [];

  console.log("events", events);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-4 md:gap-5 lg:gap-8 px-6 py-10 md:px-10 3xl:mx-auto 3xl:max-w-7xl">
        {/* header */}
        <div
          className="relative w-full h-40 sm:h-52 md:h-64 lg:h-72 rounded-2xl overflow-hidden"
          style={{
            backgroundImage: `url(${EventsBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center" />
        </div>

        {/* search and filter */}
        <div className="flex items-center gap-2 md:gap-3">
          <SearchBar
            value={search}
            onSearch={handleSearchChange}
            variant="default"
            placeholder="Search Events.."
          />
        </div>
        <h1 className="text-3xl text-black font-medium">Upcoming Events</h1>
        {/* events */}
        <div className="flex flex-col gap-8 py-4">
          {isLoading ? (
            <EventSkeleton />
          ) : events.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">No Events found.</p>
            </div>
          ) : (
            events.map((event) => <Event key={event.id} event={event} />)
          )}
        </div>
        {data?.pagination && events.length > 0 && (
          <CustomPagination
            currentPage={page}
            totalPages={data.pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </MainLayout>
  );
};

const Event = ({ event }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/events/${event.id}`);
  };
  return (
    <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:items-start md:justify-start border-b-[1px] border-b-custom-gray pb-8">
      <div className="w-32 md:w-52 h-52 aspect-square rounded-full overflow-hidden">
        <img
          src={event.image_url}
          alt="event"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 items-center justify-center md:items-start md:justify-start text-center md:text-left">
        <h2 className="font-medium text-black text-xs md:text-sm">
          {new Date(event.eventDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </h2>
        <h1 className="font-medium text-black md:text-3xl text-xl">
          {event.title}
        </h1>

        <div className="flex items-center overflow-x-scroll gap-2 w-72 lg:flex-wrap md:w-full lg:overflow-x-hidden">
          {event.EventTags.map((item, index) => (
            <div
              key={index}
              className="bg-custom-gray text-black font-normal text-xs md:text-sm px-2 py-1 rounded-full shrink-0"
            >
              {getCategory(item)}
            </div>
          ))}
        </div>
        <p className="text-black font-normal text-sm py-1 truncate">
          {event.venue}
        </p>
        {/* statsu adn endtime */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-custom-gray text-black font-normal text-xs md:text-sm px-2 py-1 rounded-full shrink-0">
              {event.status}
            </div>
            <p className="text-black font-normal text-sm py-1 truncate">
              {new Date(event.eventDate).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </p>
          </div>
        </div>

        <p className="text-black font-normal text-sm py-1 truncate">
          {event.shortDesc}
        </p>
        <SecondaryButton
          variant="dark"
          title="View Details"
          className="text-sm py-1"
          onClickHandler={handleNavigate}
        />
      </div>
    </div>
  );
};

export default Events;
