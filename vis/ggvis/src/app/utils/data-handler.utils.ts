import * as _ from 'lodash';

export class DataHandler {


    static formatTrajectories(trajectories: any, listOfPlayers: any) {

        const players = {};

        _.forEach(trajectories, tick => {
            _.forEach(tick, (playerInfo, playerKey) => {

                if (playerKey in players) {
                   players[playerKey].push(this.normalizeTrajectories(playerInfo.XViz, playerInfo.YViz));
                } else {
                    players[playerKey] = [];
                    players[playerKey].push(this.normalizeTrajectories(playerInfo.XViz, playerInfo.YViz));
                }
            });
        });

        return players;
    }


    private static normalizeTrajectories(x: number, y: number){

        const xNorm = (x * 811) / 1024;
        const yNorm = (y * 811) / 1024;

        return [xNorm, yNorm];

    }
}
