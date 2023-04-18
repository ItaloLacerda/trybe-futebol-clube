import { IteamsInformation } from '../../interface/IteamsInformation';

export default class Compare {
  totalPoints = (a: IteamsInformation, b: IteamsInformation): number => {
    if (a.totalPoints === b.totalPoints) {
      return this.totalVictories(a, b);
    }

    return b.totalPoints - a.totalPoints;
  };

  totalVictories = (a: IteamsInformation, b: IteamsInformation): number => {
    if (a.totalVictories && b.totalVictories) {
      if (a.totalVictories === b.totalVictories) {
        return this.goalsBalance(a, b);
      }

      return b.totalVictories - a.totalVictories;
    }
    return 0;
  };

  goalsBalance = (a: IteamsInformation, b: IteamsInformation) => {
    if (a.goalsBalance === b.goalsBalance) {
      return this.goalsFavor(a, b);
    }

    return b.goalsBalance - a.goalsBalance;
  };

  goalsFavor = (a: IteamsInformation, b: IteamsInformation) => {
    if (a.goalsFavor === b.goalsFavor) {
      return this.goalsOwn(a, b);
    }

    return b.goalsFavor - a.goalsFavor;
  };

  goalsOwn = (a: IteamsInformation, b: IteamsInformation) => {
    if (a.goalsOwn === b.goalsOwn) {
      return 0;
    }

    return b.goalsOwn - a.goalsOwn;
  };
}
