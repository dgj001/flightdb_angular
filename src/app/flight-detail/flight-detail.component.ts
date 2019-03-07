import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Flight } from '../shared/flight';
import { Chart } from 'chart.js';
import { FlightService } from '../services/flight.service';
import { ActivatedRoute, Params } from '@angular/router';

interface ResampleResult {
  data: Array<any>;
  labels: Array<any>;
}

@Component({
  selector: 'app-flight-detail',
  templateUrl: './flight-detail.component.html',
  styleUrls: ['./flight-detail.component.css']
})
export class FlightDetailComponent implements OnInit {
  @ViewChild('canvas') canvasRef: ElementRef;
  latitude = 36.128;
  longitude = -86.679;
  latA = 51.678418;
  lngA = 7.809007;
  latB = 51.689418;
  lngB = 7.900007;

  flight: Flight;
  id: number;

  chart = undefined;

  constructor(private flightService: FlightService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.flightService.fetchFlight(this.id).subscribe(
          (flight: Flight) => {
            this.flight = flight;
            this.loadChart();
          }
        );
      }
    );
  }

  loadChart() {
    if (this.flight === undefined || this.flight === null) {
      return;
    }

    const myData = this.resample(this.flight, 250);

    const context = this.canvasRef.nativeElement;
    this.chart = new Chart(context, {
      type: 'line',
      data: {
        labels: myData.labels,
        datasets: [
          {
            data: myData.data,
            borderColor: '#ffcc00',
            fill: false
          },
        ]
      },
      options: {
        elements: {
          point:{
              radius: 0
          }
        },
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true,
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10
            }
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

  resample(flight: Flight, afterSize: number): ResampleResult {
    // Loading a several thousand point graph takes several seconds.
    // It seems to come from computing labels via Date.toClocaleTimeString.
    // This downsamples to the specified number of samples * 3.
    // It attempts to mainain local minima and maxima, but may not work.
    const data = [];
    const labels = [];

    let sampleEvery = 1;
    if (afterSize !== 0) {
      sampleEvery = Math.max(1, Math.round(flight.records.length / afterSize));
    }

    const startDate = new Date(flight.startDateTime);
    let date = new Date();

    for (let i = 0; i < flight.records.length; i += sampleEvery) {
      // Push data point at start of interval
      data.push(flight.records[i].altitude);
      date = new Date(startDate);
      date.setUTCSeconds(date.getUTCSeconds() + i);
      labels.push(date.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }));

      // Determine min and max in interval, and indexes of those values
      let minAlt = 100000;
      let maxAlt = -100000;
      let minIdx = 0;
      let maxIdx = 0;
      const sampleEnd = Math.min(i + sampleEvery, flight.records.length);
      for (let j = i; j < sampleEnd; j++) {
        if (flight.records[j].altitude < minAlt) {
          minIdx = j;
          minAlt = flight.records[j].altitude;
        }
        if (flight.records[j].altitude > maxAlt) {
          maxIdx = j;
          maxAlt = flight.records[j].altitude;
        }
      }

      if (minIdx < maxIdx) {
        // Add min, then max
        data.push(minAlt);
        date = new Date(startDate);
        date.setUTCSeconds(date.getUTCSeconds() + minIdx);
        labels.push(date.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }));

        data.push(maxAlt);
        date = new Date(startDate);
        date.setUTCSeconds(date.getUTCSeconds() + maxIdx);
        labels.push(date.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }));
      } else {
        // Add max then min
        data.push(maxAlt);
        date = new Date(startDate);
        date.setUTCSeconds(date.getUTCSeconds() + maxIdx);
        labels.push(date.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }));

        data.push(minAlt);
        date = new Date(startDate);
        date.setUTCSeconds(date.getUTCSeconds() + minIdx);
        labels.push(date.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }));
      }
    }

    return { data, labels};
  }
}
