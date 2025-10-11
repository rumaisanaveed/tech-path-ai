import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";

const Lesson = sequelize.define(
  "Lesson",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    moduleId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isMandatory: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    sequence: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Optional ordering for UI",
    },
  },
  {
    tableName: "lessons",
    timestamps: true,
    indexes: [{ fields: ["moduleId"] }],
  }
);

export default Lesson;
