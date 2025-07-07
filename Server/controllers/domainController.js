import { CareerDomain, DomainSkill, UserDomainSkill } from "../models/index.js";

export const getAllCareerDomainsController = async (req, res) => {
  try {
    const domains = await CareerDomain.findAll({
      include: {
        model: DomainSkill,
        as: "skills",
        attributes: ["id", "name", "recommended"],
      },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({ domains });
  } catch (error) {
    console.error("❌ Error fetching career domains:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const enrollUserInDomainController = async (req, res) => {
  try {
    const { domainId } = req.params;
    const userId = req.userId; // assuming `verifyToken` sets this

    // 🔍 Step 1: Check if domain exists and is active
    const domain = await CareerDomain.findByPk(domainId);
    if (!domain || domain.isActive === false) {
      return res
        .status(404)
        .json({ message: "Career domain not found or not available." });
    }

    // 🎯 Step 2: Get all recommended skills from that domain
    const recommendedSkills = await DomainSkill.findAll({
      where: { domainId, recommended: true },
    });

    if (!recommendedSkills.length) {
      return res
        .status(404)
        .json({ message: "No recommended skills found in this domain." });
    }

    // 🧱 Step 3: Prepare userSkill rows
    const userSkills = recommendedSkills.map((skill) => ({
      userId,
      domainSkillId: skill.id,
      progress: 0, // default progress
      completed: false,
      isArchived: false, // recommended, so not archived
    }));

    // 🛑 Step 4: Check for duplicates and filter them out
    const existing = await UserDomainSkill.findAll({
      where: {
        userId,
        domainSkillId: recommendedSkills.map((s) => s.id),
      },
    });

    const existingSkillIds = new Set(existing.map((e) => e.domainSkillId));
    const newUserSkills = userSkills.filter(
      (us) => !existingSkillIds.has(us.domainSkillId)
    );

    if (!newUserSkills.length) {
      return res
        .status(409)
        .json({ message: "All recommended skills are already enrolled." });
    }

    // 💾 Step 5: Insert into userDomainSkill
    await UserDomainSkill.bulkCreate(newUserSkills);

    return res.status(201).json({
      message: "User enrolled in domain successfully with recommended skills.",
      insertedSkills: newUserSkills.length,
    });
  } catch (error) {
    console.error("❌ Error enrolling user in domain:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getUserDomainSkills = async (req, res) => {
  try {
    const { domainId } = req.params;
    const userId = req.userId;

    // 1️⃣ Check if domain exists
    const domain = await CareerDomain.findByPk(domainId);
    if (!domain) {
      return res.status(404).json({ message: "Career domain not found." });
    }

    // 2️⃣ Get user's enrolled skills for the given domain (including isArchived)
    const userSkills = await UserDomainSkill.findAll({
      where: { userId },
      include: [
        {
          model: DomainSkill,
          as: "skillDetails",
          where: { domainId },
          attributes: ["id", "name", "recommended"],
        },
      ],
    });

    // Filter out archived skills
    const activeSkills = userSkills.filter((entry) => !entry.isArchived);

    if (!activeSkills.length) {
      return res
        .status(404)
        .json({ message: "No active skills found for this user in this domain." });
    }

    // 3️⃣ Format response
    const formatted = activeSkills.map((entry) => ({
      id: entry.id,
      skillId: entry.skillDetails.id,
      skillName: entry.skillDetails.name,
      recommended: entry.skillDetails.recommended,
      progress: entry.progress,
      completed: entry.completed,
      isArchived: entry.isArchived,
    }));

    return res.status(200).json({
      domainId,
      domainTitle: domain.title,
      skills: formatted,
      count: formatted.length,
    });
  } catch (error) {
    console.error("❌ Error fetching user domain skills:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const archiveUserSkillController = async (req, res) => {
  const { userSkillId } = req.params;
  const userId = req.userId;

  try {
    const skill = await UserDomainSkill.findOne({
      where: { id: userSkillId, userId },
    });

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    skill.isArchived = true;
    await skill.save();

    res.status(200).json({ message: "Skill archived successfully" });
  } catch (error) {
    console.error("❌ Error archiving skill:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const addUserSkillController = async (req, res) => {
  const userId = req.userId;
  const { domainSkillId } = req.body;

  try {
    // Ensure the skill exists in DomainSkill
    const skill = await DomainSkill.findByPk(domainSkillId);
    if (!skill) {
      return res.status(404).json({ message: "Domain skill not found" });
    }

    // Check if already added (and archived)
    const existing = await UserDomainSkill.findOne({
      where: { userId, domainSkillId },
    });

    if (existing) {
      if (existing.isArchived) {
        existing.isArchived = false;
        await existing.save();
        return res.status(200).json({ message: "Skill unarchived", skill: existing });
      } else {
        return res.status(409).json({ message: "Skill already added" });
      }
    }

    const newSkill = await UserDomainSkill.create({
      userId,
      domainSkillId,
      progress: 0,
      completed: false,
      isArchived: false,
    });

    res.status(201).json({ message: "Skill added", skill: newSkill });
  } catch (error) {
    console.error("❌ Error adding skill:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUnrecommendedDomainSkillsByDomain = async (req, res) => {
  try {
    const { domainId } = req.params;

    if (!domainId) {
      return res.status(400).json({ message: "Missing domainId in request." });
    }

    const skills = await DomainSkill.findAll({
      where: {
        domainId,
        recommended: false,
      },
      attributes: ["id", "name", "domainId"],
      order: [["id", "ASC"]],
    });

    if (!skills.length) {
      return res
        .status(404)
        .json({ message: "No unrecommended skills found for this domain." });
    }

    res.status(200).json({ domainId, skills });
  } catch (error) {
    console.error("❌ Error fetching unrecommended domain skills:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};