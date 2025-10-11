// models/skillEvalResponse.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";
import SkillEvalQuestion from "./skillEvalQuestion.js";
import User from "../userModel.js";

const SkillEvalResponse = sequelize.define(
  "SkillEvalResponse",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    // Who answered
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
      onDelete: "CASCADE",
    },

    // Which question
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: SkillEvalQuestion, key: "id" },
      onDelete: "CASCADE",
    },

    // Optional: tie response to a specific domain (fast queries)
    careerDomainId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    // Raw answer text (open-ended or stored fallback)
    answerText: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    // For MCQ: store the chosen option id/label
    selectedOption: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // For scale questions: numeric representation (1-5 etc.)
    answerValue: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
    },
  },
  {
    tableName: "skill_eval_responses",
    timestamps: true,
    indexes: [
      { fields: ["userId"] },
      { fields: ["questionId"] },
      { fields: ["userId", "questionId"] }, // helpful for lookups
    ],
  }
);

export default SkillEvalResponse;
