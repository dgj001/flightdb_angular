import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Condition } from '../shared/condition';

@Injectable()
export class SearchParamService {    
    private conditions = Array<Condition>();

    private params: HttpParams = new HttpParams();
    private searchParamsSubject = new BehaviorSubject(this.params);

    constructor() {
    }

    getSearchParams(): Observable<any> {
        return this.searchParamsSubject.asObservable();
    }

    addCondition(field: string, value: Object) {
        for (let i = 0; i < this.conditions.length; i++) {
            let item = this.conditions[i];
            if (item.fieldName === field && item.value === value) {
                return;
            }
        }

        this.conditions.push({ fieldName: field, value: value});
        this.computeParams();
    }

    removeCondition(field: string, value: Object) {        
        for (let i = 0; i < this.conditions.length; i++) {
            let item = this.conditions[i];
            if (item.fieldName === field && item.value === value) {
                this.conditions.splice(i, 1);
                this.computeParams();
                return;
            }
        }
    }
    
    private computeParams() {
        this.params = new HttpParams();
        this.conditions.forEach((item: Condition) => {
            this.params = this.params.append(item.fieldName, item.value.toString());
        });
        this.searchParamsSubject.next(this.params);
    }
}