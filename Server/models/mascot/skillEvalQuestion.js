// models/skillEvalQuestion.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";
import CareerDomain from "../skilltracking/careerDomain.js";
import skillEvalType from "./skillEvalType.js";
import skillEvalCategory from "./skillEvalCategory.js";

const SkillEvalQuestion = sequelize.define(
  "SkillEvalQuestion",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    questionText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: skillEvalCategory, key: "id" },
      onDelete: "SET NULL",
    },

    typeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: skillEvalType, key: "id" },
      onDelete: "SET NULL",
    },

    careerDomainId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: CareerDomain, key: "id" },
      onDelete: "CASCADE",
    },

    // Useful for MCQ / scale questions
    options: {
      type: DataTypes.JSON,
      allowNull: true, // e.g. ["No", "Some", "Yes"] or [{id:1, label:"..."}, ...]
    },

    difficultyLevel: {
      type: DataTypes.ENUM("beginner", "intermediate", "advanced"),
      allowNull: true,
    },
    // example/sample answer for guided assessments or admin preview
    sampleAnswer: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "skill_eval_questions",
    timestamps: true,
  }
);

export default SkillEvalQuestion;
