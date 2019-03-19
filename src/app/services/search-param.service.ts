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

    addCondition(fieldName: string, fieldValue: string) {
        for (let i = 0; i < this.conditions.length; i++) {
            const item = this.conditions[i];
            if (item.fieldName === fieldName && item.fieldValue === fieldValue) {
                return;
            }
        }

        this.conditions.push({
            fieldName: fieldName,
            fieldValue: fieldValue,
            count: undefined,
            value: undefined
        });
        this.computeParams();
    }

    removeCondition(fieldName: string, fieldValue: string) {
        for (let i = 0; i < this.conditions.length; i++) {
            const item = this.conditions[i];
            if (item.fieldName === fieldName && item.fieldValue === fieldValue) {
                this.conditions.splice(i, 1);
                this.computeParams();
                return;
            }
        }
    }

    private computeParams() {
        this.params = new HttpParams();
        this.conditions.forEach((item: Condition) => {
            this.params = this.params.append(item.fieldName, item.fieldValue);
        });
        this.searchParamsSubject.next(this.params);
    }
}