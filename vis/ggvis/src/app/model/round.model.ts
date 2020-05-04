import { Annotation } from './annotation.model';

export class Round {

    public movementDataT: {timestamp: number, distBombsiteA: number, distBombsiteB: number} [] = [];
    public movementDataCT: {timestamp: number, distBombsiteA: number, distBombsiteB: number}[] = []; 

    public winProbabilityData: { timestamp: number, CTWinProb: number, TWinProb: number } [] = [];

    public annotations: Annotation[] = [];

    public kills: any[] = [];

    constructor(
        public roundNumber: number,
        public roundLoserTeam: string,
        public roundWinnerTeam: string,
        public sideWinner: string, 
        public startCTScore: number,
        public startTScore: number,
        public endCTScore: number,
        public endTScore: number
    ) {}


    attachMovementData(movementData: any[], teamSide: string){
        if(teamSide == 'CT') {
            this.movementDataCT = movementData;
        } else {
            this.movementDataT = movementData;
        }
    }

    attachWinProbabilityData(winProbabilityData: any){
        this.winProbabilityData = winProbabilityData;
    }

    attachKills(killsData: any){
        this.kills = killsData;
    }

    getAllKills(){
        return this.kills;
    }

    getWinProbAtTimestep(timestep: number){

        const timestempIndex = Math.floor(timestep);
        return this.winProbabilityData[timestempIndex];

    }

    attachAnnotations(annotations: Annotation[]){
        this.annotations = annotations;
    }

}