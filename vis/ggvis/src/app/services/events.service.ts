import { Injectable, EventEmitter, Inject } from '@angular/core';
import { Slider } from '../model/slider.model';


@Injectable({
    providedIn: 'root'
})

export class EventsService {

    public slider = {
        valueChanged: new EventEmitter<Slider>()
    };

    public globalEvents = {
        roundLoaded: new EventEmitter<any>(),
        gameLoaded: new EventEmitter<any>()
    }


}
