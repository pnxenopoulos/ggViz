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
        public startWinProb: any,
        public endWinProb: any){

            this.startWinProb = this.primaryTeam == 'CT' ? startWinProb['CTWinProb'] : startWinProb['TWinProb'];
            this.endWinProb = this.primaryTeam == 'CT' ? endWinProb['CTWinProb'] : endWinProb['TWinProb'];

        }




    public setAttribute( attributeName: string, newValue: string){

        if(attributeName === 'primaryTeam'){
            this.primaryTeam = newValue;
            return this.primaryTeam;
        } else if( attributeName === 'tNumber' ){
            const tNumber = parseInt(newValue);
            this.tNumber = tNumber;
            return this.tNumber;
        } else if( attributeName === 'ctNumber' ){
            const ctNumber = parseInt(newValue);
            this.ctNumber = ctNumber;
            return this.ctNumber;
        }else if( attributeName === 'label' ){
            this.label = newValue;
            return this.label;
        }else if( attributeName === 'description' ){
            this.description = newValue;
            return this.description;
        }else if( attributeName === 'secondaryTeam' ){
            this.secondaryTeam = newValue;
            return this.secondaryTeam;
        }
    }

        


}