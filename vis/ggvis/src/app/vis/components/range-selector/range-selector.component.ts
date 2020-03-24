import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-range-selector',
  templateUrl: './range-selector.component.html',
  styleUrls: ['./range-selector.component.scss']
})
export class RangeSelectorComponent implements OnInit {

  public rangeSlider: any = null;

  @ViewChild('rangeSelectorContainerRef', {static: true}) rangeSelectorContainerRef: ElementRef;

  public brushSVG = null;

  public brushGroup = null;

  constructor() { }

  ngOnInit() {

    this.appendSVG();
    this.appengGroup();
    this.appendBrushArea();

  }

  appendBrushArea(){

    // getting div dimensions
    const divWidth = this.rangeSelectorContainerRef.nativeElement.offsetWidth;
    const divHeight = this.rangeSelectorContainerRef.nativeElement.offsetHeight;

    const brush = d3.brushX();
    this.brushGroup.call(brush.extent( [[0,0], [divWidth, divHeight]]));
  }


  appendSVG(){

    // getting div dimensions
    const divWidth = this.rangeSelectorContainerRef.nativeElement.offsetWidth;
    const divHeight = this.rangeSelectorContainerRef.nativeElement.offsetHeight;

    this.brushSVG = d3.select(this.rangeSelectorContainerRef.nativeElement)
      .append('svg')
      .attr('width', divWidth)
      .attr('height', divHeight);

  }


  appengGroup(){

    this.brushGroup  = this.brushSVG.append('g');

  }


  brushTest(){
    console.log('brushing');
  }

}
