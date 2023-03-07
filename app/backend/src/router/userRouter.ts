import { Request, Router, Response } from 'express';
import UserValidation from '../middlewares/ThereIsUser';
import { UserController } from '../controllers';

const router = Router();
const UsersController = new UserController();

router.post(
  '/',
  UserValidation.ThereIsEmail,
  UserValidation.ThereIsPassword,
  (req: Request, res: Response) => UsersController.LoginUser(req, res),
);

export default router;
