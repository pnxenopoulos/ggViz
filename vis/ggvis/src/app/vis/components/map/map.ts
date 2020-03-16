import { ElementRef } from '@angular/core';
import { Map } from 'src/app/model/map.model';

export class MapView {

    private canvasCtx: CanvasRenderingContext2D;

    private mapImage: any = null;

    constructor(public divRef: ElementRef, 
                public canvasRef: ElementRef, 
                public loadedMap: Map) {

        this.canvasCtx = canvasRef.nativeElement.getContext('2d');
        this.resizeCanvas();
        this.loadMapImage();

    }

    loadMapImage() {
        
        this.mapImage = new Image();
        this.mapImage.src = `../../../../assets/images/${this.loadedMap.name}.png`;
        this.mapImage.onload = () => { this.drawBackground(); }

    }

    resizeCanvas() {

        const divWidth = this.divRef.nativeElement.offsetWidth;
        const divHeight = this.divRef.nativeElement.offsetHeight;

        const smallest = (divWidth > divHeight) ? divHeight : divWidth;

        this.canvasRef.nativeElement.width = smallest;
        this.canvasRef.nativeElement.height = smallest;

    }

    drawBackground() {
        this.canvasCtx.drawImage(this.mapImage, 0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
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
