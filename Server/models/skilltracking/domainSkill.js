// models/DomainSkill.js
import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";

const DomainSkill = sequelize.define(
  "domainSkill",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    domainId: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    recommended: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    timestamps: true,
  }
);


export default DomainSkill;
