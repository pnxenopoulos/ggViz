import { ElementRef } from '@angular/core';

export class Map {

    private divRef: ElementRef;
    private canvasRef: ElementRef;
    private canvasCtx: CanvasRenderingContext2D;


    private imageTest: any;

    constructor(divRef: ElementRef, canvasRef: ElementRef) {

        this. divRef = divRef;
        this.canvasRef = canvasRef;
        this.canvasCtx = canvasRef.nativeElement.getContext('2d');
        this.resizeCanvas();

        this.imageTest = new Image();
        this.imageTest.src = '../../../../assets/images/de_train.png';

    }

    resizeCanvas() {

        const divWidth = this.divRef.nativeElement.offsetWidth;
        const divHeight = this.divRef.nativeElement.offsetHeight;

        const smallest = (divWidth > divHeight) ? divHeight : divWidth;

        this.canvasRef.nativeElement.width = smallest;
        this.canvasRef.nativeElement.height = smallest;

    }

    drawBackground() {
        this.canvasCtx.drawImage(this.imageTest, 0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    }

    drawPlayerTrajectory(arrayOfPoints: any[]) {

        this.canvasCtx.lineWidth = 0.5;
        this.canvasCtx.strokeStyle = 'red';

        this.canvasCtx.beginPath();
        for (let i = 0; i < arrayOfPoints.length; i++) {
            const x = arrayOfPoints[i][0];
            const y = arrayOfPoints[i][1];
            this.canvasCtx.lineTo(x, y);
        }
        this.canvasCtx.stroke();

    }

    clearCanvas() {
        this.canvasCtx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    }

}
