import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";

const category = sequelize.define("categories", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}
, {
  freezeTableName: true, // Prevents Sequelize from pluralizing the table name
}
);

export default category;
