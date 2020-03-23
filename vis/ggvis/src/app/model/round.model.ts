export class Round {

    public movementData: number[] = null;
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


    attachMovementData(movementData: number[]){
        this.movementData = movementData;
    }

    attachWinProbabilityData(winProbabilityData: any){
        this.winProbabilityData = winProbabilityData;
    }

}