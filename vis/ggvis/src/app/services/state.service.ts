import { Injectable } from '@angular/core';
import { Slider } from '../model/slider.model';
import { APIService } from './api.service';
import { Game } from '../model/game.model';
import { EventsService } from './events.service';
import { DataHandler } from '../utils/data-handler.utils';
import { Map } from '../model/map.model';
import { Round } from '../model/round.model';
import { Player } from '../model/player.model';
import { Position } from '../model/position.model';

@Injectable({
    providedIn: 'root'
})

export class StateService {

    private slider: Slider;

    private loadedGame: Game = null;
    private selectedMap: Map = null;
    private selectedRound: Round = null;

    // players in round
    private players: { [id: string] : Player } = {};

    constructor(public apiService: APIService, public eventsService: EventsService) {}


    getSlider(): Slider {
        return this.slider;
    }

    getAllMaps(): Map[] {
        return this.loadedGame.getAllMaps();
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

    setCurrentTimeStep(timeStep: number){
        this.slider.setCurrentTimeSet(timeStep);
        this.eventsService.slider.valueChanged.emit();
    }

    getPlayerTrajectory(playerName: string, timeSlice: number) : Position[] {
        return this.players[playerName].trajectory.getTrajectorySlice(0, timeSlice);
    }

    getPlayer(playerName: string){
        return this.players[playerName];
    }

    getPlayersName(): string[] {
        return Object.keys(this.players);
    }

    getSelectedRound(): Round{
        return this.selectedRound;
    }

    async selectRound(roundNumber: number, ) {

        this.selectedRound = this.selectedMap.getRound(roundNumber);
        const nTimeSteps: number = await this.loadTrajectories(this.loadedGame.id, this.selectedMap.name, this.selectedRound.roundNumber);
        
        // movement chart Data
        const movementChartData = await this.apiService.getMovementChartData(nTimeSteps);
        this.selectedRound.attachMovementData(movementChartData);

        // win probability Data
        // TODO: Request to win probability data

        this.createSlider(nTimeSteps);

        this.eventsService.globalEvents.roundLoaded.emit();
        
        return;

    }

    createSlider(nTimeSteps: number){
        this.slider = new Slider(nTimeSteps);
    }

    selectMap(mapName?: string): void {
        this.selectedMap = mapName ? this.loadedGame.getMap(mapName) : this.loadedGame.getFirstMap();
    }

    async getAllGamesIDs() {
        const gameIDS = await this.apiService.getAllGamesDescription();
        return gameIDS;
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
        this.selectMap();
        // await this.selectRound(0, true);

        // firing game loaded event
        this.eventsService.globalEvents.gameLoaded.emit();

        return;

    }

    async loadTrajectories(gameID: string, mapName: string, roundNumber: number) {

        const trajectories = await this.apiService.getTrajectories(gameID, mapName, roundNumber);
        const nTimesteps: number = Object.keys(trajectories).length;
        this.players = DataHandler.formatTrajectories(trajectories);

        return nTimesteps;

    }
}
