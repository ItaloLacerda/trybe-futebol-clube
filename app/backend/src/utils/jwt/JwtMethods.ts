import * as jwt from 'jsonwebtoken';

export default class JwtMethods {
  constructor(
    private _secret: jwt.Secret = process.env.JWT_SECRET as jwt.Secret,
  ) {}

  createToken = (payload: jwt.JwtPayload) => {
    const jwtConfig: jwt.SignOptions = {
      expiresIn: '1h',
      algorithm: 'HS256',
    };

    return jwt.sign(payload, this._secret, jwtConfig);
  };

  tokenvalidation = (token: string) => jwt.verify(token, this._secret);
}
