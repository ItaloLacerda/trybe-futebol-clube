import { ModelStatic } from 'sequelize';
import { compare } from 'bcryptjs';
import UserValidation from '../utils/validations/UserValidation';
import Errors from '../utils/errors/ErrorsMap';
import IuserService from '../interface/IuserService';
import UserModel from '../database/models/UserModel';
import JwtMethods from '../utils/jwt/JwtMethods';

export default class UserService implements IuserService {
  constructor(
    private _userModel: ModelStatic<UserModel> = UserModel,
    private _jwt = new JwtMethods(),
  ) {}

  async LoginUser(Email: string, Password: string) {
    const { emailValidation, passwordValidation } = UserValidation;
    const mensageError = 'Invalid email or password';

    if (!emailValidation(Email) || !passwordValidation(Password)) {
      throw new Errors('401', mensageError);
    }

    const userModel = await this._userModel.findOne({
      where: {
        email: Email,
      },
    });

    if (!userModel) throw new Errors('401', mensageError);

    const { password, id, email, role, username } = userModel;

    const validatePassword = await compare(Password, password);

    if (!validatePassword) throw new Errors('401', mensageError);

    return { token: this._jwt.createToken({ id, email, role, username }) };
  }
}
