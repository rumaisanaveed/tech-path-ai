import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";

const AssessmentQuestion = sequelize.define("assessmentQuestion", {
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  bloomLevel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bloomWeight: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'categories', // Assuming the category model is named 'categories'
      key: 'id',
    },
  },
}, {
  freezeTableName: true, // Prevents Sequelize from pluralizing the table name
});

export default AssessmentQuestion;
