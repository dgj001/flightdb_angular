import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchParamService } from '../services/search-param.service';
import { TailNumberService } from '../services/tail-number.service';
import { Condition } from '../shared/condition';
import { DeparturesService } from '../services/departures.service';
import { ArrivalsService } from '../services/arrivals.service';

@Component({
  selector: 'app-search-inputs',
  templateUrl: './search-inputs.component.html',
  styleUrls: ['./search-inputs.component.css']
})
export class SearchInputsComponent implements OnInit, OnDestroy {
  departureConditions = [];
  arrivalConditions = [];
  tailConditions = [];
  isFirstResponse = true; // what is this doing?

  departureSub: Subscription;
  arrivalSub: Subscription;
  tailNumberSub: Subscription;
  searchParamsSub: Subscription;

  constructor(
    private searchParamService: SearchParamService,
    private departureService: DeparturesService,
    private arrivalService: ArrivalsService,
    private tailNumberService: TailNumberService) { }

  ngOnInit() {
    this.departureSub = this.departureService.getDepartureConditions()
      .subscribe(response => {
        this.departureConditions = response;
      });

    this.arrivalSub = this.arrivalService.getArrivalConditions()
      .subscribe(respone => {
        this.arrivalConditions = respone;
      });

    this.tailNumberSub = this.tailNumberService.getTailNumberConditions()
      .subscribe(response => {
        this.tailConditions = response;
      });

    this.searchParamsSub = this.searchParamService.getSearchParams()
      .subscribe(response => {
        if (response !== undefined && this.isFirstResponse) {

        }
        this.isFirstResponse = false;
    });
  }

  ngOnDestroy() {
    this.departureSub.unsubscribe();
    this.arrivalSub.unsubscribe();
    this.tailNumberSub.unsubscribe();
    this.searchParamsSub.unsubscribe();
  }

  onDepartureClick(event: any, condition: Condition) {
    const target = (<HTMLInputElement>event.target);
    if (target.checked) {
      this.searchParamService.addCondition('departureAirport', condition.fieldName);
    } else {
      this.searchParamService.removeCondition('departureAirport', condition.fieldName);
    }
  }

  onArrivalClick(event: any, condition: Condition) {
    const target = (<HTMLInputElement>event.target);
    if (target.checked) {
      this.searchParamService.addCondition('arrivalAirport', condition.fieldName);
    } else {
      this.searchParamService.removeCondition('arrivalAirport', condition.fieldName);
    }
  }

  onTailNumberClick(event: any, condition: Condition) {
    const target = (<HTMLInputElement>event.target);
    if (target.checked) {
      this.searchParamService.addCondition('tailNumber', condition.fieldName);
    } else {
      this.searchParamService.removeCondition('tailNumber', condition.fieldName);
    }
  }
}
