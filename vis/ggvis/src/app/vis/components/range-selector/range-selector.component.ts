import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-range-selector',
  templateUrl: './range-selector.component.html',
  styleUrls: ['./range-selector.component.scss']
})
export class RangeSelectorComponent implements OnInit {

  public rangeSlider: any = null;

  constructor() { }

  ngOnInit() {


    const brush = d3.brushX();

    const group = d3.select('.range-selector-svg')
      .append('g')
      .attr("class", "brush")
      .call( brush.extent( [ [0,0], [400,400] ] ) );


  //   var sliderRange = d3
  //   .sliderBottom()
  //   .min(d3.min(data))
  //   .max(d3.max(data))
  //   .width(300)
  //   .tickFormat(d3.format('.2%'))
  //   .ticks(5)
  //   .default([0.015, 0.02])
  //   .fill('#2196f3')
  //   .on('onchange', val => {
  //     d3.select('p#value-range').text(val.map(d3.format('.2%')).join('-'));
  //   });

  // var gRange = d3
  //   .select('div#slider-range')
  //   .append('svg')
  //   .attr('width', 500)
  //   .attr('height', 100)
  //   .append('g')
  //   .attr('transform', 'translate(30,30)');

  // gRange.call(sliderRange);

  // d3.select('p#value-range').text(
  //   sliderRange
  //     .value()
  //     .map(d3.format('.2%'))
  //     .join('-')
  // );


  }


  brushTest(){
    console.log('brushing');
  }

}
