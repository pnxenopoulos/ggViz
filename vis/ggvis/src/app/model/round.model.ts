export class Round {


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

}