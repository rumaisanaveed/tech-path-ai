import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";

const UserQuizAnswer = sequelize.define(
  "user_quiz_answer",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    lessonId: { type: DataTypes.UUID, allowNull: false },
    quizQuestionId: { type: DataTypes.UUID, allowNull: false },
    selectedOption: { type: DataTypes.INTEGER },
    isCorrect: { type: DataTypes.BOOLEAN },
    answeredAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    timestamps: false,
  }
);

export default UserQuizAnswer;
