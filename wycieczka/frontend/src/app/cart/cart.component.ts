import { Component, OnInit } from '@angular/core';
import { CartItem } from '../app.cart-item';
import { TripDataService } from '../trip-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  constructor(private service: TripDataService) {
    this.items = this.service.getCartItems();
  }

  ngOnInit(): void {}

  getSum() {
    return this.items.reduce(
      (acc, curr) => acc + curr.trip.unitPrice * curr.quantity,
      0
    );
  }

  buy(item: CartItem) {
    alert('Thank you for your purchase!');
    this.service.buyTrip(item);
    this.service.removeTripFromCart(item.trip);
  }
  remove(item: CartItem) {
    this.service.cancelTripFromCart(item.trip);
  }
}
