export class Round {

    public movementDataT: {timestamp: number, distBombsiteA: number, distBombsiteB: number} [] = [];
    public movementDataCT: {timestamp: number, distBombsiteA: number, distBombsiteB: number}[] = []; 

    public winProbabilityData: { timestamp: number, CTWinProb: number, TWinProb: number } [] = [];

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

}