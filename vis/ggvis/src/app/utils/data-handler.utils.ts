import * as _ from 'lodash';
import { Player } from '../model/player.model';
import { Trajectory } from '../model/trajectory.model';
import { Position } from '../model/position.model';

export class DataHandler {

    static formatWinProbabilityAndMovement(winProbAndMovement: any) {

        const winProbabilities: { timestamp: number, CTWinProb: number, TWinProb: number } [] = [];

        const movementDataCT: {timestamp: number, distBombsiteA: number, distBombsiteB: number} [] = [];
        const movementDataT: {timestamp: number, distBombsiteA: number, distBombsiteB: number} [] = [];

        let currentTime: number = 0;
        _.forEach(winProbAndMovement, tick => {

            const currentWinProbObj = { 
                timestamp: currentTime,
                CTWinProb: tick.CTWinProb,
                TWinProb: 1 - tick.CTWinProb,
            };

            const currentMovementCTObj = {
                timestamp: currentTime,
                distBombsiteA: tick.CTDistBombsiteA,
                distBombsiteB: tick.CTDistBombsiteB
            };

            const currentMovementTObj = {
                timestamp: currentTime,
                distBombsiteA: tick.TDistBombsiteA,
                distBombsiteB: tick.TDistBombsiteB
            }


            winProbabilities.push(currentWinProbObj);
            movementDataCT.push(currentMovementCTObj);
            movementDataT.push(currentMovementTObj)


            currentTime++;
        });


        return { winProbability: winProbabilities, movementCT: movementDataCT, movementT: movementDataT };
    }

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
}
