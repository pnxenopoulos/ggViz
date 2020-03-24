import { ElementRef } from '@angular/core';
import * as d3 from 'd3';

export class ModelChart {

    // SVG Element
    public chartSVG: any = null;

    // Chart group
    public chartGroup: any = null;
    public movingAxisGroup: any = null;

    // Defining Margins
    private margin = {top: 50, right: 50, bottom: 50, left: 50};

    // scales
    public xScale = null;
    public yScale = null;
    public movingScale = null;

    public ctLine = null;
    public tLine = null;

    public movingAxis = null;

    constructor(public divRef: ElementRef, public modelChartData: any[]) {

        this.appendSVG();
        this.appendGroup();
        this.createScales();
        this.attachAxes();
        this.createLineGenerators();
        this.updateChart();

    }


    appendSVG() {

        // getting div dimensions
        const divWidth = this.divRef.nativeElement.offsetWidth;
        const divHeight = this.divRef.nativeElement.offsetHeight;

        // appending SVG tag to div
        this.chartSVG = d3.select(this.divRef.nativeElement)
            .append('svg')
            .attr('width', divWidth)
            .attr('height', divHeight);

    }

    createLineGenerators(){

        this.ctLine = d3.line()
            .x( d => { return this.xScale( d['timestamp']) })
            .y( d => { return this.yScale( d['CTWinProb']) })
            .curve(d3.curveMonotoneX);

        this.tLine = d3.line()
            .x( d => { return this.xScale( d['timestamp']) })
            .y( d => { return this.yScale( d['TWinProb']) })
            .curve(d3.curveMonotoneX);
        

    }


    attachAxes(){

        this.chartSVG.append('g')
            .attr('class', 'y-axis')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
            .call(d3.axisLeft(this.yScale));

        this.chartSVG.append('g')
            .attr('class', 'x-axis')
            .attr('transform', 'translate(' + this.margin.left + ',' + (this.divRef.nativeElement.offsetHeight - this.margin.bottom) + ')'  )
            .call(d3.axisBottom(this.xScale));

        this.movingAxisGroup = this.chartSVG.append('g')
                                .attr('class', 'moving-axis')
                                .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
                                .call( d3.axisLeft(this.yScale).tickSize(0).tickValues([]));

    }


    appendGroup() {

         // appending group to SVG            
        this.chartGroup = this.chartSVG.append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
            

    }

    createScales(){

        this.xScale = d3.scaleLinear()
            .domain([0, this.modelChartData.length])
            .range([0, this.divRef.nativeElement.offsetWidth - this.margin.left - this.margin.right]);

        this.yScale = d3.scaleLinear()
            .domain([0,1])
            .range([0, this.divRef.nativeElement.offsetHeight - this.margin.top - this.margin.bottom]);

        this.movingScale = d3.scaleLinear()
            .domain([0,1])
            .range([0, this.divRef.nativeElement.offsetHeight - this.margin.top - this.margin.bottom]);

    }

    updateMovingAxes(timestamp: number){

        this.movingAxisGroup.attr('transform', 'translate(' + (this.margin.left + this.xScale(timestamp)) + ',' + this.margin.top + ')'  );

    }

    updateChart(){

        this.chartGroup
            .datum(this.modelChartData)  
            .append('path')
            .attr('class', 'line')
            .attr('stroke', '#5d79ae')
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('d', this.ctLine);

        this.chartGroup
            .datum(this.modelChartData)  
            .append('path')
            .attr('class', 'line')
            .attr('stroke', '#de9b35')
            .attr('stroke-width', 2)
            .attr('fill', 'none')
            .attr('d', this.tLine);


    }

}
