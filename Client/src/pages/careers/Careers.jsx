import usePageTitle from "@/hooks/usePageTitle";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
import CareerBg from "@/assets/images/career-bg.png";
import { SearchBar } from "@/components/search/SearchBar";
import { FilterButton } from "@/components/search/Filter";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { CustomPagination } from "@/components/CustomPagination";
import { useNavigate } from "react-router-dom";
import { ImageHeader } from "./components/ImageHeader";
import { CareerCardSkeleton } from "@/components/skeletons/careers/CareerCardSkeleton";
import { GetAllCareer } from "@/apiService/Roadmaps";

const Careers = () => {
  usePageTitle("Careers");

  // Fetch careers from API
  const { data, isLoading } = GetAllCareer();
  const careers = data?.careers || [];

  return (
    <MainLayout>
      <div className="flex flex-col gap-2 md:gap-5 px-6 py-5 md:px-10 3xl:max-w-7xl 3xl:mx-auto">
        {/* header */}
        <ImageHeader bgImage={CareerBg} hide={true} />
        <h1 className="text-3xl text-black md:hidden font-medium">Career Exploration</h1>

        {/* search and filter */}
        <div className="flex items-center gap-2 md:gap-3">
          <SearchBar variant="default" placeholder="Search Careers.." />
          <FilterButton />
        </div>

        {/* careers grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 py-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, idx) => <CareerCardSkeleton key={idx} />)
            : careers.map((career) => (
                <CareerCard key={career.id} career={career} />
              ))}
        </div>

        <CustomPagination />
      </div>
    </MainLayout>
  );
};

const CareerCard = ({ career }) => {
  const navigate = useNavigate();

  const handleView = (id) => {
    console.log("View career ID:", id);
    navigate(`/careers/${id}`); // uncomment if navigation is desired later
  };

  return (
    <div className="flex flex-col gap-3 cursor-pointer transition-transform duration-300">
      <img src={career.imageUrl} alt={career.title} className="w-full h-[200px] object-cover rounded-md" />
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-medium">{career.title}</h2>
        <p className="text-sm font-normal">{career.shortDesc}</p>
      </div>
      <SecondaryButton
        variant="dark"
        title="View Details"
        onClickHandler={() => handleView(career.id)}
      />
    </div>
  );
};

export default Careers;
