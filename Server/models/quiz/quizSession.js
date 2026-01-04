// models/QuizSession.js
import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";

const QuizSession = sequelize.define(
  "QuizSession",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    quizNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    moduleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    badge: {
      type: DataTypes.STRING, // e.g., "Badge 1", "Badge 2", "Badge 3"
      allowNull: false,
    },
    lessonIds: {
      type: DataTypes.JSON, // Array of lesson IDs included in this quiz
      allowNull: false,
    },
    xp: {
      type: DataTypes.FLOAT, // XP user can earn from this quiz
      defaultValue: 0,
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    locked:{
      type: DataTypes.BOOLEAN,
      defaultValue:true,
    },
    score: {
      type: DataTypes.FLOAT, // user's score
      allowNull: true,
    },
    quizTitle: {
      type: DataTypes.STRING, // optional title for the quiz
      allowNull: true,
    },
  },
  {
    tableName: "quiz_sessions",
    timestamps: true,
  }
);

export default QuizSession;
