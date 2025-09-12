import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";

const UserModuleProgress = sequelize.define(
  "user_module_progress",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    moduleId: { type: DataTypes.UUID, allowNull: false },
    obtainedXP: { type: DataTypes.INTEGER, defaultValue: 0 },
    badge: {
      type: DataTypes.ENUM("Bronze", "Silver", "Gold", "Platinum"),
      defaultValue: "Bronze",
    },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: false },
    isCompleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    completedAt: { type: DataTypes.DATE },
  },
  {
    timestamps: true,
  }
);

export default UserModuleProgress;
