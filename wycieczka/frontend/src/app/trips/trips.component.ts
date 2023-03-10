import { Component, OnInit, Input } from '@angular/core';
import { TripDataService } from '../trip-data.service';
import { Trip } from '../app.trip';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
})
export class TripsComponent implements OnInit {
  tripList: Trip[] = [];
  @Input('trip') trip?: Trip;
  maxTripPrice: number | undefined;
  minTripPrice: number | undefined;
  getTripList?: () => Trip[];

  constructor(private service: TripDataService) {
    this.refreshTripList();
    service.saveReRender(this.refreshTripList.bind(this));
  }

  refreshTripList() {
    console.log('refreshing trip list');
    this.service.getTripList().subscribe((data) => {
      this.tripList = this.service.getTripListFiltered(data);
      this.updateMaxMinTrips();
      this.tripList = this.tripList.map((trip) => ({
        ...trip,
        taken: this.service.getTakenSeats(trip),
      }));
    });
  }

  updateMaxMinTrips() {
    if (this.tripList.length === 0) {
      return;
    }
    const sortedTripList = this.tripList.sort(
      (a, b) => a.unitPrice - b.unitPrice
    );
    this.maxTripPrice = sortedTripList[sortedTripList.length - 1].unitPrice;
    this.minTripPrice = sortedTripList[0].unitPrice;
  }

  ngOnInit(): void {
    this.refreshTripList();
  }
}
