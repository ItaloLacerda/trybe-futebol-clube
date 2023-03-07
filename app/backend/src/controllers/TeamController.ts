import { Request, Response } from 'express';
import { TeamService } from '../services';
import { Iteams } from '../interface/Iteams';
import { IteamController } from '../interface/IteamController';

class TeamsController implements IteamController {
  constructor(
    private _teamService: Iteams = new TeamService(),
  ) {}

  async findAll(_req: Request, res: Response) {
    return res.status(200).json(await this._teamService.findAll());
  }

  async findByPk(req: Request, res: Response) {
    const { id } = req.params;

    const teamService = await this._teamService.findByPk(Number(id));

    return res.status(200).json(teamService.message);
  }
}

export default TeamsController;
