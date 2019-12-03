import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlightService } from '../services/flight.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  loaded: number;
  loadedSubs: Subscription;

  total: number;
  totalSubs: Subscription;

  moreLabel: string;

  constructor(private flightService: FlightService) { }

  ngOnInit() {
    this.loadedSubs = this.flightService.getLoaded().subscribe(count =>  {
      this.loaded = count;
      this.updateMoreLabel();
    });

    this.totalSubs = this.flightService.getTotal().subscribe(count => {
      this.total = count;
      this.updateMoreLabel();
    });
  }

  updateMoreLabel() {
    this.moreLabel = this.loaded + ' of ' + this.total;
    if (this.loaded < this.total) {
      this.moreLabel += ' - More';
    }
  }

  ngOnDestroy() {
    this.loadedSubs.unsubscribe();
    this.totalSubs.unsubscribe();
  }

  onMoreClick() {
    this.flightService.fetchMoreFlights();
  }
}
