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

  fetchMatchByProgress(inProgress: string) {
    return this._MatchesModel.findAll({
      where: { inProgress: inProgress === 'true' },
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

  async finishAMatch(id: number) {
    await this._MatchesModel.update({ inProgress: false }, {
      where: { id },
    });

    return { message: 'Finished' };
  }

  async updateScore(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    await this._MatchesModel.update({ homeTeamGoals, awayTeamGoals }, {
      where: { id },
    });

    return { homeTeamGoals, awayTeamGoals };
  }

  async registerANewGame(
    homeTeamId: number,
    homeTeamGoals: number,
    awayTeamId: number,
    awayTeamGoals: number,
  ) {
    const model = this._MatchesModel
      .create({ homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress: true });

    return model;
  }
}
