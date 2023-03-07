import { Request, Router, Response } from 'express';
import { TeamController } from '../controllers';

const router = Router();
const TeamsController = new TeamController();

router.get('/', (req: Request, res: Response) => TeamsController.findAll(req, res));

router.get('/:id', (req: Request, res: Response) => TeamsController.findByPk(req, res));

export default router;
