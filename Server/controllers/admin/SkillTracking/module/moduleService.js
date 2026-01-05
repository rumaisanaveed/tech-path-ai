import {
  Module,
  DomainModuleMapping,
  ModuleType,
} from "../../../../models/index.js";
import { sequelize } from "../../../../config/connectDB.js";
import slugify from "slugify";
import ModuleProject from "../../../../models/skilltracking/moduleProjectModel.js";

export const CreateModule = async (data) => {
  const transaction = await sequelize.transaction();
  try {
    const slug = slugify(data.title, { lower: true, strict: true });

    // Check for existing slug
    const existingModule = await Module.findOne({ where: { slug } });
    if (existingModule) {
      const error = new Error("A module with this title already exists.");
      error.status = 409;
      throw error;
    }

    // Create module
    const module = await Module.create(
      {
        title: data.title,
        description: data.description,
        badge: data.badge,
        totalXP: data.totalXp,
        typeId: data.typeId,
        sequence: data.sequence,
        isFeatured: data.isFeatured ?? false,
        slug,
        prerequisiteModuleId: data.prerequisiteModuleId || null,
        createdBy: data.createdBy || null,
      },
      { transaction }
    );

    // Map to domain
    await DomainModuleMapping.create(
      {
        careerDomainId: data.domainId,
        moduleId: module.id,
      },
      { transaction }
    );

    await transaction.commit();
    return module;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

export const GetAllModules = async ({ domainId, page = 1, limit = 9 }) => {
  try {
    const offset = (page - 1) * limit;

    // ✅ Count total modules for the given domain
    const totalModules = await DomainModuleMapping.count({
      where: { careerDomainId: domainId },
    });

    // ✅ Fetch paginated modules
    const domainModules = await DomainModuleMapping.findAll({
      where: { careerDomainId: domainId },
      include: [
        {
          model: Module,
          as: "module",
          include: [
            {
              model: ModuleType,
              as: "type",
              attributes: ["id", "name"],
            },
          ],
          attributes: [
            "id",
            "title",
            "description",
            "badge",
            "totalXP",
            "sequence",
            "isFeatured",
            "slug",
            "prerequisitemoduleid",
            "createdAt",
          ],
        },
      ],
      order: [[{ model: Module, as: "module" }, "sequence", "ASC"]],
      limit,
      offset,
    });

    // ✅ Flatten & clean the result
    const modules = domainModules
      .map((dm) => dm.module?.toJSON?.() || dm.module)
      .filter(Boolean)
      .map((module) => ({
        id: module.id,
        title: module.title,
        description: module.description,
        badge: module.badge,
        totalXP: module.totalXP,
        sequence: module.sequence,
        isFeatured: module.isFeatured,
        slug: module.slug,
        type: module.type ? module.type.name : null,
        prerequisiteModuleId: module.prerequisitemoduleid,
        createdAt: module.createdAt,
      }));

    const totalPages = Math.ceil(totalModules / limit);

    return {
      modules,
      totalModules,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error("❌ Error in GetAllModules service:", error);
    throw error;
  }
};

export const DeleteModule = async ({ moduleId, domainId }) => {
  const transaction = await sequelize.transaction();

  try {
    // 1️⃣ Check if module exists
    const module = await Module.findByPk(moduleId, { transaction });
    if (!module) {
      const error = new Error("Module not found");
      error.status = 404;
      throw error;
    }

    // 2️⃣ Check if domain mapping exists
    const mapping = await DomainModuleMapping.findOne({
      where: { moduleId, careerDomainId: domainId },
      transaction,
    });

    if (!mapping) {
      const error = new Error("Module-domain mapping not found");
      error.status = 404;
      throw error;
    }

    // 3️⃣ Delete the mapping for this specific domain
    await DomainModuleMapping.destroy({
      where: { moduleId, careerDomainId: domainId },
      transaction,
    });

    // 4️⃣ Check if this module is mapped to any *other* domains
    const remainingMappings = await DomainModuleMapping.count({
      where: { moduleId },
      transaction,
    });

    // 5️⃣ Only delete the module if no other domain is using it
    if (remainingMappings === 0) {
      await module.destroy({ transaction });
    }

    // 6️⃣ Commit transaction
    await transaction.commit();

    return {
      message: "Module and mapping deleted successfully",
      moduleId,
      domainId,
    };
  } catch (error) {
    await transaction.rollback();
    console.error("❌ Error deleting module:", error);
    throw error;
  }
};

export const CreateModuleProject = async ({ moduleId, projectName }) => {
  try {
    const moduleProject = await ModuleProject.create({
      moduleId,
      projectName,
    });
    return moduleProject;
  } catch (error) {
    console.error("❌ Error creating module project:", error);
    throw error;
  }
}