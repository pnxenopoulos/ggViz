import { ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { Kill } from 'src/app/model/kill.model';


export class SpecialEvents {

    // SVG element
    public chartSVG: any = null;

    // Defining Margins
    private margin = {top: 50, right: 50, bottom: 50, left: 50};

    // scales
    private xScale = null;
    private yScale = null;

    private chartGroup: any = null;

    constructor(public divRef: ElementRef, public kills: Kill[], public ticks: number[]){

        this.createChart();



    }

    

    createChart(){

        this.appendSVG();
        this.appendGroup();
        this.createScales();
        this.updateChart();


    }

    updateChart(){

        this.chartGroup.selectAll('.kill-node')
            .data(this.kills)
            .enter()
            .append('circle')
            .attr("class", "kill-node")
            .attr("r", 6)
            .attr("cx", d => this.xScale(d.timestamp))
            .attr("cy", this.yScale(0.5))
            .attr('fill', d => {
                return d.attackerTeam.localeCompare('CT') === 0 ? 'blue' : 'red';
            })
    }

    createScales(){

        this.xScale = d3.scaleLinear()
            .domain([0, this.ticks.length])
            .range([0, this.divRef.nativeElement.offsetWidth - this.margin.left - this.margin.right]);

        this.yScale = d3.scaleLinear()
            .domain([1,0])
            .range([0, this.divRef.nativeElement.offsetHeight - this.margin.top - this.margin.bottom]);

    }

    appendSVG(){

        // getting div dimensions
        const divWidth = this.divRef.nativeElement.offsetWidth;
        const divHeight = this.divRef.nativeElement.offsetHeight;

        // appending SVG tag to div
        this.chartSVG = d3.select(this.divRef.nativeElement)
            .append('svg')
            .attr('width', divWidth)
            .attr('height', divHeight);

    }


    appendGroup(){

        this.chartGroup = this.chartSVG.append('g')
        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    }

}