import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../../services/dialogs.service';
import { EventsService } from 'src/app/services/events.service';
import { StateService } from 'src/app/services/state.service';
import { Map } from 'src/app/model/map.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  public mapsLoaded: Map[] = [];

  constructor(public dialogService: DialogService, 
              public eventsService: EventsService, 
              public stateService: StateService) { }

  ngOnInit() {
    this.subscribeToEvents();
  }

  subscribeToEvents() {
    this.eventsService.globalEvents.gameLoaded.subscribe( () => {
      this.mapsLoaded = this.stateService.getAllMaps();
    });
  }

  openMatchSearch() {
    this.dialogService.openMatchSearch();
  }

  isGameLoaded(){
    return this.mapsLoaded.length === 0
  }

}
