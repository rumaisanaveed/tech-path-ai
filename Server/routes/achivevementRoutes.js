import express from 'express';
import { verifyToken } from '../middleware/verifyToken.js';
import { getAchievementsController,getLeaderboardController } from '../controllers/achievement/achievementController.js';

const router = express.Router();

// Sample progress data
router.get("/progress/:careerDomainId", verifyToken, getAchievementsController)

router.get("/leaderboard/:domainId", verifyToken, getLeaderboardController)


export default router;