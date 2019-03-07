import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightListComponent } from './flight-list/flight-list.component';
import { SearchComponent } from './search/search.component';
import { FlightService } from './services/flight.service';
import { FlightDetailComponent } from './flight-detail/flight-detail.component';
import { HeaderComponent } from './header/header.component';
import { SearchInputsComponent } from './search-inputs/search-inputs.component';
import { SearchParamService } from './services/search-param.service';
import { AircraftTypeService } from './services/aircraft-type.service';
import { TailNumberService } from './services/tail-number.service';
import { DeparturesService } from './services/departures.service';
import { ArrivalsService } from './services/arrivals.service';

@NgModule({
  declarations: [
    AppComponent,
    FlightListComponent,
    SearchComponent,
    FlightDetailComponent,
    HeaderComponent,
    SearchInputsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDhIRRvHLhD66D7flOtvfPXqaIcZW_w4Iw'
    })
  ],
  providers: [
    FlightService,
    SearchParamService,
    AircraftTypeService,
    TailNumberService,
    DeparturesService,
    ArrivalsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
