import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";

const ModuleType = sequelize.define(
  "ModuleType",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED, // ✅ UNSIGNED for consistency
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "module_types",
    timestamps: true,
  }
);

export default ModuleType;
