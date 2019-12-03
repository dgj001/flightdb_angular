import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { FlightService } from './services/flight.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchParamService } from './services/search-param.service';
import { MaterialModule } from './material.module';
import { FlightDetailComponent } from './flight-detail/flight-detail.component';
import { SearchComponent } from './search/search.component';
import { SearchInputsComponent } from './search-inputs/search-inputs.component';
import { AppRoutingModule } from './app-routing.module';
import { DeparturesService } from './services/departures.service';
import { ArrivalsService } from './services/arrivals.service';
import { TailNumberService } from './services/tail-number.service';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightListComponent,
    FlightDetailComponent,
    SearchComponent,
    SearchInputsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDhIRRvHLhD66D7flOtvfPXqaIcZW_w4Iw'
    })
  ],
  providers: [FlightService, SearchParamService, DeparturesService, ArrivalsService, TailNumberService],
  bootstrap: [AppComponent]
})
export class AppModule { }
