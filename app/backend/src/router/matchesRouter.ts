import { Router } from 'express';
import { MatcheController } from '../controllers';
import Validations from '../middlewares/Validations';

const router = Router();

const { thereIsToken } = new Validations();
const { fetchAllMatches, fetchMatchByProgress, finishAMatch } = new MatcheController();

router.get('/', fetchMatchByProgress, fetchAllMatches);

router.patch('/:id/finish', thereIsToken, finishAMatch);

export default router;
