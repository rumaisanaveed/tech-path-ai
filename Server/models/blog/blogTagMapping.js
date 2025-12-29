import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";
import blogs from "./blogModel.js";
import tag from "./tagModel.js";

const blog_tag_mapping = sequelize.define("blog_tag_mapping", {
  blog_id: {
    type: DataTypes.INTEGER,
    references: { model: blogs, key: "id" },
    allowNull: false,
  },
  tag_id: {
    type: DataTypes.INTEGER,
    references: { model: tag, key: "id" },
    allowNull: false,
  },
}, {
  timestamps: true,
  underscored: true,
  indexes: [
    { fields: ["blog_id"] },
    { fields: ["tag_id"] },
    { fields: ["blog_id", "tag_id"] }, // composite index
  ],
});

export default blog_tag_mapping;
