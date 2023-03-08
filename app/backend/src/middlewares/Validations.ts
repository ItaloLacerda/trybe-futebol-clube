import { NextFunction, Request, Response } from 'express';
import Jwt from '../utils/jwt/JwtMethods';

export default class Validations {
  constructor(
    private _JwtMethods = new Jwt(),
  ) {}

  thereIsToken = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    try {
      this._JwtMethods.tokenvalidation(authorization);
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  };
}
