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
        return await response.json();

    }

    async getGame(gameID: string) {

        const endpoint = `${environment.backendURL}/api/rounds/${gameID}`;
        const response = await fetch(endpoint);
        return response.json();

    }


    async getTrajectories(gameID: string, mapName: string, roundNumber: number) {

        const endpoint = `${environment.backendURL}api/footsteps/${gameID}/${mapName}/${roundNumber}`;
        return this.http.get<any>(endpoint);

    }

}
