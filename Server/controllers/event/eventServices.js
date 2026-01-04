import { Op } from "sequelize";
import { sequelize } from "../../config/connectDB.js";
import { Events, EventTag, EventEnrollment, User } from "../../models/index.js";

// =======================
// GET ALL EVENTS (USER)
// =======================
export const getUserEventsService = async ({ page, limit, search }) => {
  const offset = (page - 1) * limit;

  const whereCondition = { status: "upcoming" };

  if (search) {
    whereCondition[Op.or] = [
      sequelize.where(
        sequelize.fn("LOWER", sequelize.col("title")),
        "LIKE",
        `%${search.toLowerCase()}%`
      ),
    ];
  }

  const { rows, count } = await Events.findAndCountAll({
    where: whereCondition,
    attributes: [
      "id",
      "title",
      "shortDesc",
      "eventDate",
      "startTime",
      "endTime",
      "venue",
      "image_url",
      "registration_type",
      "status",
    ],
    include: [
      {
        model: EventTag,
        attributes: ["name"],
        through: { attributes: [] },
        required: false,
        ...(search && {
          where: sequelize.where(
            sequelize.fn("LOWER", sequelize.col("name")),
            "LIKE",
            `%${search.toLowerCase()}%`
          ),
        }),
      },
    ],
    limit,
    offset,
    order: [
      ["eventDate", "ASC"],
      ["startTime", "ASC"],
    ],
    distinct: true,
  });

  const events = rows.map((event) => ({
    ...event.toJSON(),
    EventTags: event.EventTags.map((tag) => tag.name),
  }));

  return {
    events,
    message: events.length ? "Events fetched successfully" : "No events found",
    pagination: {
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    },
  };
};

// =======================
// GET EVENT DETAILS
// =======================
export const getEventDetailsService = async ({ eventId, userId }) => {
  const event = await Events.findOne({
    where: { id: eventId },
    include: [
      {
        model: EventTag,
        attributes: ["name"],
        through: { attributes: [] },
      },
      {
        model: User,
        as: "Organizer",
        attributes: ["id", "firstName", "lastName", "email"],
      },
      {
        model: EventEnrollment,
        where: userId ? { user_id: userId } : null,
        required: false,
        attributes: ["status"],
      },
    ],
  });

  if (!event) return null;

  const enrollment = event.EventEnrollments?.[0];
  const enrollmentStatus = enrollment ? enrollment.status : null;

  return {
    id: event.id,
    title: event.title,
    shortDesc: event.shortDesc,
    eventDate: event.eventDate,
    startTime: event.startTime,
    endTime: event.endTime,
    venue: event.venue,
    image_url: event.image_url,
    LongDesc: event.longDesc,
    status: event.status,
    registration_type: event.registration_type,
    registration_link: event.registration_link,
    organizer: event.Organizer
      ? {
          id: event.Organizer.id,
          firstName: event.Organizer.firstName,
          lastName: event.Organizer.lastName,
          email: event.Organizer.email,
        }
      : null,
    EventTags: event.EventTags.map((tag) => tag.name),
    enrollmentStatus,
  };
};

// =======================
// POST EVENT ENROLLMENT
// =======================
export const postEventEnrollmentService = async ({ eventId, userId }) => {
  const transaction = await sequelize.transaction();
  try {
    const event = await Events.findByPk(eventId, { transaction });
    if (!event) throw new Error("Event not found");

    let [enrollment, created] = await EventEnrollment.findOrCreate({
      where: { user_id: userId, event_id: eventId },
      defaults: { status: "enrolled" },
      transaction,
    });

    if (!created && enrollment.status === "enrolled") {
      throw new Error("You are already enrolled in this event");
    } else if (!created && enrollment.status === "cancelled") {
      enrollment.status = "enrolled";
      await enrollment.save({ transaction });
    }

    await transaction.commit();

    return {
      enrollmentId: enrollment.id,
      eventId,
      userId,
      status: enrollment.status,
      message: created
        ? "Enrollment created successfully"
        : "Enrollment reactivated successfully",
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

// =======================
// CANCEL EVENT ENROLLMENT
// =======================
export const cancelEventEnrollmentService = async ({ eventId, userId }) => {
  const transaction = await sequelize.transaction();
  try {
    const enrollment = await EventEnrollment.findOne({
      where: { event_id: eventId, user_id: userId },
      transaction,
    });

    if (!enrollment) throw new Error("You are not enrolled in this event");

    enrollment.status = "cancelled";
    await enrollment.save({ transaction });

    await transaction.commit();

    return {
      enrollmentId: enrollment.id,
      eventId,
      userId,
      status: enrollment.status,
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
