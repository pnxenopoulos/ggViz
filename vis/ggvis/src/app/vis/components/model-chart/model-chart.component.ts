import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { EventsService } from 'src/app/services/events.service';
import { ModelChart } from './model-chart';


@Component({
  selector: 'app-model-chart',
  templateUrl: './model-chart.component.html',
  styleUrls: ['./model-chart.component.scss']
})
export class ModelChartComponent implements OnInit {

  @ViewChild('winProbChartContainer', {static: true}) winProbChartDivRef: ElementRef;

  public winProbChart: ModelChart = null;

  constructor(public stateService: StateService, public eventService: EventsService) { }

  ngOnInit() {
    this.subscribeToEvents();
  }


  subscribeToEvents(){

    this.eventService.globalEvents.roundLoaded.subscribe( () => {
      this.winProbChart = new ModelChart(this.winProbChartDivRef, this.stateService.getSelectedRound().winProbabilityData);
    });

    this.eventService.slider.valueChanged.subscribe( () => {
      this.winProbChart.updateMovingAxes(this.stateService.getSlider().getCurrentTimeSet());
    });

  }

}
