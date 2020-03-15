import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Slider } from 'src/app/model/slider.model';
import { Map } from './map';
import { StateService } from 'src/app/services/state.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  // map that holds all d3 interactions
  private map: Map = null;

  // reference HTML elements
  @ViewChild('mapContainerRef', {static: true}) mapContainer: ElementRef;
  @ViewChild('mapCanvasRef', {static: true}) mapCanvasRef: ElementRef;

  constructor(public events: EventsService, public stateService: StateService) { }

  ngOnInit() {
    this.subscribeToEvents();
    this.createMap();
  }


  subscribeToEvents() {

    this.events.slider.valueChanged.subscribe((slider) => {
      this.updateMap(slider);
    });

    this.events.apiEvents.roundLoaded.subscribe(() => {
      // console.log('round loaded');
    });


  }


  createMap() {
    this.map = new Map(this.mapContainer, this.mapCanvasRef);
  }


  updateMap(slider: Slider) {
    this.map.clearCanvas();
    const players = this.stateService.getAllPlayerIDs();
    this.map.drawBackground();
    _.forEach(players, player => {
      const playerTrajectory = this.stateService.getPlayerTrajectory( player, slider.getCurrentTimeSet());
      this.map.drawPlayerTrajectory(playerTrajectory);
    });
  }

}
