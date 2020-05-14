import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-similar-plays',
  templateUrl: './similar-plays.component.html',
  styleUrls: ['./similar-plays.component.scss']
})
export class SimilarPlaysComponent implements OnInit {

  public similarPlays: any [] = [];

  constructor(public eventsService: EventsService, public stateService: StateService) { }

  ngOnInit() {

    this.subscribeToEvents();

  }

  subscribeToEvents(){
    this.eventsService.globalEvents.similarMatches.subscribe(() => {
      this.similarPlays = Object.values(this.stateService.getSimilarRounds());
    })
  }


  goToGame( similarPlay: any ){
    similarPlay['id'] = similarPlay['GameID'];

    this.stateService.loadNewGame(similarPlay).then( gameData => {
      this.stateService.selectRound(parseInt(similarPlay['RoundNum']) - 1);
    });
  }

}
