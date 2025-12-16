import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  Link2,
  MapPin,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { EventCardsSkeleton } from "./AdminEventsSkeletons";

export const EventsHeader = ({ onAddButtonClick }) => {
  return (
    <div className="flex justify-between">
      <div>
        <h1 className="text-lg md:text-3xl font-bold text-custom-black-light flex items-center gap-3">
          <div className="p-2 bg-custom-text-orange rounded-xl">
            <CalendarDays className="w-4 h-4 md:w-7 md:h-7 text-custom-light-white font-light" />
          </div>
          Events Management
        </h1>
        <p className="text-gray-600 text-sm md:text-lg mt-2">
          Review, approve or reject community and campus events
        </p>
      </div>

      <Button
        variant="primary"
        className="bg-custom-text-orange text-white"
        onClick={onAddButtonClick}
      >
        <Plus className="w-4 h-4 text-white font-bold" />
        <p>Add Event</p>
      </Button>
    </div>
  );
};

export const EventsGrid = ({ isLoading, events = [] }) => {
  const navigate = useNavigate();
  return (
    <>
      {isLoading ? (
        <EventCardsSkeleton />
      ) : (
        <div className="space-y-4">
          {events.map((event) => {
            return (
              <div
                key={event.id}
                className="group bg-white border rounded-xl p-4 flex flex-col justify-center lg:flex-row gap-4 items-center lg:justify-start hover:shadow-md transition"
              >
                {/* Date Block */}
                <div className="flex-shrink-0 text-center w-20">
                  <div className="text-xl font-bold text-custom-text-orange">
                    {new Date(event.date).getDate()}
                  </div>
                  <div className="text-xs text-gray-500 uppercase">
                    {new Date(event.date).toLocaleString("default", {
                      month: "short",
                    })}
                  </div>
                  <div className="text-xs text-gray-400">{event.time}</div>
                </div>

                {/* Event Info */}
                <div className="text-center lg:text-left">
                  <h3 className="font-semibold text-lg group-hover:text-custom-text-orange">
                    {event.name}
                  </h3>
                  <p className="text-sm text-gray-600 max-w-md lg:max-w-full">
                    {event.description}
                  </p>

                  <div className="flex flex-wrap items-center justify-center lg:items-start lg:justify-start gap-2 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {event.venue}
                    </span>

                    {event.registrationLink && (
                      <a
                        href={event.registrationLink}
                        target="_blank"
                        className="flex items-center gap-1 text-custom-text-orange hover:underline"
                      >
                        <Link2 className="w-4 h-4" />
                        Register
                      </a>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 max-w-xs justify-center items-center lg:justify-start">
                  {event.tags?.slice(0, 3).map((tag, i) => (
                    <Badge key={i} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                  {event.tags?.length > 3 && (
                    <Badge variant="secondary">+{event.tags.length - 3}</Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 lg:justify-end lg:items-end grow">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                    onClick={() =>
                      navigate(`/admin/dashboard/events/edit/${event.id}`)
                    }
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(event.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
