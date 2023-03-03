import { ModelStatic } from 'sequelize';
import Errors from '../utils/errors/ErrorsMap';

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

  async findByPk(id: number) {
    const teamModel = await this._teamModel.findByPk(id);

    if (!teamModel) {
      throw new Errors('404', 'one or more "TeamId" not found');
    }

    return { type: '', message: teamModel };
  }
}

export default TeamService;
