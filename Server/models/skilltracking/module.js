import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";

const Module = sequelize.define(
  "Module",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    badge: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    totalXP: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    typeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: "module_types",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },

    sequence: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    prerequisiteModuleId: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    createdBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    tableName: "modules",
    timestamps: true,
  }
);

export default Module;
