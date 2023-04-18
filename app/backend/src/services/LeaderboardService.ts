import { ModelStatic, QueryTypes } from 'sequelize';
import TeamModel from '../database/models/TeamModel';
import sequelize from '../database/models';
import Compare from '../utils/comparisons/Compare';
import { ItotalGames } from '../interface/IteamsInformation';

export default class LeaderboardService {
  constructor(
    private _sequelize = sequelize,
    private _TeamModel: ModelStatic<TeamModel> = TeamModel,
    private _Compare = new Compare(),
  ) {}

  async teamsPerformanceInformation() {
    const teams = await this._TeamModel.findAll();
    const informations = Promise.all(
      teams.map(async (team) => this
        .teamInformation(team.id, team.teamName)),
    );

    const ordeByTeams = (await informations).sort(this._Compare.totalPoints);
    return ordeByTeams;
  }

  async teamsPerformanceInformationHome() {
    const teams = await this._TeamModel.findAll();
    const informations = Promise.all(
      teams.map(async (team) => this
        .homeTeamInfo(team.id, team.teamName)),
    );

    const ordeByTeams = (await informations).sort(this._Compare.totalPoints);
    return ordeByTeams;
  }

  async homeTeamInfo(id: number, name: string) {
    const { totalGames } = await this.getTotalHomeGames(id);
    const totalVictories = await this.fectchTotalWinsAtHome(id);
    const totalLosses = await this.fectchTotalLossesAtHome(id);
    const totalDraws = await this.fectchTotalDrawsAtHome(id);
    const goalsFavor = Number(Object.values(await this.fetchTotalHomeTeamGoals(id))[0]);
    const goalsOwn = Number(Object.values(await this.lookForGoalsConcededAtHome(id))[0]);
    const victoriesDraws = Object.values({ ...totalVictories, ...totalDraws });
    const totalPoints = (Number(victoriesDraws[0]) * 3) + Number(victoriesDraws[1]);
    return { name,
      totalGames,
      totalPoints,
      ...totalVictories,
      ...totalLosses,
      ...totalDraws,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2)) };
  }

  async teamInformation(id: number, name: string) {
    const { totalGames } = await this.fectchTotalGames(id);
    const totalVictories = await this.fectchTotalVictories(id);
    const totalLosses = await this.fectchTotalLosses(id);
    const totalDraws = await this.fectchTotalDraws(id);
    const goalsFavor = await this.calculateGoalsInFavor(id);
    const goalsOwn = await this.calculateGoalsConceded(id);
    const victoriesDraws = Object.values({ ...totalVictories, ...totalDraws });
    const totalPoints = (Number(victoriesDraws[0]) * 3) + Number(victoriesDraws[1]);
    return { name,
      totalPoints,
      totalGames,
      ...totalVictories,
      ...totalDraws,
      ...totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency: Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2)) };
  }

  async fectchTotalGames(id: number): Promise<ItotalGames> {
    const [results] = await this._sequelize
      .query(
        `SELECT COUNT(*) AS totalGames FROM matches
         WHERE in_progress = false 
         AND (home_team_id = ${id} OR away_team_id = ${id});`,
        { type: QueryTypes.SELECT },
      ) as ItotalGames[];
    return results;
  }

  async getTotalHomeGames(id: number): Promise<ItotalGames> {
    const [results] = await this._sequelize
      .query(
        `SELECT COUNT(*) AS totalGames FROM matches
         WHERE in_progress = false 
         AND (home_team_id = ${id});`,
        { type: QueryTypes.SELECT },
      ) as ItotalGames[];
    return results;
  }

  async fectchTotalVictories(id: number) {
    const [results] = await this._sequelize
      .query(
        ` SELECT COUNT(*) as totalVictories FROM matches
          WHERE in_progress = false 
          AND ((home_team_id = ${id} AND home_team_goals > away_team_goals) 
            OR (away_team_id = ${id} AND away_team_goals > home_team_goals));`,
        { type: QueryTypes.SELECT },
      );
    return results;
  }

  async fectchTotalWinsAtHome(id: number) {
    const [results] = await this._sequelize
      .query(
        ` SELECT COUNT(*) as totalVictories FROM matches
          WHERE in_progress = false 
          AND (home_team_id = ${id} AND home_team_goals > away_team_goals);`,
        { type: QueryTypes.SELECT },
      );
    return results;
  }

  async fectchTotalLosses(id: number) {
    const [results] = await this._sequelize
      .query(
        ` SELECT COUNT(*) as totalLosses FROM matches
          WHERE in_progress = false 
          AND ((home_team_id = ${id} AND home_team_goals < away_team_goals) 
            OR (away_team_id = ${id} AND away_team_goals < home_team_goals));`,
        { type: QueryTypes.SELECT },
      );
    return results;
  }

  async fectchTotalLossesAtHome(id: number) {
    const [results] = await this._sequelize
      .query(
        ` SELECT COUNT(*) as totalLosses FROM matches
          WHERE in_progress = false 
          AND (home_team_id = ${id} AND home_team_goals < away_team_goals)`,
        { type: QueryTypes.SELECT },
      );
    return results;
  }

  async fectchTotalDraws(id: number) {
    const [results] = await this._sequelize
      .query(
        ` SELECT COUNT(*) as totalDraws FROM matches 
          WHERE in_progress = false 
          AND (home_team_id = ${id} OR away_team_id = ${id}) 
          AND home_team_goals = away_team_goals;`,
        { type: QueryTypes.SELECT },
      );
    return results;
  }

  async fectchTotalDrawsAtHome(id: number) {
    const [results] = await this._sequelize
      .query(
        ` SELECT COUNT(*) as totalDraws FROM matches 
          WHERE in_progress = false 
          AND (home_team_id = ${id}) 
          AND home_team_goals = away_team_goals;`,
        { type: QueryTypes.SELECT },
      );
    return results;
  }

  async fetchTotalHomeTeamGoals(id: number) {
    const [results] = await this._sequelize
      .query(
        `SELECT sum(home_team_goals) as totalHomeTeamGoals FROM matches 
          WHERE in_progress = false 
          AND (home_team_id = ${id});`,
        { type: QueryTypes.SELECT },
      );
    return results;
  }

  async fetchTotalAwayTeamGoals(id: number) {
    const [results] = await this._sequelize
      .query(
        `SELECT sum(away_team_goals) as totalAwayTeamGoals FROM matches 
          WHERE in_progress = false 
          AND (away_team_id = ${id});`,
        { type: QueryTypes.SELECT },
      );
    return results;
  }

  async calculateGoalsInFavor(id: number) {
    const totalHomeTeamGoals = await this.fetchTotalHomeTeamGoals(id);
    const totalAwayTeamGoals = await this.fetchTotalAwayTeamGoals(id);
    const TeamGoals = Object.values({ ...totalAwayTeamGoals, ...totalHomeTeamGoals });
    return TeamGoals.reduce((acc, cur) => Number(acc) + Number(cur), 0) as number;
  }

  async lookForGoalsConcededAtHome(id: number) {
    const [results] = await this._sequelize
      .query(
        `SELECT sum(away_team_goals) as goalsConcededAtHome FROM matches 
        WHERE in_progress = false 
        AND (home_team_id = ${id});`,
        { type: QueryTypes.SELECT },
      );
    return results;
  }

  async lookForGoalsConcededAtAway(id: number) {
    const [results] = await this._sequelize
      .query(
        `SELECT sum(home_team_goals) as goalsConcededAtAway FROM matches 
        WHERE in_progress = false 
        AND (away_team_id = ${id});`,
        { type: QueryTypes.SELECT },
      );
    return results;
  }

  async calculateGoalsConceded(id: number) {
    const totalHome = await this.lookForGoalsConcededAtHome(id);
    const totalAway = await this.lookForGoalsConcededAtAway(id);
    const TeamGoals = Object.values({ ...totalAway, ...totalHome });
    return TeamGoals.reduce((acc, cur) => Number(acc) + Number(cur), 0) as number;
  }
}
