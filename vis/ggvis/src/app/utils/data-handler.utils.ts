import * as _ from 'lodash';
import { Player } from '../model/player.model';
import { Trajectory } from '../model/trajectory.model';
import { Position } from '../model/position.model';
import { Annotation } from '../model/annotation.model';
import { Kill } from '../model/kill.model';

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
        const tempTrajectory = tempPlayer.trajectory.trajectory;
        return tempTrajectory.map(trajectoryTick => trajectoryTick.id);

    }


    public static formatKills(ticks: number[], killsData: any){

        const formattedKills: Kill[] = [];
        _.forEach(killsData, (kill, killKey) => {

            const closestTick = this.getClosestValue(ticks, killKey);
            const timestamp = ticks.indexOf(closestTick)
            const killOBJ: Kill = new Kill(timestamp, closestTick, kill['AttackerSide'], kill['VictimSide']);


            formattedKills.push(killOBJ);
        });

        return formattedKills;

    }

    public static getClosestValue(ticks: number[], value: number){

        const closest = ticks.reduce((a, b) => {
            return Math.abs(b - value) < Math.abs(a - value) ? b : a;
        });

        return closest;

    }


    public static formatIncomingAnnotations(annotations: any): Annotation[]{

        const formattedAnnotations: Annotation[] = [];

        _.forEach(annotations, (annotation, annotationKey) => {
            const annotationOBJ = new Annotation( 
                annotation['StartTick'],
                annotation['EndTick'],
                annotation['NumT'],
                annotation['NumCT'],
                annotation['Label'],
                annotation['Description'],
                annotation['PrimaryTeam'],
                annotation['SecondaryTeam'],
                parseFloat(annotation['StartWinProb']),
                parseFloat(annotation['EndWinProb']),
            )

            annotationOBJ.setSaved();
            annotationOBJ.numStartWinProb = parseFloat(annotation['StartWinProb']);
            annotationOBJ.numEndWinProb = parseFloat(annotation['EndWinProb']);
            annotationOBJ.setID( parseInt(annotationKey) );

            formattedAnnotations.push(annotationOBJ);
        });

        return formattedAnnotations;

    }

    public static formatAnnotationRequestParam(annotation: Annotation, gameID: string, map: string, roundNum: number){

        const params = {};

        params['GameID'] = gameID;
        params['MapName'] = map;
        params['RoundNum'] = roundNum;
        params['StartTick'] = annotation.startTime;
        params['EndTick'] = annotation.endTime;
        params['NumT'] = annotation.tNumber;
        params['NumCT'] = annotation.ctNumber;
        params['Label'] = annotation.label;
        params['Tags'] = 'testTag';
        params['Description'] = annotation.description;
        params['PrimaryTeam'] = annotation.primaryTeam;
        params['SecondaryTeam'] = annotation.secondaryTeam;
        params['StartWinProb'] = annotation.numStartWinProb;
        params['EndWinProb'] = annotation.numEndWinProb;

        return params;

    }



}
