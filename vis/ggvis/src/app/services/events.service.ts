import { Injectable, EventEmitter, Inject } from '@angular/core';
import { Slider } from '../model/slider.model';


@Injectable({
    providedIn: 'root'
})

export class EventsService {

    public slider = {
        valueChanged: new EventEmitter<Slider>()
    };

    public apiEvents = {
        roundLoaded: new EventEmitter<any>()
    };


}
