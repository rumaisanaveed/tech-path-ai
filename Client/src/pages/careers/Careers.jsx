import usePageTitle from "@/hooks/usePageTitle";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
import CareerBg from "@/assets/images/career-bg.png";
import { SearchBar } from "@/components/search/SearchBar";
import { FilterButton } from "@/components/search/Filter";
import Career from "@/assets/images/career.png";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";
import { CustomPagination } from "@/components/CustomPagination";
import { useNavigate } from "react-router-dom";
import { ImageHeader } from "./components/ImageHeader";
import { CareerCardSkeleton } from "@/components/skeletons/careers/CareerCardSkeleton";

export const Careers = () => {
  usePageTitle("Careers");
  // careers from api
  const isLoading = false;
  return (
    <MainLayout>
      <div className="flex flex-col gap-2 md:gap-5 px-6 py-5 md:px-10 3xl:max-w-7xl 3xl:mx-auto">
        {/* header */}
        <ImageHeader bgImage={CareerBg} hide={true} />
        <h1 className="text-3xl text-black md:hidden font-medium">
          Career Exploration
        </h1>
        {/* search and filter */}
        <div className="flex items-center gap-2 md:gap-3">
          <SearchBar variant="default" placeholder="Search Careers.." />
          <FilterButton />
        </div>
        {/* careers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 py-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <>
              {isLoading ? (
                <CareerCardSkeleton key={index} />
              ) : (
                <CareerCard key={index} />
              )}
            </>
          ))}
        </div>
        <CustomPagination />
      </div>
    </MainLayout>
  );
};

const CareerCard = ({ career }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/careers/2");
  };
  return (
    <div
      className="flex flex-col gap-3 cursor-pointer transition-transform duration-300"
      onClick={handleNavigate}
    >
      <img src={Career} alt="career" />
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-medium">UI/UX Designer</h2>
        <p className="text-sm font-normal">
          Designs intuitive user experiences and interfaces
        </p>
      </div>
      <SecondaryButton
        variant="dark"
        title="View Details"
        onClickHandler={handleNavigate}
      />
    </div>
  );
};
