import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class APIService {


    constructor(public http: HttpClient) {}

    async getAllGames() {

        return this.http.get<any>('http://vidagpu.poly.edu:5000/api/games/all');

    }

    async getGame(gameID: string) {

        const endpoint = `${environment.backendURL}api/rounds/${gameID}`;
        return this.http.get<any>(endpoint);

    }


    async getTrajectories(gameID: string, mapName: string, roundNumber: number) {

        const endpoint = `${environment.backendURL}api/footsteps/${gameID}/${mapName}/${roundNumber}`;
        return this.http.get<any>(endpoint);

    }

}
