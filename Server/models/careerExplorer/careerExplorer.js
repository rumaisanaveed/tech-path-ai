import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";


const Career = sequelize.define(
  "Career",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING(180),
      allowNull: false,
      unique: true,
    },

    metaTitle: {
      type: DataTypes.STRING(160),
      allowNull: true,
    },

    metaDescription: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    metaKeywords: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    shortDesc: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },

    longDesc: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("draft", "published"),
      defaultValue: "published",
    },
  },
  {
    tableName: "careers",
    timestamps: true
  }
);

export default Career;
