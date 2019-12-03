import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { SearchParamService } from '../services/search-param.service';
import { DeparturesService } from '../services/departures.service';
import { ArrivalsService } from '../services/arrivals.service';
import { TailNumberService } from '../services/tail-number.service';
import { Condition } from '../shared/condition';

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
    private tailNumberService: TailNumberService
  ) { }

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

  onDepartureClick(checked: boolean, condition: Condition) {
    if (checked) {
      this.searchParamService.addCondition('departureAirport', condition.fieldValue);
      condition.value = true;
    } else {
      this.searchParamService.removeCondition('departureAirport', condition.fieldValue);
      condition.value = false;
    }
  }

  onArrivalClick(checked: boolean, condition: Condition) {
    if (checked) {
      this.searchParamService.addCondition('arrivalAirport', condition.fieldValue);
      condition.value = true;
    } else {
      this.searchParamService.removeCondition('arrivalAirport', condition.fieldValue);
      condition.value = false;
    }
  }

  onTailNumberClick(checked: boolean, condition: Condition) {
    if (checked) {
      this.searchParamService.addCondition('tailNumber', condition.fieldValue);
      condition.value = true;
    } else {
      this.searchParamService.removeCondition('tailNumber', condition.fieldValue);
      condition.value = false;
    }
  }
}
