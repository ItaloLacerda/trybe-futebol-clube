import { Request, Response } from 'express';

export interface IteamController {
  findAll(req: Request, res: Response): void
}
