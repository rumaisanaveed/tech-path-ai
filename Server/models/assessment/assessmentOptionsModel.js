import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";

const AssessmentOptions = sequelize.define("assessmentOptions", {
  optionText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  questionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "assessmentQuestion",
      key: "id",
    },
  },
}, {
  freezeTableName: true, // Prevents Sequelize from pluralizing the table name
});

export default AssessmentOptions;
