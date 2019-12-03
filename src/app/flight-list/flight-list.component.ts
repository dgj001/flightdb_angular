import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlightService } from '../services/flight.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { Flight } from '../shared/flight';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit, OnDestroy {

  flightsSub: Subscription;
  routeSubs: Subscription;

  @Input()
  showAll: boolean;

  displayedColumns = [ 'departure', 'arrival', 'depDate', 'depTime', 'tailNumber' ];
  dataSource = new MatTableDataSource<Flight>();

  constructor(private flightService: FlightService,
              private routerService: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    if (this.showAll) {
      this.flightsSub = this.flightService.getFlights().subscribe(
        (flights: Flight[]) => {
          this.dataSource.data = flights;
        }
      );
    } else {
      this.routeSubs = this.route.params.subscribe(
        (params: Params) => {
          const id = +params.id;
          this.flightsSub = this.flightService.fetchFlightWithoutRecords(id).subscribe((withoutData: Flight) => {
            this.dataSource.data = [ withoutData ];
        });
      });
    }
  }

  ngOnDestroy() {
    this.flightsSub.unsubscribe();
  }

  onFlightClick(flight: Flight) {
    this.routerService.navigate(['details', flight.id]);
  }
}
