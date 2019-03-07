import { FlightData } from './flight-data';

export class Flight {
    // matches structure on server
    id: number;
    tailNumber: string;
    aircraftType: string;
    startDateTime: Date;
    departureAirport: string;
    arrivalAirport: string;
    records: Array<FlightData>;

    // client
    selected: boolean;

    getDisplayDate() {
        return "foo";
    }
}
