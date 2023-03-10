import { CartItem } from './app.cart-item';

export enum TripStatus {
  PAST = 'past',
  ONGOING = 'ongoing',
  UPCOMING = 'upcoming',
}

export interface History extends CartItem {
  tripStatus: TripStatus;
}
