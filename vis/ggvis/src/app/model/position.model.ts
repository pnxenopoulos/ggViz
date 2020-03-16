export class Position {

    constructor(public x: number, public y: number){}

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    getNormalizedX(viewportXSize: number, originalViewportXSize: number){
        return (this.x * viewportXSize) / originalViewportXSize;
    }

    getNormalizedY(viewportYSize: number, originalViewportYSize: number){
        return (this.y * viewportYSize) / originalViewportYSize;
    }
}


// const xNorm = (x * 811) / 1024;
// const yNorm = (y * 811) / 1024;