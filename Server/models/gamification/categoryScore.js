import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";

const CategoryScore = sequelize.define(
  "categoryScoreGame",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sessionId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalScore: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    badge: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "Bronze",
    },
  },
  {
    timestamps: true,
  }
);

export default CategoryScore;
