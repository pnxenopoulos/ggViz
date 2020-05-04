import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
import { EventsService } from 'src/app/services/events.service';
import { SpecialEvents } from './special-events-chart';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.scss']
})
export class SpecialEventsComponent implements OnInit {

  @ViewChild('specialEventsContainerRef', {static: true}) specialEventsContainerRef: ElementRef;

  public specialEventsChart = null;

  constructor(public stateService: StateService, public eventsService: EventsService) { }

  ngOnInit() {
    this.subscribeToEvents(); 
  }

  public subscribeToEvents(){
    this.eventsService.globalEvents.roundLoaded.subscribe(() => {
      const kills = this.stateService.getSelectedRound().kills;
      this.specialEventsChart = new SpecialEvents(this.specialEventsContainerRef, kills, this.stateService.getTickIDs())
    });
  }

}
