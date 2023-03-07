import { ModelStatic } from 'sequelize';
import { compare } from 'bcryptjs';
import Errors from '../utils/errors/ErrorsMap';
import IuserService from '../interface/IuserService';
import UserModel from '../database/models/UserModel';
import JwtMethods from '../utils/jwt/JwtMethods';

export default class UserService implements IuserService {
  constructor(
    private _teamModel: ModelStatic<UserModel> = UserModel,
    private _jwt = new JwtMethods(),
  ) {}

  async LoginUser(Email: string, Password: string) {
    const userModel = await this._teamModel.findOne({
      where: {
        email: Email,
      },
    });

    if (!userModel) throw new Errors('401', 'Invalid email or password');

    const { password, id, email, role, username } = userModel;
    const validatePassword = await compare(Password, password);

    if (!validatePassword) throw new Errors('401', 'Invalid email or password');

    return { token: this._jwt.createToken({ id, email, role, username }) };
  }
}
