import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";

const Events = sequelize.define(
  "Events",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    shortDesc: {
      type: DataTypes.STRING(500),
    },
     longDesc: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    eventDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    venue: {
      type: DataTypes.STRING(255),
    },

    image_url: {
      type: DataTypes.STRING(500),
    },

    status: {
      type: DataTypes.ENUM("upcoming", "cancelled", "completed"),
      defaultValue: "upcoming",
    },
    registration_type: {
      type: DataTypes.ENUM("internal", "external"),
      defaultValue: "internal",
    },

    registration_link: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    // Foreign Key to Users table
    organizer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "events",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

export default Events;
