import { Component, OnInit, OnDestroy } from '@angular/core';
import { Flight } from '../shared/flight';
import { FlightService } from '../services/flight.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit, OnDestroy {
  flights = [];  
  flightsSub: Subscription;
  loaded: number;
  loadedSubs: Subscription;
  total: number;
  totalSubs: Subscription;
  
  constructor(private flightService: FlightService,
              private routerService: Router) { 
  }

  ngOnInit() {
    this.flightsSub = this.flightService.getFlights().subscribe(
      flights => this.flights = flights 
    );        

    this.loadedSubs = this.flightService.getLoaded().subscribe(
      count => this.loaded = count
    );

    this.totalSubs = this.flightService.getTotal().subscribe(
      count => this.total = count
    );
  }

  ngOnDestroy() {
    this.flightsSub.unsubscribe();
    this.loadedSubs.unsubscribe();
    this.totalSubs.unsubscribe();
  }

  onFlightClick(flight: Flight) {    
    this.routerService.navigate(['details', flight.id]);
  }

  onMoreClick() {
    this.flightService.fetchMoreFlights();
  }
}
