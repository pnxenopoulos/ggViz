import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Slider } from 'src/app/model/slider.model';
import { MatSliderChange } from '@angular/material';

@Component({
  selector: 'app-time-slider',
  templateUrl: './time-slider.component.html',
  styleUrls: ['./time-slider.component.scss']
})
export class TimeSliderComponent implements OnInit {

  public slider: Slider;

  constructor(public events: EventsService) {
    this.slider = new Slider([0, 10000]);
  }

  ngOnInit() {}


  slide(event: MatSliderChange) {

    this.slider.setCurrentTimeSet(event.value);
    this.events.slider.valueChanged.emit(this.slider);
  }

}
