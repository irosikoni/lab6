import { Injectable } from '@angular/core';
import tripList from '../assets/tripData/tripList.json';
import { Trip } from './app.trip';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CartItem } from './app.cart-item';
import { History, TripStatus } from './app.history';

const baseUrl = 'http://localhost:8000';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json; charset=UTF-8',
    Authorization: '',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TripDataService {
  reRender?: () => void;
  cartItems: CartItem[] = [];
  trips: Trip[] = tripList.trips;
  history: History[] = [];
  reservedByUser: number = 0;
  maxPriceFilter: (trip: Trip) => boolean = () => true;
  minPriceFilter: (trip: Trip) => boolean = () => true;
  maxDateFilter: (trip: Trip) => boolean = () => true;
  minDateFilter: (trip: Trip) => boolean = () => true;
  ratingFilter: (value: Trip) => boolean = () => true;
  constructor(private http: HttpClient) {
    this.trips = tripList.trips;
    console.log('TripDataService constructor called', this.trips);
    this.getTripList = this.getTripList.bind(this);
    this.addTrip = this.addTrip.bind(this);
    this.removeTrip = this.removeTrip.bind(this);
    this.rate = this.rate.bind(this);
    this.getPriceRange = this.getPriceRange.bind(this);
    this.updateMaxPrice = this.updateMaxPrice.bind(this);
    this.updateMinPrice = this.updateMinPrice.bind(this);
    this.saveReRender = this.saveReRender.bind(this);
    this.updateRatingFilter = this.updateRatingFilter.bind(this);
    this.updateMaxDate = this.updateMaxDate.bind(this);
    this.updateMinDate = this.updateMinDate.bind(this);
    this.getTripListFiltered = this.getTripListFiltered.bind(this);
  }
  saveReRender(reRender: () => void) {
    this.reRender = reRender;
  }

  getTrip(id: string, token: string): Observable<Trip | undefined> {
    httpOptions.headers = httpOptions.headers.set(
      'Authorization',
      'Bearer ' + token
    );
    return this.http.get<Trip>(`${baseUrl}/trips/${id}`, httpOptions);
  }

  getTripList(): Observable<Trip[]> {
    return this.http.get<Trip[]>(baseUrl + '/trips');
  }

  calculateStatus(trip: Trip): TripStatus {
    const now = new Date();
    const start = new Date(trip.start);
    const end = new Date(trip.end);
    if (now < start) return TripStatus.UPCOMING;
    if (now > end) return TripStatus.PAST;
    return TripStatus.ONGOING;
  }

  buyTrip({ trip, quantity }: CartItem) {
    this.history.push({
      trip,
      quantity,
      tripStatus: this.calculateStatus(trip),
    });
  }

  getBoughtTrips(): History[] {
    return this.history;
  }

  getTripListFiltered(tripList: Trip[] | undefined): Trip[] {
    if (!tripList) return [];
    return tripList.filter(
      (trip) =>
        this.maxPriceFilter(trip) &&
        this.minPriceFilter(trip) &&
        this.maxDateFilter(trip) &&
        this.minDateFilter(trip) &&
        this.ratingFilter(trip)
    );
  }

  updateMaxPrice(maxPrice: number) {
    this.maxPriceFilter = (trip) => trip.unitPrice <= maxPrice;
    this.reRender?.();
  }

  updateMinPrice(minPrice: number) {
    this.minPriceFilter = (trip) => trip.unitPrice >= minPrice;
    this.reRender?.();
  }

  updateMaxDate(maxDate: string) {
    this.maxDateFilter = (trip) => new Date(trip.start) <= new Date(maxDate);
    this.reRender?.();
  }

  updateMinDate(minDate: string) {
    this.minDateFilter = (trip) => new Date(trip.start) >= new Date(minDate);
    this.reRender?.();
  }

  addTrip(trip: Trip) {
    console.log('addTrip called', trip);
    this.http.post(`${baseUrl}/trips/`, trip, httpOptions).subscribe(() => {
      this.trips.push(trip);
      this.reRender?.();
    });
  }

  updateRatingFilter(options: number[]) {
    this.ratingFilter = (trip) => options.includes(trip.rating);
    this.reRender?.();
  }

  removeTrip(id: string) {
    this.http.delete(`${baseUrl}/trips/${id}`, httpOptions).subscribe(() => {
      const index = this.trips.findIndex((trip) => trip.id === id);
      this.trips.splice(index, 1);
      this.reRender?.();
    });
  }
  rate(id: string, rating: number) {
    const index = this.trips.findIndex((trip) => trip.id === id);
    this.trips[index].rating = rating;
    this.reRender?.();
  }

  addTripToCart(trip: Trip) {
    const index = this.cartItems.findIndex((item) => item.trip.id === trip.id);
    if (index === -1) {
      this.cartItems.push({ trip, quantity: 1 });
    } else {
      this.cartItems[index].quantity += 1;
    }
  }

  getTakenSeats(trip: Trip) {
    const item = this.cartItems.find((item) => item.trip.id === trip.id);
    return item ? item.quantity : 0;
  }

  cancelTripFromCart(trip: Trip) {
    const index = this.cartItems.findIndex((item) => item.trip.id === trip.id);
    if (index === -1) {
      return;
    }
    if (this.cartItems[index].quantity === 1) {
      this.cartItems.splice(index, 1);
    }
    this.cartItems[index].quantity -= 1;
  }

  removeTripFromCart(trip: Trip) {
    const index = this.cartItems.findIndex((item) => item.trip.id === trip.id);
    if (index === -1) {
      return;
    }
    this.cartItems.splice(index, 1);
  }

  getCartItems() {
    return this.cartItems;
  }

  async getPriceRange(trips: Trip[]) {
    const priceRange = this.getTripListFiltered(trips).reduce(
      (prev, current) => {
        if (current.unitPrice < prev.min) {
          prev.min = current.unitPrice;
        }
        if (current.unitPrice > prev.max) {
          prev.max = current.unitPrice;
        }
        return prev;
      },
      { min: Infinity, max: 0 }
    );
    return priceRange;
  }
}
