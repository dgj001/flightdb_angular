import { FlightData } from './flight-data';

export interface FlightDataResult {
    minLat: number;
    maxLat: number;
    minLng: number;
    maxLng: number;
    numRecords: number;
    records: FlightData[];
}