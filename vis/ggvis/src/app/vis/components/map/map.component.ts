import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Slider } from 'src/app/model/slider.model';
import { StateService } from 'src/app/services/state.service';
import * as _ from 'lodash';
import { MapView } from './map';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  // map that holds all d3 interactions
  private map: MapView = null;

  // reference HTML elements
  @ViewChild('mapContainerRef', {static: true}) mapContainer: ElementRef;
  @ViewChild('mapCanvasRef', {static: true}) mapCanvasRef: ElementRef;

  constructor(public events: EventsService, public stateService: StateService) { }

  ngOnInit() {
    // subscribing to events
    this.subscribeToEvents();
    
    // create a map object
    this.createMap();
  }

  createMap() {
    this.map = new MapView(this.mapContainer, this.mapCanvasRef, this.stateService.getLoadedMap());
  }

  subscribeToEvents() {

    this.events.globalEvents.gameLoaded.subscribe( () => {
      this.createMap();
    });

    this.events.slider.valueChanged.subscribe((slider) => {
      this.updateMap(slider);
    });

    this.events.apiEvents.roundLoaded.subscribe(() => {
      // console.log('round loaded');
    });
  }

  updateMap(slider: Slider) {
    // this.map.clearCanvas();
    // const players = this.stateService.getAllPlayerIDs();
    // this.map.drawBackground();
    // _.forEach(players, player => {
    //   const playerTrajectory = this.stateService.getPlayerTrajectory( player, slider.getCurrentTimeSet());
    //   this.map.drawPlayerTrajectory(playerTrajectory);
    // });
  }

}
