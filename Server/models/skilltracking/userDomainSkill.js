import { sequelize } from "../../config/connectDB.js";
import { DataTypes } from "sequelize";

const UserDomainSkill = sequelize.define("userDomainSkill", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  domainSkillId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "domainskills",
      key: "id",
    }
  },
  progress: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isArchived: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

export default UserDomainSkill;