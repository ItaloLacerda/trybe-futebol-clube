import { ModelStatic } from 'sequelize';
import MatchesModel from '../database/models/MatchesModel';
import TeamModel from '../database/models/TeamModel';

export default class MatcheService {
  constructor(
    private _MatchesModel: ModelStatic<MatchesModel> = MatchesModel,
  ) {}

  fetchAllMatches() {
    return this._MatchesModel.findAll({
      include: [{
        model: TeamModel,
        as: 'homeTeam',
        attributes: {
          exclude: ['id'],
        },
      }, {
        model: TeamModel,
        as: 'awayTeam',
        attributes: {
          exclude: ['id'],
        },
      }],
    });
  }
}
