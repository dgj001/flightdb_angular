import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Flight } from '../shared/flight';
import { SearchResult } from '../shared/search-result';
import { Observable, BehaviorSubject, Subscription, Subject } from 'rxjs';
import { SearchParamService } from './search-param.service';

@Injectable()
export class FlightService {    
    private searchParams: HttpParams = new HttpParams();
    private flights = [];
    private loaded = 0;
    private total = 0;
    private pageSize: number = 10;
    private pageNumber: number = 0;
    private flightsSubject = new BehaviorSubject<any>(this.flights);
    private loadedSubject = new BehaviorSubject<any>(this.loaded);
    private totalSubject = new BehaviorSubject<any>(this.total);

    private search_url = "//localhost:8081/api/flights/search";

    constructor(private http: HttpClient,
                private searchParamService: SearchParamService) {
        let alreadyFetched = false;
        this.searchParamService.getSearchParams()
            .subscribe(response => {                
                this.searchParams = response;
                this.fetchFlights();
                alreadyFetched = true;
            });

        if (alreadyFetched == false) {
            this.fetchFlights();
        }
    }

    fetchFlight(id: number) {
        let url = this.search_url + "/" + id;
        return this.http.get<Flight>(url);            
    }

    fetchFlights() {
        this.fetchPage(0, false);
    }

    fetchMoreFlights() {
        if ((this.pageNumber + 1 * this.pageSize) < this.total) {
            this.fetchPage(this.pageNumber + 1, true);
        }        
    }

    private fetchPage(page: number, append: boolean) {
        this.pageNumber = page;
        let params = this.searchParams;
        params = this.appendPageParams(params);        
        return this.http.get<SearchResult>(this.search_url, {params})
            .subscribe(response => {
                this.total = response.count;
                if (append) {
                    this.flights = this.flights.concat(response.flights);
                } else {
                    this.flights = response.flights;
                }
                this.loaded = Math.min(this.total, this.pageSize * (this.pageNumber + 1));

                this.flightsSubject.next(this.flights);
                this.loadedSubject.next(this.loaded);
                this.totalSubject.next(this.total);
            });
    }

    getPage() {
        return this.pageNumber;
    }

    getPages() {
        let numPages = this.total / this.pageSize;
        let pages = [];
        for (var i = 0; i < numPages; i++) { // probably is a non-for loop way to do this
            pages.push(i);
          }
        return pages;
    }

    getFlights(): Observable<any> {
        return this.flightsSubject.asObservable();
    }

    getLoaded(): Observable<any> {
        return this.loadedSubject.asObservable();
    }

    getTotal(): Observable<any> {
        return this.totalSubject.asObservable();
    }

    private appendPageParams(params: HttpParams) : HttpParams {
        params = params.set("page", this.pageNumber.toString());
        params = params.set("size", this.pageSize.toString());
        return params;
    }
}