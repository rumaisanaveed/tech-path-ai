import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";

const tag = sequelize.define("tag", {
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  usageCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  timestamps: true,
});

export default tag;
