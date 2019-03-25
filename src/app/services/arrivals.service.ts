import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Condition } from '../shared/condition';
import { environment } from 'src/environments/environment';

@Injectable()
export class ArrivalsService {
    private url = `${environment.baseUrl}/groupings/arrival_airports`;
    private conditions = Array<Condition>();
    private conditionSubject = new BehaviorSubject(this.conditions);

    constructor(private http: HttpClient) {
        let params: HttpParams = new HttpParams();
        params = params.append('page', '0');
        params = params.append('size', '5');
        params = params.append('sort', 'count,desc');
        this.http.get<any>(this.url, {params})
            .subscribe(response => {
                this.conditions = [];
                response.forEach((item: Condition) => {
                    this.conditions.push({
                        fieldName: item.fieldName,
                        fieldValue: item.fieldValue,
                        count: item.count,
                        value: false
                    });
                });
                this.conditionSubject.next(this.conditions);
            });
    }

    getArrivalConditions() {
        return this.conditionSubject.asObservable();
    }
}
