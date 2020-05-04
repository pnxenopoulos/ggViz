export class Kill {
    constructor(
        public timestamp: number, 
        public tick: number,
        public attackerTeam: string,
        public victimTeam: string){}
}