import { ElementRef } from '@angular/core';
import * as d3 from 'd3';

export class MovementChart {

    // chart margin definition
    public margin = {top: 50, right: 50, bottom: 50, left: 50};

    // chart svg reference
    public svgRef = null;

    // chart group reference
    public groupRef = null;

    // moving axis
    public movingAxisGroup = null;

    // scales reference
    public xScale = null;
    public yScale = null;

    // line generator
    public lineBombSiteA = null;
    public lineBombSiteB = null;

    constructor(public divRef: ElementRef, public movementChartData: any[]){
        this.appendSVG();
        this.appengGroup();
        this.createScales();
        this.attachAxes();
        this.createLineGenerator();
        this.updateMap();

    }

    appendSVG(){

        const divWidth = this.divRef.nativeElement.offsetWidth;
        const divHeight = this.divRef.nativeElement.offsetHeight;

        this.svgRef = d3.select(this.divRef.nativeElement).append('svg')
            .attr('width', divWidth)
            .attr('height', divHeight);
    }

    appengGroup(){

        this.groupRef = this.svgRef.append('g')
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")

    }

    attachAxes(){

        this.svgRef.append('g')
            .attr('class', 'y-axis')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
            .call(d3.axisLeft(this.yScale));

        this.svgRef.append('g')
            .attr('class', 'x-axis')
            .attr('transform', 'translate(' + this.margin.left + ',' + (this.divRef.nativeElement.offsetHeight - this.margin.bottom) + ')'  )
            .call(d3.axisBottom(this.xScale));

        this.movingAxisGroup = this.svgRef.append('g')
            .attr('class', 'moving-axis')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
            .call(d3.axisLeft(this.yScale).tickSize(0).tickValues([]));

        

    }

    createLineGenerator(){

        this.lineBombSiteA = d3.line()
            .x( d => { return this.xScale(d['timestamp']) })
            .y( d => { return this.yScale(d['distBombsiteA']) })
            .curve(d3.curveMonotoneX);

        this.lineBombSiteB = d3.line()
            .x( d => { return this.xScale(d['timestamp']) })
            .y( d => { return this.yScale(d['distBombsiteB']) })
            .curve(d3.curveMonotoneX);
    }

    createScales(){

        this.xScale = d3.scaleLinear()
            .domain([0,this.movementChartData.length])
            .range([0, this.divRef.nativeElement.offsetWidth - this.margin.left - this.margin.right]);


        const maxDistbombsiteA = d3.max(this.movementChartData, d => d.distBombsiteA);
        const maxDistbombsiteB = d3.max(this.movementChartData, d => d.distBombsiteB);
        const maxDist = Math.max(maxDistbombsiteA, maxDistbombsiteB);


        this.yScale = d3.scaleLinear()
            .domain([maxDist, 0])
            .range([0, this.divRef.nativeElement.offsetHeight - this.margin.top - this.margin.bottom])

    }

    updateMovingAxis(timestamp: number){

        this.movingAxisGroup.attr('transform', 'translate(' + (this.margin.left + this.xScale(timestamp)) + ',' + this.margin.top + ')'  );

    }

    updateMap() {

        this.groupRef
            .datum(this.movementChartData)  
            .append('path')
            .attr('class', 'line')
            .attr('stroke', 'red')
            .attr('fill', 'none')
            .attr('d', this.lineBombSiteA);

        this.groupRef
            .datum(this.movementChartData)  
            .append('path')
            .attr('class', 'line')
            .attr('stroke', 'blue')
            .attr('fill', 'none')
            .attr('d', this.lineBombSiteB);

    }


}

