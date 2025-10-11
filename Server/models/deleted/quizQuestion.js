// import { DataTypes } from "sequelize";
// import { sequelize } from "../../config/connectDB.js";

// const QuizQuestion = sequelize.define("QuizQuestion", {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true,
//   },
//   lessonId: {
//     type: DataTypes.UUID,
//     allowNull: false,
//   },
//   question: {
//     type: DataTypes.TEXT,
//     allowNull: false,
//   },
//   option1: { type: DataTypes.STRING, allowNull: false },
//   option2: { type: DataTypes.STRING, allowNull: false },
//   option3: { type: DataTypes.STRING, allowNull: false },
//   option4: { type: DataTypes.STRING, allowNull: true },
//   correctAnswer: { type: DataTypes.INTEGER, allowNull: false }, // index: 0,1,2,3
//   explanation: { type: DataTypes.TEXT, allowNull: true },
//   sequence: { type: DataTypes.INTEGER },
//   xp: { type: DataTypes.INTEGER, defaultValue: 0 },
// });

// export default QuizQuestion;
