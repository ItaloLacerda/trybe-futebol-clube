import { Request, Response } from 'express';
import { LeaderboardService } from '../services';

export default class LeaderboardController {
  constructor(
    private _LeaderboardService = new LeaderboardService(),
  ) {}

  teamPerformanceInformation = async (_req: Request, res: Response) => res
    .status(200)
    .json(await this._LeaderboardService.teamsPerformanceInformation());
}
