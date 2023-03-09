import { Router } from 'express';
import { MatcheController } from '../controllers';
import Validations from '../middlewares/Validations';

const router = Router();

const { thereIsToken } = new Validations();
const {
  fetchAllMatches,
  fetchMatchByProgress,
  finishAMatch,
  updateScore,
  registerANewGame } = new MatcheController();

router.get('/', fetchMatchByProgress, fetchAllMatches);

router.post('/', thereIsToken, registerANewGame);

router.patch('/:id/finish', thereIsToken, finishAMatch);

router.patch('/:id', thereIsToken, updateScore);

export default router;
