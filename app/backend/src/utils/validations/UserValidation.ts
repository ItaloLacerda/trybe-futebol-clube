import * as Joi from 'joi';

export default class UserValidation {
  static emailIsValid = Joi.string().email().required();
  static passwordIsValid = Joi.string().min(6).required();

  public static emailValidation(email: string) {
    const { error } = UserValidation.emailIsValid.validate(email);

    if (error) return false;

    return true;
  }

  public static passwordValidation(password: string) {
    const { error } = UserValidation.passwordIsValid.validate(password);

    if (error) return false;

    return true;
  }
}
