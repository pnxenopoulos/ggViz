export class Slider {

    timeSet: number;
    range: number[];

    constructor(nTimeSteps: number) {

        this.range = [0, nTimeSteps];
        this.timeSet = 0;

    }

    getRange(): number[] {
        return this.range;
    }

    getCurrentTimeSet(): number {
        return this.timeSet;
    }

    setCurrentTimeSet(timeSet: number): void {
        this.timeSet = timeSet;
    }

}
