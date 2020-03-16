import { Injectable } from '@angular/core';
import { Slider } from '../model/slider.model';
import { APIService } from './api.service';
import { Game } from '../model/game.model';
import { EventsService } from './events.service';
import { DataHandler } from '../utils/data-handler.utils';
import { Map } from '../model/map.model';
import { Round } from '../model/round.model';

@Injectable({
    providedIn: 'root'
})

export class StateService {

    private slider: Slider;

    private loadedGame: Game = null;
    private selectedMap: Map = null;
    private selectedRound: Round = null;

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

    getLoadedGame(): Game {
        return this.loadedGame;
    }

    getLoadedMap(): Map {
        return this.selectedMap;
    }

    getAllMaps(): Map[] {
        return this.loadedGame.getAllMaps();
    }

    async getAllGamesIDs() {

        const gameIDS = await this.apiService.getAllGamesDescription();
        return gameIDS;
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

    async loadNewGame(game: any) {
        
        // requesting game data
        const gameData = await this.apiService.getGame(game.id);
        
        // creating new game data structure
        const newGame: Game = new Game(game.id, [])
        newGame.attachMaps(gameData);
        
        // saving reference
        this.loadedGame = newGame;

        // saving first map and first round 
        this.selectedMap = newGame.getFirstMap();
        this.selectedRound = this.selectedMap.getFirstRound();

        // firing game loaded event
        this.eventsService.globalEvents.gameLoaded.emit();

        return;

    }
}
