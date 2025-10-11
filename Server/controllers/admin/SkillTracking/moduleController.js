// import { errorResponse, successResponse } from "../../../utils/handlers/reponseHandler.js";
// import { PostModules } from "./moduleServices.js";

// export const postModules = async (req, res) => {
//   try {
//     const { title, description, badge, totalXP, sequence, category } = req.body;

//     // Validation
//     if (!title || !description || !badge || !totalXP || !sequence || !category) {
//       return errorResponse(res, "All fields are required", 400);
//     }

//     // Service call
//     const result = await PostModules(category, title, description, badge, totalXP, sequence);

//     // If your PostModules returns something like { status, message, data }:
//     return successResponse(res, { data: result }, "Module created successfully", 201);
//   } catch (error) {
//     console.error("Something went wrong:", error);
//     return errorResponse(res, error);
//   }
// };

// export const getAllModules = async (req, res) => {
//   try {
//     const modules = await GetAllModules();
//     if (!modules || modules.length === 0) {
//       return errorResponse(res, "No modules found", 404);
//     }
//     return successResponse(res, { modules }, "Modules fetched successfully");
//   } catch (err) {
//     return errorResponse(res, err);
//   }
// };