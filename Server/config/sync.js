import { sequelize } from "./connectDB.js";
import "../models/index.js";

const startApp = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected/updated.");

    // Sync all models with database
    await sequelize.sync(); // Or use { force: true } carefully in dev {alter: true}

    // Start your server here...
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default startApp;
