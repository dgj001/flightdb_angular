import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Condition } from '../shared/condition';

@Injectable()
export class DeparturesService {
    private url = '//localhost:8081/api/flights/departures';
    private conditions = Array<Condition>();
    private conditionSubject = new BehaviorSubject(this.conditions);

    constructor(private http: HttpClient) {
        this.http.get<any>(this.url)
            .subscribe(response => {
                this.conditions = [];
                response.forEach((item: string) => {
                    this.conditions.push({ fieldName: item, value: false});
                });
                this.conditionSubject.next(this.conditions);
            });
    }

    getDepartureConditions() {
        return this.conditionSubject.asObservable();
    }
}
