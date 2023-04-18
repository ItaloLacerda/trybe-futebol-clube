import { Router } from 'express';
import { LeaderboardController } from '../controllers';

const router = Router();

const { teamPerformanceInformation, teamPerformanceInformationHome } = new LeaderboardController();

router.get('/', teamPerformanceInformation);
router.get('/home', teamPerformanceInformationHome);
router.get('/away', teamPerformanceInformationHome);

export default router;
