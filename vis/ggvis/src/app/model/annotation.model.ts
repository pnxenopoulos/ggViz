export class Annotation {

    public saved: boolean = false;
    public numStartWinProb: any = 0;
    public numEndWinProb: any = 0;
    public id: number = null;

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
        public endWinProb: any
        ){

            // this.numStartWinProb = this.primaryTeam == 'CT' ? startWinProb['CTWinProb'] : startWinProb['TWinProb'];
            // this.numEndWinProb = this.primaryTeam == 'CT' ? endWinProb['CTWinProb'] : endWinProb['TWinProb'];

        }


    public setSaved(){
        this.saved = true;
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


    setPrimaryTeam(team: string){
        if(team == 'CT'){
            this.primaryTeam = 'CT';
            this.numStartWinProb = this.startWinProb['CTWinProb'];
            this.numEndWinProb = this.endWinProb['CTWinProb'];
            this.secondaryTeam = 'T';
        }else {
            this.primaryTeam = 'T';
            this.numStartWinProb = this.startWinProb['TWinProb'];
            this.numEndWinProb = this.endWinProb['TWinProb'];
            this.secondaryTeam = 'CT';
        }
    }

    setTNumber(tnumber: number){
        this.tNumber = tnumber;
    }

    setCTNumber(ctnumber: number){
        this.ctNumber = ctnumber;
    }

    setID(id: number){
        this.id = id;
    }
        


}