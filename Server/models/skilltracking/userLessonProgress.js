import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";

const UserLessonProgress = sequelize.define(
  "UserLessonProgress",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER, // Must match users.id type
      allowNull: false,
      references: {
        model: 'users',
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    lessonId: {
      type: DataTypes.UUID, // Must match lessons.id type
      allowNull: false,
      references: {
        model: 'lessons',
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    quizCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    xpEarned: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "user_lesson_progress",
    timestamps: true,
    underscored: true, // optional, makes column names snake_case
    indexes: [{ unique: true, fields: ["user_id", "lesson_id"] }],
  }
);

export default UserLessonProgress;