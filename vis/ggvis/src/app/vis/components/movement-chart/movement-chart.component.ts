import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MovementChart } from './movement-chart';
import { StateService } from 'src/app/services/state.service';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-movement-chart',
  templateUrl: './movement-chart.component.html',
  styleUrls: ['./movement-chart.component.scss']
})
export class MovementChartComponent implements OnInit {

  @ViewChild('movementChartDivRef', {static: true}) movementChartDivRef: ElementRef;

  public movementChart: MovementChart = null;

  @Input('teamSide') teamSide: string;

  constructor(public stateService: StateService, public eventsService: EventsService) { }

  ngOnInit() {
    this.subscribeToEvents();
  }

  subscribeToEvents(){
    
    this.eventsService.globalEvents.roundLoaded.subscribe( () => {
      this.movementChart = this.teamSide == 'CT' ? new MovementChart(this.movementChartDivRef, this.stateService.getSelectedRound().movementDataCT ) : new MovementChart(this.movementChartDivRef, this.stateService.getSelectedRound().movementDataT );
    });

    this.eventsService.slider.valueChanged.subscribe( () => {
      this.movementChart.updateMovingAxis(this.stateService.getSlider().getCurrentTimeSet());
    });

  } 

}
