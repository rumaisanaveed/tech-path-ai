import { DataTypes } from "sequelize";
import { sequelize } from "../../config/connectDB.js";

const DomainModuleMapping = sequelize.define(
  "DomainModuleMapping",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    careerDomainId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    moduleId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    customTitle: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    customDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "domain_module_mappings",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["careerDomainId", "moduleId"], 
      },
    ],
  }
);

export default DomainModuleMapping;
