import { Op } from "sequelize";
import { sequelize } from "../../../config/connectDB.js";
import {
  Events,
  EventTag,
  EventTagMapping,
  EventEnrollment,
  User,
} from "../../../models/index.js";
import { uploadFileToS3 } from "../../../utils/S3.js";

// CREATE EVENT
export const postEventServices = async ({
  title,
  shortDesc,
  longDesc,
  eventDate,
  startTime,
  endTime,
  venue,
  tags = [],
  registration_type,
  registration_link = null,
  file,
  adminId,
}) => {
  const transaction = await sequelize.transaction();

  try {
    let imageUrl = file ? await uploadFileToS3(file, "events", title) : null;

    const event = await Events.create(
      {
        title,
        shortDesc,
        longDesc,
        eventDate,
        startTime,
        endTime,
        longDesc,
        venue,
        image_url: imageUrl,
        organizer_id: adminId,
        registration_type,
        registration_link,
      },
      { transaction }
    );

    if (tags.length > 0) {
      const normalizedTags = [
        ...new Set(tags.map((t) => t.trim().toLowerCase()).filter(Boolean)),
      ];
      const tagRecords = await Promise.all(
        normalizedTags.map((tagName) =>
          EventTag.findOrCreate({
            where: { name: tagName },
            defaults: { name: tagName },
            transaction,
          }).then(([tag]) => tag)
        )
      );
      const mappings = tagRecords.map((tag) => ({
        event_id: event.id,
        tag_id: tag.id,
      }));
      await EventTagMapping.bulkCreate(mappings, {
        transaction,
        ignoreDuplicates: true,
      });
    }

    await transaction.commit();
    return {
      eventId: event.id,
      title: event.title,
      registration_type: event.registration_type,
      registration_link: event.registration_link,
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

// GET EVENTS
export const getEventServices = async ({
  page,
  limit,
  search,
  status,
  registration_type,
}) => {
  const offset = (page - 1) * limit;
  const eventWhere = {};
  if (status !== "all") eventWhere.status = status;
  if (registration_type !== "all")
    eventWhere.registration_type = registration_type;

  const includeTags = {
    model: EventTag,
    attributes: ["id", "name"],
    through: { attributes: [] },
    required: false,
  };
  if (search) {
    includeTags.where = { name: { [Op.like]: `%${search}%` } };
    eventWhere[Op.or] = [{ title: { [Op.like]: `%${search}%` } }];
  }

  const { rows, count } = await Events.findAndCountAll({
    where: eventWhere,
    limit,
    offset,
    order: [["created_at", "DESC"]],
    distinct: true,
    include: [includeTags],
  });

  return {
    events: rows.map((e) => ({
      ...e.toJSON(),
      EventTags: e.EventTags.map((t) => t.name),
    })),
    filters: {
      status: status || "all",
      registration_type: registration_type || "all",
      search: search || "",
    },
    pagination: {
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    },
  };
};

// UPDATE EVENT DETAILS
export const updateEventServices = async ({ eventId, body, file }) => {
  const transaction = await sequelize.transaction();
  try {
    const event = await Events.findByPk(eventId, { transaction });
    if (!event) throw new Error("Event not found");

    const {
      title,
      shortDesc,
      longDesc,
      eventDate,
      startTime,
      endTime,
      venue,
      registration_type,
      registration_link,
      tags,
    } = body;

    let imageUrl = event.image_url;
    if (file)
      imageUrl = await uploadFileToS3(file, "events", title || event.title);

    await event.update(
      {
        title: title || event.title,
        shortDesc: shortDesc ?? event.shortDesc,
        longDesc: longDesc ?? event.longDesc,
        eventDate: eventDate || event.eventDate,
        startTime: startTime || event.startTime,
        endTime: endTime || event.endTime,
        venue: venue ?? event.venue,
        registration_type: registration_type || event.registration_type,
        registration_link: registration_link ?? event.registration_link,
        image_url: imageUrl,
      },
      { transaction }
    );

    if (tags && Array.isArray(tags)) {
      const normalizedTags = [
        ...new Set(tags.map((t) => t.trim().toLowerCase())),
      ];
      const tagRecords = await Promise.all(
        normalizedTags.map((tagName) =>
          EventTag.findOrCreate({
            where: { name: tagName },
            defaults: { name: tagName },
            transaction,
          }).then(([tag]) => tag)
        )
      );

      await EventTagMapping.destroy({
        where: {
          event_id: event.id,
          tag_id: { [Op.notIn]: tagRecords.map((t) => t.id) },
        },
        transaction,
      });

      const mappings = tagRecords.map((tag) => ({
        event_id: event.id,
        tag_id: tag.id,
      }));
      await EventTagMapping.bulkCreate(mappings, {
        transaction,
        ignoreDuplicates: true,
      });
    }

    await transaction.commit();
    return { eventId: event.id, title: event.title };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

// GET ENROLLED USERS
export const getEnrolledUsersService = async ({
  eventId,
  status,
  page = 1,
  limit = 20,
}) => {
  const event = await Events.findByPk(eventId, {
    attributes: [
      "id",
      "title",
      "image_url",
      "eventDate",
      "startTime",
      "endTime",
      "venue",
      "status",
    ],
  });
  if (!event) throw new Error("Event not found");

  const offset = (page - 1) * limit;
  const whereCondition = { event_id: eventId };
  if (status && ["enrolled", "cancelled", "attended"].includes(status))
    whereCondition.status = status;

  const { rows, count } = await EventEnrollment.findAndCountAll({
    where: whereCondition,
    include: [
      { model: User, attributes: ["id", "firstName", "lastName", "email"] },
    ],
    order: [["enrolled_at", "ASC"]],
    limit,
    offset,
    distinct: true,
  });

  return {
    event: {
      id: event.id,
      title: event.title,
      image_url: event.image_url,
      eventDate: event.eventDate,
      startTime: event.startTime,
      endTime: event.endTime,
      venue: event.venue,
      status: event.status,
    },
    totalUsers: count,
    users: rows.map((e) => ({
      enrollmentId: e.id,
      status: e.status,
      enrolledAt: e.enrolled_at,
      user: e.User
        ? {
            id: e.User.id,
            firstName: e.User.firstName,
            lastName: e.User.lastName,
            email: e.User.email,
          }
        : null,
    })),
    pagination: { page, limit, totalPages: Math.ceil(count / limit) },
  };
};

// UPDATE EVENT STATUS
export const updateEventStatusService = async ({ eventId, status }) => {
  const transaction = await sequelize.transaction();
  try {
    const event = await Events.findByPk(eventId, { transaction });
    if (!event) throw new Error("Event not found");

    event.status = status;
    await event.save({ transaction });

    const newEnrollmentStatus =
      status === "cancelled"
        ? "cancelled"
        : status === "completed"
        ? "attended"
        : "enrolled";

    await EventEnrollment.update(
      { status: newEnrollmentStatus },
      { where: { event_id: eventId }, transaction }
    );

    await transaction.commit();
    return {
      eventId: event.id,
      status: event.status,
      updatedEnrollments: newEnrollmentStatus,
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

// GET SINGLE EVENT BY ID
export const getEventByIdService = async (eventId) => {
  const event = await Events.findByPk(eventId, {
    include: [
      {
        model: EventTag,
        attributes: ["id", "name"],
        through: { attributes: [] },
        required: false,
      },
    ],
  });

  if (!event) return null;

  return {
    ...event.toJSON(),
    EventTags: event.EventTags.map((t) => t.name),
  };
};

// DELETE EVENT
export const deleteEventService = async (eventId) => {
  const transaction = await sequelize.transaction();
  try {
    const event = await Events.findByPk(eventId, { transaction });
    if (!event) throw new Error("Event not found");

    // Delete tag mappings
    await EventTagMapping.destroy({
      where: { event_id: eventId },
      transaction,
    });

    // Delete enrollments
    await EventEnrollment.destroy({
      where: { event_id: eventId },
      transaction,
    });

    // Delete event
    await event.destroy({ transaction });

    await transaction.commit();
    return { eventId };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};
