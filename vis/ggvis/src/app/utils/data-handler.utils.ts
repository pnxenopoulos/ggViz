import * as _ from 'lodash';
import { Player } from '../model/player.model';
import { Trajectory } from '../model/trajectory.model';
import { Position } from '../model/position.model';

export class DataHandler {

    static formatTrajectories(trajectories: any):  { [id: string] : Player } {

        const players: { [id: string] : Player } = {};

        let currentTime: number = 0;
        _.forEach(trajectories, tick => {
            _.forEach(tick, playerInfo => {

                if(!(playerInfo.PlayerName in players)) {
                    
                    // creating player
                    const player: Player = this.createNewPlayer(playerInfo);
                    
                    // adding stopped position
                    const initialPosition: Position = new Position(playerInfo.XViz, playerInfo.YViz)
                    player.trajectory.addInitialPosition(currentTime, initialPosition);
                    
                    // saving player
                    players[player.name] = player;
                }

                // adding tick position to all players
                const currentPlayer: Player = players[playerInfo.PlayerName];
                const currentPosition: Position = new Position(playerInfo.XViz, playerInfo.YViz);
                currentPlayer.trajectory.addPosition(currentPosition);

                // if (playerKey in players) {
                //    players[playerKey].push(this.normalizeTrajectories(playerInfo.XViz, playerInfo.YViz));
                // } else {
                //     players[playerKey] = [];
                //     players[playerKey].push(this.normalizeTrajectories(playerInfo.XViz, playerInfo.YViz));
                // }


            });

            _.forEach(players, player => {

                const playerTrajectory: Trajectory = player.trajectory;
                if(playerTrajectory.getTrajectoryLength() < currentTime){
                    playerTrajectory.repeatLastPosition();
                }

            });

            currentTime++;
        });

        return players;
    }

    private static createNewPlayer(playerInfo: any) {

        const trajectory: Trajectory = new Trajectory();
        const player: Player = new Player(playerInfo.PlayerName, playerInfo.Side, playerInfo.Team, trajectory);
        return player;

    }

    private static normalizeTrajectories(x: number, y: number){

        const xNorm = (x * 811) / 1024;
        const yNorm = (y * 811) / 1024;

        return [xNorm, yNorm];

    }
}
