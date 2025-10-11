import { DataTypes } from "sequelize";
import User from "./userModel.js";
import Module from "./skilltracking/module.js";
import { sequelize } from "../config/connectDB.js";

const UserModuleMapping = sequelize.define(
  "UserModuleMapping",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },

    moduleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Module,
        key: "id",
      },
      onDelete: "CASCADE",
    },

    enrolledBy: {
      type: DataTypes.ENUM("mascot", "admin", "self"),
      defaultValue: "mascot",
    },

    status: {
      type: DataTypes.ENUM("active", "completed", "pending"),
      defaultValue: "active",
    },

    progress: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0.0,
    },

    enrolledAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "user_module_mappings",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["userId", "moduleId"], // prevent duplicate enrollments
      },
    ],
  }
);

export default UserModuleMapping;
