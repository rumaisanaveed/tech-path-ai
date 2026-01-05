import usePageTitle from "@/hooks/usePageTitle";
import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { ImageHeader } from "./components/ImageHeader";
import CareerBg from "@/assets/images/career-bg.png";
import { CareerDetailSkeleton } from "@/components/skeletons/careers/CareerDetailsSkeleton";
import { useNavigate, useParams } from "react-router-dom";
import { GetSingleCareer } from "@/apiService/Roadmaps";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";

const CareerDetail = () => {
  const { id } = useParams();
  usePageTitle("Career Details");
  const navigate = useNavigate();

  // Fetch single career
  const { data, isLoading } = GetSingleCareer(id);
  const career = data;

  return (
    <MainLayout>
      {isLoading ? (
        <CareerDetailSkeleton />
      ) : career ? (
        <CareerDetails career={career} navigate={navigate} />
      ) : (
        <div className="text-center py-10 text-gray-500">Career not found.</div>
      )}
    </MainLayout>
  );
};

const CareerDetails = ({ career, navigate }) => {
  return (
    <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 px-6 py-10 md:px-12 lg:px-24">
      {/* Back Button */}
      <div className="w-full">
        <SecondaryButton
          title="← Back"
          variant="light"
          onClickHandler={() => navigate(-1)}
        />
      </div>

      {/* Header Image */}
      <ImageHeader
        bgImage={career.imageUrl || CareerBg}
        heading={career.title}
      />

      {/* Short Description */}
      {career.shortDesc && (
        <p className="text-base md:text-lg text-gray-700 mt-4">
          {career.shortDesc}
        </p>
      )}

      {/* Long Description */}
      {career.longDesc && (
        <div
          className="prose max-w-full mt-6"
          dangerouslySetInnerHTML={{ __html: career.longDesc }}
        />
      )}
    </div>
  );
};

export default CareerDetail;
