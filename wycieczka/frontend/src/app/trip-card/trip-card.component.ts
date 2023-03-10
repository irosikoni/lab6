import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Trip } from '../app.trip';
import { TripDataService } from '../trip-data.service';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css'],
})
export class TripCardComponent implements OnInit {
  @Input() trip!: Trip;
  @Input() highestPrice?: number;
  @Input() lowestPrice?: number;
  @Input()
  counter!: number;
  @Output() countUpdatePlus = new EventEmitter<number>();
  reserved: number = 0;
  rate?: (rate: number) => void;
  removeCard?: (event: MouseEvent) => void;
  constructor(private service: TripDataService) {
    this.removeCard = (event) => {
      event.stopPropagation();
      this.service.removeTrip(this.trip.id);
    };
  }

  ngOnInit(): void {
    this.rate = (rate: number) => this.service.rate(this.trip.id, rate);
  }

  reserve(event: MouseEvent) {
    event.stopPropagation();
    if (!this.trip) {
      return;
    }
    if (this.reserved < this.trip.limit - this.trip.taken) {
      this.reserved++;
      this.service.addTripToCart(this.trip);
    }
  }
  cancel(event: MouseEvent) {
    event.stopPropagation();
    if (!this.trip) {
      return;
    }
    if (this.reserved > 0) {
      this.reserved--;
      this.service.cancelTripFromCart(this.trip);
    }
  }
}
