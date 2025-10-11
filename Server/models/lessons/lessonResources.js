import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";

const LessonResource = sequelize.define(
  "LessonResource",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    lessonId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "lessons",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    type: {
      type: DataTypes.ENUM("YouTube", "Udemy", "W3School", "MDN", "Other"),
      allowNull: false,
      defaultValue: "Other",
    },
    url: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
  },
  {
    tableName: "lesson_resources",
    timestamps: true,
    underscored: true,
  }
);

export default LessonResource;
