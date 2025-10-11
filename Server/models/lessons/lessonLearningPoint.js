import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";

const LessonLearningPoint = sequelize.define(
  "LessonLearningPoint",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    lessonId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    point: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment: "Single learning point",
    },
  },
  {
    tableName: "lesson_learning_points",
    timestamps: true,
    indexes: [{ fields: ["lessonId"] }],
  }
);

export default LessonLearningPoint;
