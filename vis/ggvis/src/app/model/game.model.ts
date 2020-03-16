import { Map } from './map.model';

export class Game {

    constructor(
        public id: string,
        public maps: Map[]) {}


    public attachMaps( rawMapData: any ){

        Object.keys(rawMapData).forEach( mapName => {
            const map = new Map(mapName, []);
            map.attachRounds(rawMapData[mapName]);
            this.maps.push(map);
        })
    }

    public getAllMaps(){
        return this.maps;
    }


    public getFirstMap(){
        return this.maps[0];
    }

}
