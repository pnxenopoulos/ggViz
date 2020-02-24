import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-slider',
  templateUrl: './time-slider.component.html',
  styleUrls: ['./time-slider.component.scss']
})
export class TimeSliderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  slide() {
    console.log('sliding');
  }

}
