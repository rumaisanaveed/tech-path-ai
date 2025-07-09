import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";


const Module = sequelize.define("Module", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  careerDomainId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  badge: {
    type: DataTypes.STRING,
  },
  totalXP: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  sequence: {
    type: DataTypes.INTEGER,
  }
});

export default Module;
