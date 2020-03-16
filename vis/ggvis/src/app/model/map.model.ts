import { Round } from './round.model';

export class Map {

    constructor(
        public name: string,
        public rounds: Round[]) {}


    public attachRounds( rawRoundData: any ){


        Object.entries( rawRoundData ).forEach( roundNumber => {

            const round: Round = new Round(
                parseInt(roundNumber[0]),
                roundNumber[1]['RoundLoser'],
                roundNumber[1]['RoundWinner'],
                roundNumber[1]['RoundWinnerSide'],
                roundNumber[1]['StartCTScore'],
                roundNumber[1]['StartTScore'],
                roundNumber[1]['EndCTScore'],
                roundNumber[1]['EndTScore']
            )
            this.rounds.push(round);
        });

    }

    public getRound(roundNumber: number): Round{
        return this.rounds[roundNumber];
    }

    public getAllRounds(): Round[]{
        return this.rounds;
    }

}
