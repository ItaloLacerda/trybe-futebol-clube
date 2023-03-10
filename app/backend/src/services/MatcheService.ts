import { ModelStatic } from 'sequelize';
import Errors from '../utils/errors/ErrorsMap';
import MatchesModel from '../database/models/MatchesModel';
import TeamModel from '../database/models/TeamModel';

export default class MatcheService {
  constructor(
    private _MatchesModel: ModelStatic<MatchesModel> = MatchesModel,
    private _TeamModel: ModelStatic<TeamModel> = TeamModel,
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
    const findTeamId = await this._TeamModel.findAll({ attributes: {
      exclude: ['teamName'],
    } });

    const validHomeTeam = findTeamId.some((w) => w.id === homeTeamId);
    const validAwayTeam = findTeamId.some((w) => w.id === awayTeamId);

    if (!validHomeTeam || !validAwayTeam) {
      throw new Errors('404', 'There is no team with such id!');
    }
    const model = this._MatchesModel
      .create({ homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress: true });
    return model;
  }
}
