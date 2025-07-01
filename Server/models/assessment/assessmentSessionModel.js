import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";

const AssessmentSession = sequelize.define(
  "assessmentSession",
  {
    sessionId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // auto-generate
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    isCompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true, // Prevents Sequelize from pluralizing the table name
  }
);
export default AssessmentSession;
