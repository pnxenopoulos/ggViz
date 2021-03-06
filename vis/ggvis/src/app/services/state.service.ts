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
import { Annotation } from '../model/annotation.model';
import { async } from '@angular/core/testing';

@Injectable({
    providedIn: 'root'
})

export class StateService {

    private slider: Slider;
    
    // selected range to annotate
    private annotationRange: {global: number[], local: number[]} = null;

    private loadedGame: Game = null;
    private selectedMap: Map = null;
    private selectedRound: Round = null;

    // players in round
    private players: { [id: string] : Player } = {};

    private tickIDs: number[] = [];

    private similarRounds: any[] = [];

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

    getSelectedRound(): Round {
        return this.selectedRound;
    }

    getProbAtTimestep(timestep: number){

        return this.selectedRound.getWinProbAtTimestep(timestep);

    }

    getTickIDs(){
        /// Return a copy so other components won't mess up
        return this.tickIDs.slice(0, this.tickIDs.length);
    }

    async selectRound(roundNumber: number ) {

        this.selectedRound = this.selectedMap.getRound(roundNumber);
        const trajectoriesLoadObj: any = await this.loadTrajectories(this.loadedGame.id, this.selectedMap.name, this.selectedRound.roundNumber);

        this.tickIDs = trajectoriesLoadObj['trajectoryTicks'];
        const nTimeSteps = trajectoriesLoadObj['nTimesteps'];

        // win probability Data
        let winProbabilitiesAndDistances = await this.apiService.getWinProbabilitiesAndDistances(this.loadedGame.id, this.selectedMap.name, this.selectedRound.roundNumber);
        winProbabilitiesAndDistances = DataHandler.formatWinProbabilityAndMovement(winProbabilitiesAndDistances, this.tickIDs);
        this.selectedRound.attachWinProbabilityData(winProbabilitiesAndDistances.winProbability);

        // kills data
        let kills = await this.apiService.getKills(this.loadedGame.id, this.selectedMap.name, this.selectedRound.roundNumber);
        this.selectedRound.attachKills(DataHandler.formatKills(this.tickIDs, kills));

        // annotations data
        let annotations = await this.apiService.getAnnotations(this.loadedGame.id, this.selectedMap.name, this.selectedRound.roundNumber);
        this.selectedRound.attachAnnotations(DataHandler.formatIncomingAnnotations(annotations));

        // movement chart Data
        // const movementChartData = await this.apiService.getMovementChartData(nTimeSteps);
        this.selectedRound.attachMovementData(winProbabilitiesAndDistances.movementCT, 'CT');
        this.selectedRound.attachMovementData(winProbabilitiesAndDistances.movementT, 'T');

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

    setAnnotationRange(annotationRange: number[]){

        const ticksRange = [ this.tickIDs[ Math.floor(annotationRange[0])],  this.tickIDs[ Math.floor(annotationRange[1])]]
        this.annotationRange = {global: ticksRange, local: annotationRange};
        return ticksRange;

    }

    getAnnotationRange(){
        return this.annotationRange;
    }

    getSimilarRounds(){
        return this.similarRounds;
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
        const trajectoryTicks = Object.keys(trajectories).map( element => parseInt(element) );

        const nTimesteps: number = Object.keys(trajectories).length;
        this.players = DataHandler.formatTrajectories(trajectories);
        
        return {'nTimesteps': nTimesteps, 'trajectoryTicks': trajectoryTicks};

    }

    async loadSimilarMatches(annotationID: number){

        const similarRounds = await this.apiService.getSimilarRounds(annotationID);
        this.similarRounds = similarRounds;
        this.eventsService.globalEvents.similarMatches.emit();
        
    }

    async saveAnnotation(annotation: Annotation){

        const params = DataHandler.formatAnnotationRequestParam(annotation, this.loadedGame.id, this.selectedMap.name, this.selectedRound.roundNumber);
        const response = await this.apiService.saveAnnotation(params, this.loadedGame.id, this.selectedMap.name, this.selectedRound.roundNumber);
        console.log(response['AnnotationID'])
        return response['AnnotationID'];

    }
}
