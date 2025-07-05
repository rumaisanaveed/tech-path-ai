import { DataTypes } from "sequelize";
import { sequelize } from "../config/connectDB.js";

const trainingSample = sequelize.define("TrainingSample", {
   sessionId: DataTypes.STRING,
    remember: DataTypes.FLOAT,
    understand: DataTypes.FLOAT,
    apply: DataTypes.FLOAT,
    analyze: DataTypes.FLOAT,
    evaluate: DataTypes.FLOAT,
    create_: DataTypes.FLOAT,
    recommendedCareer1: DataTypes.STRING,
    recommendedCareer2: DataTypes.STRING,
    recommendedCareer3: DataTypes.STRING,
    reason1: DataTypes.TEXT,
    reason2: DataTypes.TEXT,
    reason3: DataTypes.TEXT
});

export default trainingSample;