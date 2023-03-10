import { Router } from 'express';
import { LeaderboardController } from '../controllers';

const router = Router();

const { teamPerformanceInformation } = new LeaderboardController();

router.get('/home', teamPerformanceInformation);

export default router;