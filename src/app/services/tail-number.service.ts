import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Condition } from '../shared/condition';

@Injectable()
export class TailNumberService {
    private tail_url = "//localhost:8081/api/flights/tail_numbers";
    private tailConditions = Array<Condition>();
    private tailNumberSubject = new BehaviorSubject(this.tailConditions);

    constructor(private http: HttpClient) {
        this.http.get<any>(this.tail_url)
            .subscribe(response => {
                this.tailConditions = [];
                response.forEach((item: string) => {                    
                    this.tailConditions.push({ fieldName: item, value: false});
                });
                this.tailNumberSubject.next(this.tailConditions);
            });
    }

    getTailNumberConditions(): Observable<any> {
        return this.tailNumberSubject.asObservable();
    }
}