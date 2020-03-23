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


    async getTrajectories(gameID: string, mapName: string, roundNumber: number) {

        const endpoint = `${environment.backendURL}/api/footsteps/${gameID}/${mapName}/${roundNumber}`;
        const trajectories = await fetch(endpoint);
        return  trajectories.json();
    }

    async getMovementChartData(nTicks: number) {

        const movementChart: any[] = [];
        let currentPoint: number = 0;
        let multiplier: number = 1;
        for(let i = 0; i < nTicks; i++){

            if(currentPoint > 9.8) {
                multiplier = -1.0;
            }else if(currentPoint < 0.2){
                multiplier = 1.0;
            }

            currentPoint += 0.1 * multiplier;
            movementChart.push({index: i, value: currentPoint});
        }
        
        return movementChart;

    }

    async getWinProbabilitiesAndDistances(gameID: string, mapName: string, roundNumber: number){

        const endpoint = `${environment.backendURL}/api/win_prob/${gameID}/${mapName}/${roundNumber}`;
        const winprobabilities = await fetch(endpoint);
        return winprobabilities.json(); 
    

    }

}
