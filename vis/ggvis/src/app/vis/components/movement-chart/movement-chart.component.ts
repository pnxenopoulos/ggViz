import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  constructor(public stateService: StateService, public eventsService: EventsService) { }

  ngOnInit() {
    this.subscribeToEvents();
  }

  subscribeToEvents(){
    this.eventsService.globalEvents.roundLoaded.subscribe( () => {
      console.log('round loaded');
      this.movementChart = new MovementChart(this.movementChartDivRef, this.stateService.getSelectedRound().movementData );
    });
  } 

}
