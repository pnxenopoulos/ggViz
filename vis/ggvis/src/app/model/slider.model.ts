export class Slider {

    timeSet: number;
    range: number[];

    constructor(range: number[]) {

        this.range = range;
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
