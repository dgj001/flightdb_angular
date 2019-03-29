import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Condition } from '../shared/condition';
import { environment } from 'src/environments/environment';

@Injectable()
export class TailNumberService {
    private tail_url = `${environment.baseUrl}/groupings/tail_numbers`;
    private tailConditions = Array<Condition>();
    private tailNumberSubject = new BehaviorSubject(this.tailConditions);

    constructor(private http: HttpClient) {
        console.log('tail_url: ' + this.tail_url);
        let params: HttpParams = new HttpParams();
        params = params.append('page', '0');
        params = params.append('size', '5');
        params = params.append('sort', 'count,desc');
        this.http.get<any>(this.tail_url, {params})
            .subscribe(response => {
                this.tailConditions = [];
                response.forEach((item: Condition) => {
                    this.tailConditions.push({
                        fieldName: item.fieldName,
                        fieldValue: item.fieldValue,
                        count: item.count,
                        value: false
                    });
                });
                this.tailNumberSubject.next(this.tailConditions);
            });
    }

    getTailNumberConditions(): Observable<any> {
        return this.tailNumberSubject.asObservable();
    }
}