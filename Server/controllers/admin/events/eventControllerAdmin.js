import {
  errorResponse,
  successResponse,
} from "../../../utils/handlers/reponseHandler.js";
import {
  postEventServices,
  getEventServices,
  getEventByIdService,
  updateEventServices,
  getEnrolledUsersService,
  updateEventStatusService,
  deleteEventService,
} from "./eventServiceAdmin.js";

// Create new event
export const postEventController = async (req, res) => {
  try {
    const {
      title,
      shortDesc,
      eventDate,
      startTime,
      endTime,
      venue,
      longDesc,
      tags = [],
      registration_type,
      registration_link,
    } = req.body;

    // Parse tags if it's a JSON string
    let parsedTags = tags;
    try {
      if (typeof tags === "string") {
        parsedTags = JSON.parse(tags);
      }
    } catch (e) {
      parsedTags = tags;
    }

    if (!title || !eventDate || !startTime || !endTime) {
      return errorResponse(
        res,
        "Title, date, start and end time are required",
        400
      );
    }

    if (!registration_type) {
      return errorResponse(res, "Please select event registration type", 400);
    }

    if (
      registration_type === "external" &&
      (!registration_link || !registration_link.trim())
    ) {
      return errorResponse(
        res,
        "Registration link is required for external events",
        400
      );
    }

    const result = await postEventServices({
      title,
      shortDesc,
      eventDate,
      startTime,
      endTime,
      venue,
      longDesc,
      tags: parsedTags,
      registration_type,
      registration_link: registration_link || null,
      file: req.file,
      adminId: req.userId,
    });

    return successResponse(res, result, "Event created successfully", 201);
  } catch (error) {
    console.error("Error creating event:", error);
    return errorResponse(res, error.message || "Unable to create event", 500);
  }
};

// Get events with filters, pagination
export const getEventController = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      status = "all",
      registration_type = "all",
    } = req.query;

    const data = await getEventServices({
      page: Number(page),
      limit: Number(limit),
      search,
      status,
      registration_type,
    });

    return successResponse(res, data, "Events fetched successfully");
  } catch (error) {
    console.error("Error fetching events:", error);
    return errorResponse(res, error.message || "Unable to fetch events", 500);
  }
};

// Get single event by ID
export const getEventByIdController = async (req, res) => {
  try {
    const { eventId } = req.params;

    if (!eventId) {
      return errorResponse(res, "Event ID is required", 400);
    }

    const event = await getEventByIdService(eventId);

    if (!event) {
      return errorResponse(res, "Event not found", 404);
    }

    return successResponse(res, { event }, "Event fetched successfully");
  } catch (error) {
    console.error("Error fetching event:", error);
    return errorResponse(res, error.message || "Unable to fetch event", 500);
  }
};

// Update event info
export const updateEventController = async (req, res) => {
  try {
    const { eventId } = req.params;
    if (!eventId) return errorResponse(res, "Event ID is required", 400);

    const result = await updateEventServices({
      eventId,
      body: req.body,
      file: req.file,
    });

    return successResponse(res, result, "Event updated successfully");
  } catch (error) {
    console.error("Error updating event:", error);
    return errorResponse(res, error.message || "Unable to update event", 500);
  }
};

// Get enrolled users
export const getEnrolledUsersController = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { status, page = 1, limit = 20 } = req.query;

    if (!eventId) return errorResponse(res, "Event ID is required", 400);

    const data = await getEnrolledUsersService({
      eventId,
      status,
      page: Number(page),
      limit: Number(limit),
    });

    return successResponse(res, data, "Enrolled users fetched successfully");
  } catch (error) {
    console.error("Error fetching enrolled users:", error);
    return errorResponse(
      res,
      error.message || "Unable to fetch enrolled users",
      500
    );
  }
};

// Update event status (and enrolled users status)
export const updateEventStatusController = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { status } = req.body;

    if (!eventId || !status)
      return errorResponse(res, "Event ID and status are required", 400);

    const result = await updateEventStatusService({ eventId, status });

    return successResponse(res, result, "Event status updated successfully");
  } catch (error) {
    console.error("Error updating event status:", error);
    return errorResponse(
      res,
      error.message || "Unable to update event status",
      500
    );
  }
};

// Delete event
export const deleteEventController = async (req, res) => {
  try {
    const { eventId } = req.params;

    if (!eventId) {
      return errorResponse(res, "Event ID is required", 400);
    }

    await deleteEventService(eventId);

    return successResponse(res, {}, "Event deleted successfully");
  } catch (error) {
    console.error("Error deleting event:", error);
    return errorResponse(res, error.message || "Unable to delete event", 500);
  }
};
