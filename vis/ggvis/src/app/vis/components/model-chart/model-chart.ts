import { ElementRef } from '@angular/core';
import * as d3 from 'd3';

export class ModelChart {

    // SVG Element
    public chartSVG: any = null;

    // Chart group
    public chartGroup: any = null;

    // Defining Margins
    private margin = {top: 30, right: 30, bottom: 30, left: 30};

    constructor(public divRef: ElementRef) {

        this.appendSVG();
        this.appendGroup();

    }


    appendSVG() {

        // getting div dimensions
        const divWidth = this.divRef.nativeElement.offsetWidth;
        const divHeight = this.divRef.nativeElement.offsetHeight;

        // appending SVG tag to div
        d3.select(this.divRef.nativeElement)
            .append('svg')
            .attr('width', (divWidth - this.margin.right - this.margin.left))
            .attr('height', (divHeight - this.margin.top - this.margin.bottom) );

    }


    appendGroup() {

         // appending group to SVG            
        this.chartGroup = this.chartSVG.append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    }

}
