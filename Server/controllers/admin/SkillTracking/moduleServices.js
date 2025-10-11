// // import { sequelize } from "../../../config/connectDB.js";
// // import { Module } from "../../../models/index.js";
// // import { Op } from "sequelize";

// // export const PostModules = async (category, title, description, badge, totalXP, sequence) => {
// //   try {
// //     if (!category || !title) {
// //       return { status: 400, message: "Category and title are required" };
// //     }

// //     // Find max number in this category
// //     const [result] = await Module.findAll({
// //       where: { id: { [Op.like]: `module-${category}-%` } },
// //       attributes: [
// //         [sequelize.fn(
// //           "MAX",
// //           sequelize.cast(
// //             sequelize.fn("SUBSTRING_INDEX", sequelize.col("id"), "-", -1),
// //             "UNSIGNED"
// //           )
// //         ), "maxNumber"]
// //       ],
// //       raw: true,
// //     });

// //     const nextNumber = (result.maxNumber || 0) + 1;
// //     const finalModuleId = `module-${category}-${nextNumber}`;

// //     // Create new module
// //     const newModule = await Module.create({
// //       id: finalModuleId,
// //       title,
// //       description,
// //       badge,
// //       totalXP,
// //       sequence,
// //     });

// //     return { status: 201, message: "Module created successfully", module: newModule };
// //   } catch (error) {
// //     console.error("Error in PostModules:", error);
// //     return { status: 500, message: "Failed to create module", error };
// //   }
// // };


// // export const GetAllModules = async () => {
// //   try {
// //     const modules = await Module.findAll();
// //     return modules;
// //   } catch (error) {
// //     console.error("Error in GetAllModules:", error);
// //     return { status: 500, message: "Failed to fetch modules", error };
// //   }
// // };