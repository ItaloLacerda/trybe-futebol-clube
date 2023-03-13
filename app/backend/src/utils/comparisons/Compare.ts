import { IteamsInformation } from '../../interface/IteamsInformation';

export default class Compare {
  totalPoints = (a: IteamsInformation, b: IteamsInformation): number => {
    if (a.totalPoints === b.totalPoints) {
      return this.totalVictories(a, b);
    }

    if (a.totalPoints > b.totalPoints) {
      return -1;
    }

    return 1;
  };

  totalVictories = (a: IteamsInformation, b: IteamsInformation): number => {
    if (a.totalVictories && b.totalVictories) {
      if (a.totalVictories === b.totalVictories) {
        return this.goalsBalance(a, b);
      }

      if (a.totalVictories > b.totalVictories) {
        return -1;
      }
    }

    return 1;
  };

  goalsBalance = (a: IteamsInformation, b: IteamsInformation) => {
    if (a.goalsBalance === b.goalsBalance) {
      return this.goalsFavor(a, b);
    }

    if (a.goalsBalance > b.goalsBalance) {
      return -1;
    }

    return 1;
  };

  goalsFavor = (a: IteamsInformation, b: IteamsInformation) => {
    if (a.goalsFavor === b.goalsFavor) {
      return this.goalsOwn(a, b);
    }

    if (a.goalsFavor > b.goalsFavor) {
      return -1;
    }

    return 1;
  };

  goalsOwn = (a: IteamsInformation, b: IteamsInformation) => {
    if (a.goalsOwn === b.goalsOwn) {
      return 0;
    }

    if (a.goalsOwn > b.goalsOwn) {
      return -1;
    }

    return 1;
  };
}
