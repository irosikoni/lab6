import { Component, OnInit } from '@angular/core';
import { TripDataService } from '../trip-data.service';

@Component({
  selector: 'app-trip-history',
  templateUrl: './trip-history.component.html',
  styleUrls: ['./trip-history.component.css'],
})
export class TripHistoryComponent implements OnInit {
  history = this.service.getBoughtTrips();
  constructor(private service: TripDataService) {
    console.log(this.history);
  }

  ngOnInit(): void {}
}
