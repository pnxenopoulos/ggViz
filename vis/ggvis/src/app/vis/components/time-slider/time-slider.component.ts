import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Slider } from 'src/app/model/slider.model';
import { MatSliderChange } from '@angular/material';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-time-slider',
  templateUrl: './time-slider.component.html',
  styleUrls: ['./time-slider.component.scss']
})
export class TimeSliderComponent implements OnInit {

  public slider: Slider = null;

  constructor(public eventsService: EventsService, public stateService: StateService) {}

  ngOnInit() {
    this.eventsService.globalEvents.gameLoaded.subscribe( () => {
      this.slider = this.stateService.getSlider();
    })
  }

  slide(event: MatSliderChange) {

    this.stateService.setCurrentTimeStep(event.value);
    // this.slider.setCurrentTimeSet(event.value);
    // this.events.slider.valueChanged.emit(this.slider);
  }

}
