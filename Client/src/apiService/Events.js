import { API_ROUTES, ADMIN_API_ROUTES } from "@/constants/apiUrls";
import { API_MODES } from "@/constants/enums";
import axiosReq from "@/services/axiosHelper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// ---------- ADMIN APIS -----------

export const GetAllEvents = ({
  page = 1,
  limit = 9,
  search = "",
  status = "all",
  registration_type = "all",
}) => {
  return useQuery({
    queryKey: ["adminEvents", page, limit, search, status, registration_type],
    queryFn: async () => {
      const url = ADMIN_API_ROUTES.EVENTS.GET_ALL_EVENTS;

      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search) params.append("search", search);
      if (status && status !== "all") params.append("status", status);
      if (registration_type && registration_type !== "all")
        params.append("registration_type", registration_type);

      const res = await axiosReq(API_MODES.GET, `${url}?${params.toString()}`);
      return res.data;
    },
  });
};

export const AddEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData) => {
      const url = ADMIN_API_ROUTES.EVENTS.CREATE_EVENT;
      const res = await axiosReq(API_MODES.POST, url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Event created successfully");
      queryClient.invalidateQueries(["adminEvents"]);
      queryClient.invalidateQueries(["eventsForUsers"]);
    },
    onError: (error) => {
      console.log("Error creating event", error);
      toast.error(error.response?.data?.message || "Failed to create event");
    },
  });
};

// Get Event By ID
export const GetEventById = (eventId) => {
  return useQuery({
    queryKey: ["event", eventId],
    queryFn: async () => {
      const url = ADMIN_API_ROUTES.EVENTS.GET_EVENT(eventId);
      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
    enabled: !!eventId,
  });
};

// Update Event
export const UpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ eventId, formData }) => {
      const url = ADMIN_API_ROUTES.EVENTS.UPDATE_EVENT(eventId);
      const res = await axiosReq(API_MODES.PATCH, url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Event updated successfully");
      queryClient.invalidateQueries(["adminEvents"]);
      queryClient.invalidateQueries(["event"]);
      queryClient.invalidateQueries(["eventsForUsers"]);
    },
    onError: (error) => {
      console.log("Error updating event", error);
      toast.error(error.response?.data?.message || "Failed to update event");
    },
  });
};

// Delete Event
export const DeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (eventId) => {
      const url = ADMIN_API_ROUTES.EVENTS.DELETE_EVENT(eventId);
      const res = await axiosReq(API_MODES.DELETE, url);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Event deleted successfully");
      queryClient.invalidateQueries(["adminEvents"]);
      queryClient.invalidateQueries(["eventsForUsers"]);
    },
    onError: (error) => {
      console.log("Error deleting event", error);
      toast.error(error.response?.data?.message || "Failed to delete event");
    },
  });
};

// ---------- USER APIS -----------
export const FetchEventsForUsers = ({
  page = 1,
  limit = 6,
  search = "",
  tagName = null,
}) => {
  return useQuery({
    queryKey: ["eventsForUsers", page, limit, search, tagName],
    queryFn: async () => {
      const url = API_ROUTES.EVENTS.FETCH_EVENTS_FOR_USERS;

      // Build query params
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (search) params.append("search", search);
      if (tagName) params.append("tagName", tagName);

      // Pass params to API
      const res = await axiosReq(API_MODES.GET, `${url}?${params.toString()}`);
      return res.data;
    },
  });
};

export const FetchSingleEventForUsers = (slug) => {
  return useQuery({
    queryKey: ["singleEvent", slug],
    queryFn: async () => {
      const url = API_ROUTES.EVENTS.FETCH_SINGLE_EVENT(slug);
      const res = await axiosReq(API_MODES.GET, url);
      return res.data;
    },
  });
};

export const useEnrollIntoEvent = (id) => {
  return useMutation({
    mutationFn: async () => {
      console.log("Enrolling into event with ID:", id); // ✅ log here
      const url = API_ROUTES.EVENTS.ENROLL_INTO_EVENT(id);
      const res = await axiosReq(API_MODES.POST, url);
      return res.data;
    },
    onSuccess: (data) => {
      console.log("Enroll success:", data); // ✅ log response
      toast.success(data.message || "Enrolled into event successfully");
    },
    onError: (error) => {
      console.error("Error enrolling into event:", error); // ✅ log error
      toast.error(error.response?.data?.message || "Failed to enroll into event");
    },
  });
};

export const useCancelEnrollment = (eventId) => {
  return useMutation({
    mutationFn: async () => {
      if (!eventId) throw new Error("Event ID is required");
      const url = API_ROUTES.EVENTS.CANCEL_ENROLLMENT(eventId);
      console.log("url", url);
      const res = await axiosReq(API_MODES.PATCH, url);
      return res.data;
    },
    onSuccess: (data) => {
      console.log("Enrollment cancelled successfully:", data);
      toast.success(data.message || "Enrollment cancelled successfully");
    },
    onError: (error) => {
      console.error("Error cancelling enrollment", error);
      toast.error(error.response?.data?.message || "Failed to cancel enrollment");
    },
  });
};