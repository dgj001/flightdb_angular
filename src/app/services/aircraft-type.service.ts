import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Condition } from '../shared/condition';

@Injectable()
export class AircraftTypeService {
    private aircraft_url = "//localhost:8081/api/flights/aircraft_types";
    private aircraftConditions = Array<Condition>();
    private aircraftConditionSubject = new BehaviorSubject(this.aircraftConditions);

    constructor(private http: HttpClient) {
        this.http.get<any>(this.aircraft_url)
            .subscribe(response => {
                this.aircraftConditions = [];
                response.forEach((item: string) => {
                    this.aircraftConditions.push({ fieldName: item, value: false});
                });
                this.aircraftConditionSubject.next(this.aircraftConditions);
            });
    }

    getAircraftConditions() {
        return this.aircraftConditionSubject.asObservable();
    }
}