// models/Lesson.js
import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";

const Lesson = sequelize.define("Lesson", {
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
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  content: {
    type: DataTypes.TEXT, // can store markdown/HTML
  },
  videoUrl: {
    type: DataTypes.STRING,
  },
  quiz: {
    type: DataTypes.JSON, // array of questions (optional)
  },
  task: {
    type: DataTypes.JSON, // code task object
  },
  sequence: {
    type: DataTypes.INTEGER,
  },
  estimatedTime: {
    type: DataTypes.STRING,
  },
  xp: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

export default Lesson;
