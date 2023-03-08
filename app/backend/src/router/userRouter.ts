import { Router } from 'express';
import UserValidation from '../middlewares/ThereIsUser';
import Validations from '../middlewares/Validations';
import { UserController } from '../controllers';

const router = Router();
const UsersController = new UserController();
const ValidationsToken = new Validations();

const { LoginUser, fetchRole } = UsersController;
const { thereIsToken } = ValidationsToken;

router.post(
  '/',
  UserValidation.ThereIsEmail,
  UserValidation.ThereIsPassword,
  LoginUser,
);

router.get('/role', thereIsToken, fetchRole);

export default router;
