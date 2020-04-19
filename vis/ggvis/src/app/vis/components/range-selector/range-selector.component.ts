import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { EventsService } from 'src/app/services/events.service';
import { StateService } from 'src/app/services/state.service'


@Component({
  selector: 'app-range-selector',
  templateUrl: './range-selector.component.html',
  styleUrls: ['./range-selector.component.scss']
})
export class RangeSelectorComponent implements OnInit {

  public rangeSlider: any = null;

  @ViewChild('rangeSelectorContainerRef', {static: true}) rangeSelectorContainerRef: ElementRef;

  public divWidth: number = null;
  public divHeight: number = null;

  public brushSVG = null;
  public brushGroup = null;

  // scale to get correct timestep
  public xScale = null;

  constructor(public eventsService: EventsService, public stateService: StateService) { }

  ngOnInit() {
    this.subscribeToEvents();
  }

  subscribeToEvents(){
    
    this.eventsService.globalEvents.roundLoaded.subscribe( () => {
      this.createBrush();
    });
  }

  createBrush(){
    this.appendSVG();
    this.appengGroup();
    this.appendBrushArea();
    this.createScale(this.stateService.getSlider().getRange())
  }

  appendBrushArea(){

    // getting div dimensions
    this.divWidth = this.rangeSelectorContainerRef.nativeElement.offsetWidth;
    this.divHeight = this.rangeSelectorContainerRef.nativeElement.offsetHeight;

    const brush = d3.brushX();
    this.brushGroup.call(brush.extent( [[0,0], [this.divWidth, this.divHeight]]).on('end', () => this.rangeSelected() )   );
  }
 

  createScale(sliderRange: number []){

    this.xScale = d3.scaleLinear()
            .domain([0, this.divWidth])
            .range(sliderRange);
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


  rangeSelected(){

    const selection = d3.event.selection;
    const annotationRange: number[] =  [  this.xScale(selection[0]), this.xScale(selection[1]) ]
    this.stateService.setAnnotationRange(annotationRange);
    
  }

}
