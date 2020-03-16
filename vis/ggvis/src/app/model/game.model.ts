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

    public getAllMaps(): Map[]{
        return this.maps;
    }


    public getFirstMap(): Map{
        return this.maps[0];
    }

    public getMap(mapName: string): Map{
        return this.maps.filter( map => { map.name === mapName })[0];
    }

}
