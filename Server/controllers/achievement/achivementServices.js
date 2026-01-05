import {
  DomainModuleMapping,
  Module,
  UserModuleMapping,
  CareerDomain,
  User,
} from "../../models/index.js";
import { Op } from "sequelize";

export const GetAchievementsServices = async (userId, careerDomainId) => {
  // 1️⃣ Parallel validation and data fetching
  const [domainExists, allUserDomainModules] = await Promise.all([
    CareerDomain.findByPk(careerDomainId, {
      attributes: ["id"],
      raw: true,
    }),
    UserModuleMapping.findAll({
      where: { userId },
      include: [
        {
          model: Module,
          as: "module",
          required: true,
          attributes: ["id", "title", "description", "badge", "totalXP"],
          include: [
            {
              model: DomainModuleMapping,
              as: "domainModuleMappings",
              required: true,
              where: { careerDomainId },
              attributes: [],
            },
          ],
        },
      ],
      attributes: ["moduleId", "status", "progress"],
    }),
  ]);

  if (!domainExists) throw new Error("Domain not found");
  if (!allUserDomainModules.length)
    throw new Error("No achievements found for this domain");

  // 2️⃣ Single-pass calculation for all metrics
  let totalDomainXP = 0;
  let userCompletedXP = 0;
  const statusCounts = { active: 0, pending: 0, completed: 0 };
  const inProgress = [];
  const completed = [];
  const unlocked = [];

  for (const um of allUserDomainModules) {
    const moduleXP = um.module.totalXP || 0;
    const progress = um.progress ?? 0;

    totalDomainXP += moduleXP;
    userCompletedXP += (moduleXP * progress) / 100;

    statusCounts[um.status]++;

    const moduleData = {
      moduleId: um.module.id,
      title: um.module.title,
      description: um.module.description,
      badge: um.module.badge,
      totalXP: moduleXP,
      progress: um.status === "completed" ? 100 : progress,
    };

    if (um.status === "active") inProgress.push(moduleData);
    else if (um.status === "completed") completed.push(moduleData);
    else if (um.status === "pending") unlocked.push(moduleData);
  }

  // 3️⃣ Calculate domain progress
  const domainProgress =
    totalDomainXP > 0 ? Math.round((userCompletedXP / totalDomainXP) * 100) : 0;

  // 4️⃣ Return response without pagination
  return {
    achievements: {
      inProgress,
      completed,
      unlocked,
    },
    statusCounts,
    userCompletedXP: Math.round(userCompletedXP * 100) / 100,
    totalDomainXP,
    domainProgress,
  };
};
// Helper to calculate level based on total XP
const calculateLevel = (totalXP) => {
  if (totalXP >= 800) return 5;
  if (totalXP >= 600) return 4;
  if (totalXP >= 400) return 3;
  if (totalXP >= 200) return 2;
  return 1;
};

// Core function to build full leaderboard with levels
const buildLeaderboard = async (domainId) => {
  const usersModules = await UserModuleMapping.findAll({
    include: [
      {
        model: Module,
        as: "module",
        required: true,
        attributes: ["id", "totalXP"],
        include: [
          {
            model: DomainModuleMapping,
            as: "domainModuleMappings",
            required: true,
            where: { careerDomainId: domainId },
            attributes: [],
          },
        ],
      },
      {
        model: User,
        as: "user",
        attributes: ["id", "firstName", "lastName"],
      },
    ],
    attributes: ["userId", "progress"],
    raw: false,
  });

  if (!usersModules.length) return [];

  // Aggregate XP per user
  const leaderboardMap = new Map();
  for (const um of usersModules) {
    if (!um.user) continue;

    const userId = um.user.id;
    const moduleXP = um.module.totalXP || 0;
    const earnedXP = (moduleXP * (parseFloat(um.progress) || 0)) / 100;

    if (!leaderboardMap.has(userId)) {
      leaderboardMap.set(userId, {
        userId,
        username: `${um.user.firstName} ${um.user.lastName}`.trim(),
        totalXP: 0,
      });
    }

    leaderboardMap.get(userId).totalXP += earnedXP;
  }

  // Convert map to array and sort descending
  const leaderboard = Array.from(leaderboardMap.values())
    .map((u) => {
      u.totalXP = Math.round(u.totalXP * 100) / 100;
      u.level = calculateLevel(u.totalXP); // assign level here
      return u;
    })
    .sort((a, b) => b.totalXP - a.totalXP);

  // Assign ranks
  let rank = 1;
  let prevXP = null;
  leaderboard.forEach((user, index) => {
    if (prevXP !== null && user.totalXP < prevXP) {
      rank = index + 1;
    }
    user.rank = rank;
    prevXP = user.totalXP;
  });

  return leaderboard;
};

const leaderboardCache = new Map();
const CACHE_TTL = 1 * 60 * 1000; // 1 minutes

// Cached leaderboard
export const GetLeaderboardServicesCached = async (domainId, currentUserId) => {
  const cacheKey = `leaderboard_${domainId}`;
  const cached = leaderboardCache.get(cacheKey);

  let fullLeaderboard;

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    fullLeaderboard = cached.data;
  } else {
    fullLeaderboard = await buildLeaderboard(domainId);
    leaderboardCache.set(cacheKey, { data: fullLeaderboard, timestamp: Date.now() });
  }

  if (!fullLeaderboard || !fullLeaderboard.length) {
    return { topUsers: [], yourRank: null };
  }

  const topUsers = fullLeaderboard.slice(0, 5);
  const yourRank = fullLeaderboard.find((u) => u.userId === currentUserId) || null;

  return { topUsers, yourRank };
};
