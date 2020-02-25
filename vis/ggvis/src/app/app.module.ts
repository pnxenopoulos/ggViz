import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material';
import { MainContainerComponent } from './vis/components/main-container/main-container.component';
import { NavbarComponent } from './vis/components/navbar/navbar.component';
import { TimeSliderComponent } from './vis/components/time-slider/time-slider.component';
import { MapComponent } from './vis/components/map/map.component';
import { ModelChartComponent } from './vis/components/model-chart/model-chart.component';
import { MovementChartComponent } from './vis/components/movement-chart/movement-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    MainContainerComponent,
    NavbarComponent,
    TimeSliderComponent,
    MapComponent,
    ModelChartComponent,
    MovementChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }