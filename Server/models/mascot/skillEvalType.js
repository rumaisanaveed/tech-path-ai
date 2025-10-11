import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";

const skillEvalType = sequelize.define(
  "skill_Eval_Type",
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
    tableName: "skill_eval_types",
    timestamps: true,
  }
);

export default skillEvalType;
