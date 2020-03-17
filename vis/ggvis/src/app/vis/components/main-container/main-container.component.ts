import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { MatDialog } from '@angular/material';
// import { MatchSearchComponent } from '../dialogs/match-search/match-search.component';
import { FormControl } from '@angular/forms';
import { EventsService } from 'src/app/services/events.service';
import { Game } from 'src/app/model/game.model';
import { StateService } from 'src/app/services/state.service';
import { Map } from 'src/app/model/map.model';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.scss']
})
export class MainContainerComponent implements OnInit {

  mode = new FormControl('over');

  public loadedGame: Game = null;
  public loadedMap: Map = null;

  public roundLoading: boolean = false;

  constructor(public eventsService: EventsService,
              public stateService: StateService) { }

  ngOnInit() {
    this.subscribeToEvents();
  }


  // avoid null reference on the view
  getVISRounds(){
    if(this.loadedMap){
      return this.loadedMap.getAllRounds();
    }
    return [];
  }

  subscribeToEvents() {
    this.eventsService.globalEvents.gameLoaded.subscribe( () => {
      this.loadedGame = this.stateService.getLoadedGame();
      this.loadedMap = this.stateService.getLoadedMap();
    });
  }

  onTabChange(event) {
    this.roundLoading = true;
    this.stateService.selectRound(event.index).then( () => {
      this.roundLoading = false;
    });
  }

}
