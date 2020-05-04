import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class APIService {


    constructor(public http: HttpClient) {}

    async getAllGamesDescription() {
        const response = await fetch(`${environment.backendURL}/api/games/all`);
        return response.json();
    }

    async getGame(gameID: string) {
        const endpoint = `${environment.backendURL}/api/rounds/${gameID}`;
        const response = await fetch(endpoint);
        return response.json();
    }

    async getKills(gameID: string, mapName: string, roundNumber: number){

        const endpoint = `${environment.backendURL}/api/kills/${gameID}/${mapName}/${roundNumber}`;
        const kills = await fetch(endpoint);
        return kills.json();

    }


    async getAnnotations(gameID: string, mapName: string, roundNumber: number){

        const url = `${environment.backendURL}/api/annotation/${gameID}/${mapName}/${roundNumber}`;
        const annotations = await fetch(url);

        return annotations.json();

    }

    async saveAnnotation(params: any, gameID: string, mapName: string, roundNumber: number){

        const url = `${environment.backendURL}/api/annotation/${gameID}/${mapName}/${roundNumber}`;
        console.log(url);

        // post header
        const headers = {
            'Content-Type': 'application/json',
        };

        // Return a new promise.
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(params),
        });

        return await response.json();

    }


    async getTrajectories(gameID: string, mapName: string, roundNumber: number) {

        const endpoint = `${environment.backendURL}/api/footsteps/${gameID}/${mapName}/${roundNumber}`;
        const trajectories = await fetch(endpoint);
        return  trajectories.json();
    }


    async getWinProbabilitiesAndDistances(gameID: string, mapName: string, roundNumber: number){

        const endpoint = `${environment.backendURL}/api/win_prob/${gameID}/${mapName}/${roundNumber}`;
        const winprobabilities = await fetch(endpoint);
        return winprobabilities.json(); 

    }

    async getSimilarRounds(annotationID: number){
        const endpoint = `${environment.backendURL}/api/annotation/${annotationID}/similar`;
        const similarRounds = await fetch(endpoint);
        return similarRounds.json();
    }

}
