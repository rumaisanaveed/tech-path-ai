import { CareerDomain, DomainSkill } from "../../../models/index.js";
import { uploadFileToS3 } from "../../../utils/S3.js";

export const createCareerDomain  = async (req, res) => {
  try {
    const { title, description } = req.body;
        let imageUrl = null;
        if (req.file) {
          imageUrl = await uploadFileToS3(req.file); // Upload manually
        }

    if (!title) return res.status(400).json({ message: "Title is required" });

    const domain = await CareerDomain.create({
      title,
      description,
      coverImage: imageUrl || null,
    });

    return res.status(201).json({ message: "Career domain created", domain });
  } catch (error) {
    console.error("Error creating career domain:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};


export const addDomainController = async (req, res) => {
   try {
    const { domainId } = req.params;
    const { name, recommended } = req.body;

    const domain = await CareerDomain.findByPk(domainId);
    if (!domain) return res.status(404).json({ message: "Career domain not found" });

    if (!name) return res.status(400).json({ message: "Skill name is required" });

    const skill = await DomainSkill.create({
      domainId,
      name,
      recommended: recommended ?? true,
    });

    return res.status(201).json({ message: "Skill added to domain", skill });
  } catch (error) {
    console.error("Error adding domain skill:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}