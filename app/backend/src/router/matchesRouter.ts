import { Router } from 'express';
import { MatcheController } from '../controllers';

const router = Router();
const MatchesController = new MatcheController();

const { fetchAllMatches } = MatchesController;

router.get('/', fetchAllMatches);

export default router;
