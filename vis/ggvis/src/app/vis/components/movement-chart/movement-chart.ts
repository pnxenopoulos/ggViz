import { ElementRef } from '@angular/core';
import * as d3 from 'd3';

export class MovementChart {

    // chart margin definition
    public margin = {top: 50, right: 50, bottom: 50, left: 50};

    // chart svg reference
    public svgRef = null;

    // chart group reference
    public groupRef = null;

    // scales reference
    public xScale = null;
    public yScale = null;

    // line generator
    public line = null;

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

    }

    createLineGenerator(){

        this.line = d3.line()
            .x( d => { return this.xScale(d['index']) })
            .y( d => { return this.yScale(d['value']) })
            .curve(d3.curveMonotoneX);
    }

    createScales(){

        this.xScale = d3.scaleLinear()
            .domain([0,this.movementChartData.length])
            .range([0, this.divRef.nativeElement.offsetWidth - this.margin.left - this.margin.right]);

        this.yScale = d3.scaleLinear()
            .domain([0, 10])
            .range([0, this.divRef.nativeElement.offsetHeight - this.margin.top - this.margin.bottom])

    }

    updateMap() {

    //     const lines = svg.selectAll("lines")
    // .data(slices)
    // .enter()
    // .append("g");
   
    // lines.append("path")
    // .attr("d", function(d) { return line(d.values); });

        // const lines = this.groupRef.selectAll('lines')
        //     .data()

        this.groupRef
            .datum(this.movementChartData)  
            .append('path')
            .attr('class', 'line')
            .attr('stroke', 'red')
            .attr('fill', 'none')
            .attr('d', this.line);

        // this.groupRef.selectAll(".dot")    
        //     .data(this.movementChartData)
        //     .enter()
        //     .append('circle')
        //     .attr('class', 'dot')
        //     .attr("cx", (d, i) => { return this.xScale(i) })
        //     .attr("cy", (d, i) => { return this.yScale(d) })
        //     .attr("r", 1);
    }


}

