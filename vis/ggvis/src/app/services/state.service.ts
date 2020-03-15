import { Injectable } from '@angular/core';
import { Slider } from '../model/slider.model';
import { APIService } from './api.service';
import { Game } from '../model/game.model';
import { observable } from 'rxjs';
import { EventsService } from './events.service';
import { DataHandler } from '../utils/data-handler.utils';

@Injectable({
    providedIn: 'root'
})

export class StateService {

    private slider: Slider;

    private game: Game;
    private map: any;
    private round: any;

    // formatted trajectories
    private trajectories: any;
    private players: any;

    constructor(public apiService: APIService, public eventsService: EventsService) {}


    getPlayerTrajectory(playerID: string, timeSlice: number) {

        return this.trajectories[playerID].slice(0, timeSlice);

    }

    getAllPlayerIDs() {
        return this.players;
    }

    getAllGamesIDs() {

        return this.apiService.getAllGames();
    }

    loadTrajectories(gameID: string, mapName: string, roundNumber: number) {

        this.apiService.getTrajectories(gameID, mapName, roundNumber).then( obs => {
            obs.subscribe( data => {
                this.trajectories = DataHandler.formatTrajectories(data, 'test');
                this.players = Object.keys(this.trajectories);
                this.eventsService.apiEvents.roundLoaded.emit();
            });
        });

    }

    loadNewGame(gameID: string) {

        this.game = new Game(gameID);
        this.apiService.getGame(this.game.gameID).then( obs => {
            obs.subscribe( data => {
                console.log(data);
            });
        });

    }
}
