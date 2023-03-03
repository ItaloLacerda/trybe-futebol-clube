import { ModelStatic } from 'sequelize';

import TeamModel from '../database/models/TeamModel';
import { Iteams } from '../interface/Iteams';

class TeamService implements Iteams {
  constructor(
    private _teamModel: ModelStatic<TeamModel> = TeamModel,
  ) { }

  async findAll() {
    const teamModel = await this._teamModel.findAll();

    return teamModel;
  }
}

export default TeamService;
