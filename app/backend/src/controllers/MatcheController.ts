import { Request, Response } from 'express';
import { MatcheService } from '../services';

export default class MatcheController {
  constructor(
    private _matcheService = new MatcheService(),
  ) {}

  fetchAllMatches = async (_req: Request, res: Response) => res
    .status(200).json(await this._matcheService.fetchAllMatches());
}
