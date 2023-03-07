import { Request, Response } from 'express';
import IuserService from '../interface/IuserService';
import { UserService } from '../services';

export default class UserController {
  constructor(
    private _userService: IuserService = new UserService(),
  ) {}

  async LoginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    return res.status(200).json(await this._userService.LoginUser(email, password));
  }
}
