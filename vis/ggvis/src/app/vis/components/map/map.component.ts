import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { Slider } from 'src/app/model/slider.model';
import { Map } from './map';

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

  constructor(public events: EventsService) { }

  ngOnInit() {
    this.subscribeToEvents();
    this.createMap();
  }


  subscribeToEvents() {

    this.events.slider.valueChanged.subscribe((slider) => {
      this.updateMap(slider);
    });


  }


  createMap() {
    // console.log(this.mapCanvasRef.nativeElement.getContext('2d'));
    this.map = new Map(this.mapContainer, this.mapCanvasRef);

  }


  updateMap(slider: Slider) {
    this.map.updateTrajectory(slider.getCurrentTimeSet());
  }

}
