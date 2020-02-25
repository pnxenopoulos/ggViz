import { ElementRef } from '@angular/core';
import * as d3 from 'd3';

export class Map {

    private divRef: ElementRef;
    private svg: any;

    // mock placeholder
    public datapoints: number[][] = [];

    constructor(divRef: ElementRef) {

        this. divRef = divRef;
        this.createSVG();
        this.updateChart();
    }


    createSVG() {

        const divWidth = this.divRef.nativeElement.offsetWidth;
        const divHeight = this.divRef.nativeElement.offsetHeight;

        // creating and appending svg
        this.svg = d3.select('#map-container').append('svg').attr('width', divWidth).attr('height', divHeight);


    }



    updateChart() {

        const t = d3.select('svg').transition().duration(750);
        this.randomDataPoints();

        // this.svg
        //     .selectAll('.circle-point')
        //     .data(data)
        //     .exit()
        //     .remove();


        this.svg.selectAll('.circle-point')
            .data(this.datapoints, d => d)
            .join(
                enter => enter.append('circle')
                    .attr('class', 'circle-point')
                    .attr('fill', 'green')
                    .attr('cx', (d) => d[0])
                    .attr('cy', (d) => d[1])
                    .attr('r',  3.0),
                update => update
                    .call(exit => exit.transition(t)
                    .attr('cy', d => 10)),
                exit => exit
                    .call(exit => exit.transition(t)
                    .attr('cy', (d) => d[1]).remove()
                )
            );

    }



    // mock data generator
    randomDataPoints() {

        for (let i = 0; i < 10; i++) {

            this.datapoints[i] = ( [
                (Math.random() * this.divRef.nativeElement.offsetWidth),
                (Math.random() * this.divRef.nativeElement.offsetHeight)
            ] );


        }

    }





}
