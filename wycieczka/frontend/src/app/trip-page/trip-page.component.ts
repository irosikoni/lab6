import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Trip } from '../app.trip';
import { TripDataService } from '../trip-data.service';
import { AuthenticateService } from '../authenticate.service';

type Rating = {
  rate: number;
  nick: string;
  title: string;
  opinion: string;
  date: string;
};

@Component({
  selector: 'app-trip-page',
  templateUrl: './trip-page.component.html',
  styleUrls: ['./trip-page.component.css'],
})
export class TripPageComponent implements OnInit {
  trip?: Trip;
  reserved: number = 0;

  ratingList: Rating[] = [];
  nick = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[A-Za-z0-9]+$/),
  ]);
  title = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[A-Za-z!\s]+$/),
  ]);
  opinion = new FormControl('', [
    Validators.required,
    Validators.minLength(50),
    Validators.maxLength(500),
  ]);
  date = new FormControl('');
  constructor(
    private route: ActivatedRoute,
    private tripService: TripDataService,
    private authService: AuthenticateService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) =>
      this.tripService
        .getTrip(params['id'], this.authService.accessToken)
        .subscribe((trip) => (this.trip = trip))
    );
  }

  postRating(event: SubmitEvent) {
    event.preventDefault();
    if (!this.trip) {
      return;
    }
    if (
      this.nick.value === null ||
      this.title.value === null ||
      this.opinion.value === null ||
      this.date.value === null
    ) {
      return;
    }
    if (this.nick.invalid || this.title.invalid || this.opinion.invalid) {
      return;
    }
    let newPost: Rating = {
      rate: this.trip.rating,
      nick: this.nick.value,
      title: this.title.value,
      opinion: this.opinion.value,
      date: this.date.value,
    };
    this.ratingList.push(newPost);
  }

  addToCart() {
    if (!this.trip) {
      return;
    }
    this.tripService.addTripToCart(this.trip);
  }

  reserve(event: MouseEvent) {
    event.stopPropagation();
    if (!this.trip) {
      return;
    }
    if (this.reserved < this.trip.limit - this.trip.taken) {
      this.reserved++;
      this.tripService.addTripToCart(this.trip);
    }
  }
  cancel(event: MouseEvent) {
    if (!this.trip) {
      return;
    }
    if (this.reserved > 0) {
      this.reserved--;
      this.tripService.cancelTripFromCart(this.trip);
    }
  }
}
