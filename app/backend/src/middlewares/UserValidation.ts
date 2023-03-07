import { NextFunction, Response, Request } from 'express';

class UserValidation {
  public static ThereIsEmail(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  }

  public static ThereIsPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  }
}

export default UserValidation;
