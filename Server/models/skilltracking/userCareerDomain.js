 import { DataTypes } from "sequelize";
 import { sequelize } from "../../config/connectDB.js";

 const UserCareerDomain = sequelize.define(
   "user_career_domain",
   {
     id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
     userId: { type: DataTypes.INTEGER, allowNull: false },
     careerDomainId: { type: DataTypes.INTEGER, allowNull: false },
     enrolledAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
   },
   { timestamps: false }
 );

 export default UserCareerDomain;
