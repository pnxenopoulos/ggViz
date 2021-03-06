import { ElementRef } from '@angular/core';
import { Map } from 'src/app/model/map.model';
import { Position } from 'src/app/model/position.model';
import * as _ from 'lodash';
import * as d3 from 'd3';

export class MapView {

    private originalCoordinateSystem: { x: number, y:  number } = { x: 1024, y: 1024};

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

    drawPlayerTrajectory(trajectorySlice: Position[], playerSide: string) {

        const colorScaleCT = d3.scaleSequential(d3.interpolateBlues).domain([0, trajectorySlice.length])
        const colorScaleT =  d3.scaleSequential(d3.interpolateReds).domain([0, trajectorySlice.length])

        const viewportWidth: number = this.canvasRef.nativeElement.getBoundingClientRect().width;
        const viewportHeight: number = this.canvasRef.nativeElement.getBoundingClientRect().height;

        this.canvasCtx.lineWidth = 2.0;

        
        const grdFrenchFlag = this.canvasCtx.createLinearGradient(0, 0, 300, 0);
        grdFrenchFlag.addColorStop(0, "blue");
        grdFrenchFlag.addColorStop(0.5, "white");
        grdFrenchFlag.addColorStop(1, "red");

        this.canvasCtx.fillStyle = grdFrenchFlag;
        // this.canvasCtx.strokeStyle = playerSide == 'CT' ? 'blue' : 'red';

        let colorIndex = 0;

        this.canvasCtx.beginPath();

        _.forEach( trajectorySlice, position =>{


            if(colorIndex != 0){
                const x0 = trajectorySlice[colorIndex - 1].getNormalizedX(viewportWidth, this.originalCoordinateSystem.x);
                const y0 = trajectorySlice[colorIndex - 1].getNormalizedY(viewportHeight, this.originalCoordinateSystem.y) * -1;
                this.canvasCtx.moveTo(x0, y0)
            }

            
            const x = position.getNormalizedX(viewportWidth, this.originalCoordinateSystem.x);
            const y = position.getNormalizedY(viewportHeight, this.originalCoordinateSystem.y) * -1;
            
            this.canvasCtx.lineTo(x, y);    
           
            this.canvasCtx.strokeStyle =  playerSide == 'CT' ?  colorScaleCT(colorIndex) : colorScaleT(colorIndex) ;
            

            colorIndex++;

            
        });

        this.canvasCtx.stroke();
        
    }

    clearCanvas() {
        this.canvasCtx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    }

}
