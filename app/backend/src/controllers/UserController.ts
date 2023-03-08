import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import IuserService from '../interface/IuserService';
import Jwt from '../utils/jwt/JwtMethods';
import { UserService } from '../services';

export default class UserController {
  constructor(
    private _userService: IuserService = new UserService(),
    private _JwtMethods = new Jwt(),
  ) {}

  LoginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    return res.status(200).json(await this._userService.LoginUser(email, password));
  };

  fetchRole = (req: Request, res: Response) => {
    const { authorization } = req.headers;
    if (authorization) {
      const user = this._JwtMethods.tokenvalidation(authorization) as JwtPayload;
      const { role } = user;

      return res.status(200).json({ role });
    }
  };
}
