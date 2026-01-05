import { ImageHeader } from "@/components/ImageHeader";
import MainLayout from "@/layouts/MainLayout";
import React, { useState, useEffect } from "react";
import usePageTitle from "@/hooks/usePageTitle";
import { truncateText } from "@/utils/helpers";
import { Link, useParams } from "react-router-dom";
import EventDetailsSkeleton from "@/components/skeletons/events/EventDetailsSkeleton";
import {
  FetchSingleEventForUsers,
  useEnrollIntoEvent,
  useCancelEnrollment,
} from "@/apiService/Events";
import { SecondaryButton } from "@/components/buttons/SecondaryButton";

const EventDetails = () => {
  usePageTitle("Event Details");

  const { id } = useParams();
  const { data, isLoading } = FetchSingleEventForUsers(id);
  const event = data;

  // Dynamic enrollment status
  const [enrollmentStatus, setEnrollmentStatus] = useState(
    event?.enrollmentStatus || "not_enrolled"
  );

  // Enroll mutation
  const { mutate: enrollEvent, isLoading: isEnrolling } = useEnrollIntoEvent(
    event?.id,
    {
      onSuccess: () => setEnrollmentStatus("enrolled"),
      onError: (error) => console.error("Enrollment failed:", error),
    }
  );

  // Cancel enrollment mutation
  const { mutate: cancelEnrollment, isLoading: isCancelling } =
    useCancelEnrollment(event?.id, {
      onSuccess: () => setEnrollmentStatus("not_enrolled"),
      onError: (error) => console.error("Cancel failed:", error),
    });

  useEffect(() => {
    if (event?.enrollmentStatus) {
      setEnrollmentStatus(event.enrollmentStatus);
    }
  }, [event]);

  if (isLoading) return <EventDetailsSkeleton />;
  if (!event)
    return (
      <div className="text-center py-10 text-gray-500">Event not found.</div>
    );

  return (
    <MainLayout>
      <div className="w-full px-4 sm:px-8 md:px-10 lg:px-20 py-10 flex flex-col gap-6 lg:gap-10">
        {/* Header */}
        <ImageHeader
          imagePath={event?.image_url}
          variant="event"
          imageClassName="max-h-[400px]"
          customBodyContainerClassName="lg:gap-2 lg:p-7"
          customBody={
            <>
              <h1 className="text-2xl line-clamp-5 md:text-4xl font-semibold">
                {truncateText(event?.title, 28)}
              </h1>

              {/* Date & Time */}
              <div className="mt-2">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span>📅</span> Date & Time
                </h3>
                <p className="mt-1">
                  {new Date(event?.eventDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <p>
                  {new Date(
                    `1970-01-01T${event?.startTime}`
                  ).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                  {" – "}
                  {new Date(`1970-01-01T${event?.endTime}`).toLocaleTimeString(
                    "en-US",
                    { hour: "numeric", minute: "2-digit", hour12: true }
                  )}
                </p>
              </div>

              {/* Venue */}
              <div className="mt-2">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <span>📍</span> Venue
                </h3>
                <p className="mt-1">{event?.venue}</p>
              </div>

              {/* External registration link */}
              {event?.registration_type !== "internal" &&
                event?.registration_link && (
                  <div className="mt-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <span>🔗</span> Registration Link
                    </h3>
                    <Link
                      to={event.registration_link}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      Register Here
                    </Link>
                  </div>
                )}
            </>
          }
        />

        {/* Event Details */}
        <div className="flex flex-col gap-6 text-black">
          <p className="text-base leading-relaxed">{event?.shortDesc}</p>

          {event?.LongDesc && (
            <div className="prose max-w-full">
              <div dangerouslySetInnerHTML={{ __html: event.LongDesc }} />
            </div>
          )}

          {/* Tags, Status, Organizer */}
          <div className="flex flex-col gap-3 mt-4">
            {event?.EventTags?.length > 0 && (
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-semibold">🏷️ Tags:</span>
                {event.EventTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-200 text-gray-800 py-1 px-2 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-3">
              <span className="font-semibold">📌 Status:</span>
              <span className="bg-gray-200 text-gray-800 py-1 px-2 rounded-full text-xs">
                {event?.status}
              </span>
            </div>

            {event?.organizer && (
              <div className="flex flex-col gap-1">
                <span className="font-semibold">👤 Organizer:</span>
                <span>
                  {event.organizer.firstName} {event.organizer.lastName}
                </span>
                <span>Email: {event.organizer.email}</span>
              </div>
            )}
          </div>

          {/* Enroll / Cancel Button */}
          <div className="mt-4">
            {enrollmentStatus === "enrolled" ? (
              <SecondaryButton
                title={isCancelling ? "Cancelling..." : "Cancel Enrollment"}
                variant="red"
                onClickHandler={() => cancelEnrollment()}
                disabled={isCancelling}
              />
            ) : (
              <SecondaryButton
                title={isEnrolling ? "Enrolling..." : "Enroll Into Event"}
                variant="dark"
                onClickHandler={() => enrollEvent()}
                disabled={isEnrolling}
              />
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EventDetails;
