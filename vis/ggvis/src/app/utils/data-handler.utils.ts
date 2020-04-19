import * as _ from 'lodash';
import { Player } from '../model/player.model';
import { Trajectory } from '../model/trajectory.model';
import { Position } from '../model/position.model';

export class DataHandler {

    static formatWinProbabilityAndMovement(winProbAndMovement: any, trajectoryTicks: any) {

        const winProbabilities: { timestamp: number, CTWinProb: number, TWinProb: number } [] = [];

        const movementDataCT: {timestamp: number, distBombsiteA: number, distBombsiteB: number} [] = [];
        const movementDataT: {timestamp: number, distBombsiteA: number, distBombsiteB: number} [] = [];


        const winProbTicks = Object.keys(winProbAndMovement);
        const firstWinProbTick = winProbTicks[0];
        const lastWinProbTick = winProbTicks[winProbTicks.length - 1];

        let currentTime: number = 0;

        for(let i = 0; i < trajectoryTicks.length; i ++) {   
            
            if( trajectoryTicks[i] >= firstWinProbTick ){
                break;
            }

            const currentWinProbObj = { 
                timestamp: currentTime,
                CTWinProb: 0,
                TWinProb: 0,
                tick: parseInt(trajectoryTicks[i])
            };

            const currentMovementCTObj = {
                timestamp: currentTime,
                distBombsiteA: 0,
                distBombsiteB: 0,
                tick: parseInt(trajectoryTicks[i])
            };

            const currentMovementTObj = {
                timestamp: currentTime,
                distBombsiteA: 0,
                distBombsiteB: 0,
                tick: parseInt(trajectoryTicks[i])
            }


            winProbabilities.push(currentWinProbObj);
            movementDataCT.push(currentMovementCTObj);
            movementDataT.push(currentMovementTObj)


            currentTime++;


        }
        
        _.forEach(winProbAndMovement, (tick, tickKey) => {

            if(trajectoryTicks.includes(parseInt(tickKey))){
                
                const currentWinProbObj = { 
                    timestamp: currentTime,
                    CTWinProb: tick.CTWinProb,
                    TWinProb: 1 - tick.CTWinProb,
                    tick: parseInt(tickKey)
                };
    
                const currentMovementCTObj = {
                    timestamp: currentTime,
                    distBombsiteA: tick.CTDistBombsiteA,
                    distBombsiteB: tick.CTDistBombsiteB,
                    tick: parseInt(tickKey)
                };
    
                const currentMovementTObj = {
                    timestamp: currentTime,
                    distBombsiteA: tick.TDistBombsiteA,
                    distBombsiteB: tick.TDistBombsiteB,
                    tick: parseInt(tickKey)
                }
    
    
                winProbabilities.push(currentWinProbObj);
                movementDataCT.push(currentMovementCTObj);
                movementDataT.push(currentMovementTObj)
    
    
                currentTime++;
            }
        });


        for(let i = winProbTicks.length; i < trajectoryTicks.length; i++) {   
            
            if( lastWinProbTick >= trajectoryTicks[i]){
                break;
            }

            const currentWinProbObj = { 
                timestamp: currentTime,
                CTWinProb: 1,
                TWinProb: 1,
                tick: parseInt(trajectoryTicks[i])
            };

            const currentMovementCTObj = {
                timestamp: currentTime,
                distBombsiteA: 0,
                distBombsiteB: 0,
                tick: parseInt(trajectoryTicks[i])
            };

            const currentMovementTObj = {
                timestamp: currentTime,
                distBombsiteA: 0,
                distBombsiteB: 0,
                tick: parseInt(trajectoryTicks[i])
            }


            winProbabilities.push(currentWinProbObj);
            movementDataCT.push(currentMovementCTObj);
            movementDataT.push(currentMovementTObj)


            currentTime++;


        }

        return { winProbability: winProbabilities, movementCT: movementDataCT, movementT: movementDataT };
    }

    static formatTrajectories(trajectories: any):  { [id: string] : Player } {

        const players: { [id: string] : Player } = {};

        let currentTime: number = 0;
        _.forEach(trajectories, (tick, tickKey) => {
            _.forEach(tick, (playerInfo) => {

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
                if(playerTrajectory.getTrajectoryLength() <= currentTime){
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

    public static getTrajectoryTicks(players: any){

        const tempPlayer = players[Object.keys(players)[0]];
        console.log(tempPlayer);
        const tempTrajectory = tempPlayer.trajectory.trajectory;
        return tempTrajectory.map(trajectoryTick => trajectoryTick.id);

    }



}
