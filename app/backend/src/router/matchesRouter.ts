import { Router } from 'express';
import { MatcheController } from '../controllers';

const router = Router();
const MatchesController = new MatcheController();

const { fetchAllMatches, fetchMatchByProgress } = MatchesController;

router.get('/', fetchMatchByProgress, fetchAllMatches);

export default router;
