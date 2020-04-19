export class Annotation {

    constructor(
        public startTime: number,
        public endTime: number,
        public tNumber: number,
        public ctNumber: number, 
        public label: string,
        public description: string,
        public primaryTeam: string,
        public secondaryTeam: string, 
        public startWinProb: number,
        public endWinProb: number){}

}