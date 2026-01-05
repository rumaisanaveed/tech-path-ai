import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";

const ModuleProject = sequelize.define(
  "module_project",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    moduleId: {
      type: DataTypes.INTEGER.UNSIGNED,  // ✅ Must match Module.id
      allowNull: false,
      references: {
        model: "modules",  // ✅ Table name matches Module table
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE", // or SET NULL if preferred
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "module_projects",
    timestamps: false,
    freezeTableName: true, // prevents Sequelize from pluralizing
  }
);

export default ModuleProject;
