import { Request, Response } from 'express';

export interface IteamController {
  findAll(req: Request, res: Response): Promise<Response<any, Record<string, any>>>,
  findByPk(req: Request, res: Response): Promise<Response<any, Record<string, any>>>
}
