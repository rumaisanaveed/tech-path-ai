import { FilterButton } from "@/components/search/Filter";
import { SearchBar } from "@/components/search/SearchBar";
import usePageTitle from "@/hooks/usePageTitle";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
import EventsBg from "@/assets/images/career-bg.png";
import { CustomPagination } from "@/components/CustomPagination";
import { EventSkeleton } from "@/components/skeletons/events/EventSkeleton";
import EventImage from "@/assets/images/blog.png";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { useNavigate } from "react-router-dom";

export const Events = () => {
  usePageTitle("Events");
  const isLoading = false;
  return (
    <MainLayout>
      <div className="flex flex-col gap-4 md:gap-5 lg:gap-8 px-6 py-10 md:px-12 lg:px-24">
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
          <SearchBar placeholderText="Search Careers.." />
          <FilterButton />
        </div>
        <h1 className="text-3xl text-black font-medium">Upcoming Events</h1>
        {/* events */}
        <div className="flex flex-col gap-8 py-4">
          {Array.from({ length: 5 }).map((_, index) =>
            isLoading ? <EventSkeleton key={index} /> : <Event key={index} />
          )}
        </div>
        <CustomPagination />
      </div>
    </MainLayout>
  );
};

const Event = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/events/2");
  };
  return (
    <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:items-start md:justify-start border-b-[1px] border-b-custom-gray pb-8">
      <div className="w-32 md:w-96 h-full aspect-square rounded-full overflow-hidden">
        <img
          src={EventImage}
          alt="event"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 items-center justify-center md:items-start md:justify-start text-center md:text-left">
        <h2 className="font-medium text-black text-xs md:text-sm">
          Jul 19, 2025 - Conference - Lahore
        </h2>
        <h1 className="font-medium text-black md:text-3xl text-xl">
          Cloud Next Extended | Day 1
        </h1>

        <div className="flex items-center overflow-x-scroll gap-2 w-72 lg:flex-wrap md:w-full lg:overflow-x-hidden">
          {[
            "Android",
            "Build with AI",
            "Community building",
            "Android",
            "Build with AI",
          ].map((item, index) => (
            <div
              key={index}
              className="bg-custom-gray text-black font-normal text-xs md:text-sm px-2 py-1 rounded-full shrink-0"
            >
              {item}
            </div>
          ))}
        </div>
        <p className="text-black font-normal text-sm py-1">
          Google I/O Extended is a community-led series of tech meetups that
          brings the excitement of Google I/O, an annual conference showcasing
          Google's latest developer solutions. It welcomes Google Developer
          Groups, Google Developer Student Clubs, Women Techmakers, and features
          appearances by Google Developer Experts and professionals.
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
