import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";

const skillEvalCategory = sequelize.define(
  "skill_Eval_Category",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "skill_eval_categories",
    timestamps: true,
  }
);

export default skillEvalCategory;
