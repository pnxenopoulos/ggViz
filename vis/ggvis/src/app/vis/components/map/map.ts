import { ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { Slider } from 'src/app/model/slider.model';

export class Map {

    private divRef: ElementRef;
    private canvasRef: ElementRef;
    private canvasCtx: CanvasRenderingContext2D;

    // mock placeholder
    public datapoints: any[] = [];

    constructor(divRef: ElementRef, canvasRef: ElementRef) {

        this. divRef = divRef;
        this.canvasRef = canvasRef;
        this.canvasCtx = canvasRef.nativeElement.getContext('2d');
        this.resizeCanvas();
        this.randomDataPoints();
        

    }

    resizeCanvas() {

        this.canvasRef.nativeElement.width = this.divRef.nativeElement.offsetWidth;
        this.canvasRef.nativeElement.height = this.divRef.nativeElement.offsetHeight;

    }


    drawPlayerTrajectory(playerNumber: number, arrayOfPoints: any[]) {

        this.canvasCtx.lineWidth = 0.5;
        this.canvasCtx.strokeStyle = 'red';

        if(playerNumber % 2 === 0){
            this.canvasCtx.strokeStyle = 'red';
        } else {
            this.canvasCtx.strokeStyle = 'blue';
        }

        this.canvasCtx.beginPath();
        for (let i = 0; i < arrayOfPoints.length; i++) {
            const x = arrayOfPoints[i][playerNumber].x;
            const y = arrayOfPoints[i][playerNumber].y;
            this.canvasCtx.lineTo(x, y);
        }
        this.canvasCtx.stroke();

    }

    clearCanvas() {
        this.canvasCtx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
    }

    updateTrajectory(second: number) {

        this.clearCanvas();
        // this.addBackgroundImage();
        for (let player = 0; player < 10; player++) {
            this.drawPlayerTrajectory(player, this.datapoints.slice(player, second));
        }
    }

    addBackgroundImage() {

        const swedishflagbg = new Image();
        swedishflagbg.src = '../../../../assets/images/dust_map.png';
        swedishflagbg.onload = () => {
            this.canvasCtx.drawImage(swedishflagbg, 0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
        }
    }

    // mock data generator
    randomDataPoints() {

        for (let i = 0; i < 1000; i++) {
            const currentObj = {};
            for (let player = 0; player < 10; player++) {

                if (Math.random() < 0.2 && i !== 0) {
                    const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
                    currentObj[player] = {
                        x: this.datapoints[ (i - 1) ][player].x + Math.random() * 15 * plusOrMinus,
                        y: this.datapoints[ (i - 1) ][player].y + Math.random() * 15 * plusOrMinus
                    };
                } else if (i === 0) {
                    currentObj[player] = {
                        x: Math.random() * this.divRef.nativeElement.offsetWidth ,
                        y: Math.random() * this.divRef.nativeElement.offsetHeight
                    };
                } else {
                    currentObj[player] = {
                        x: this.datapoints[ (i - 1) ][player].x,
                        y: this.datapoints[ (i - 1) ][player].y
                    };

                }
            }
            this.datapoints.push(currentObj);
        }

    }





}
