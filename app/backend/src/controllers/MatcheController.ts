import { NextFunction, Request, Response } from 'express';
import { MatcheService } from '../services';

export default class MatcheController {
  constructor(
    private _matcheService = new MatcheService(),
  ) {}

  fetchAllMatches = async (_req: Request, res: Response) => res
    .status(200).json(await this._matcheService.fetchAllMatches());

  fetchMatchByProgress = async (req: Request, res: Response, next: NextFunction) => {
    if (Object.keys(req.query)[0] === 'inProgress') {
      const { inProgress } = req.query;
      if (inProgress === 'true' || inProgress === 'false') {
        return res.status(200).json(await this._matcheService.fetchMatchByProgress(inProgress));
      }
    }

    return next();
  };

  finishAMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    return res.status(200).json(await this._matcheService.finishAMatch(Number(id)));
  };

  updateScore = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    return res
      .status(200)
      .json(
        await this._matcheService
          .updateScore(Number(id), Number(homeTeamGoals), Number(awayTeamGoals)),
      );
  };

  registerANewGame = async (req: Request, res: Response) => {
    const {
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals } = req.body;

    return res.status(201).json(await this._matcheService
      .registerANewGame(
        Number(homeTeamId),
        Number(homeTeamGoals),
        Number(awayTeamId),
        Number(awayTeamGoals),
      ));
  };
}
