import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FlightService } from '../services/flight.service';
import { Flight } from '../shared/flight';
import { FlightDataResult } from '../shared/flight-data-result';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.css']
})
export class FlightDetailComponent implements OnInit, OnDestroy {
  flight: Flight;
  flightDataResult: FlightDataResult;

  routeSubs: Subscription;
  flightSubs: Subscription;

  mapCenterLat: number;
  mapCenterLng: number;
  departureLat: number;
  departureLon: number;
  arrivalLat: number;
  arrivalLon: number;

  constructor(
    private flightService: FlightService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routeSubs = this.route.params.subscribe(
      (params: Params) => {
        const id = +params.id;

        this.flightService.fetchFlightWithoutRecords(id).subscribe((withoutData: Flight) => {
          this.flight = withoutData;
          this.flightService.fetchFlightWithRecords(id).subscribe((result: FlightDataResult) => {
            this.flightDataResult = result;
            this.computeMapCoords();
          });
        });
      }
    );
  }

  ngOnDestroy() {
    this.routeSubs.unsubscribe();
    if (this.flightSubs) {
      this.flightSubs.unsubscribe();
    }
  }

  computeMapCoords() {
    const fdr = this.flightDataResult;
    this.mapCenterLat = fdr.minLat + ((fdr.maxLat - fdr.minLat) / 2);
    this.mapCenterLng = fdr.minLng + ((fdr.maxLng - fdr.minLng) / 2);
    this.departureLat = fdr.records[0].latitude;
    this.departureLon = fdr.records[0].longitude;
    this.arrivalLat = fdr.records[fdr.numRecords - 1].latitude;
    this.arrivalLon = fdr.records[fdr.numRecords - 1].longitude;
  }

}
