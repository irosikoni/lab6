import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TripsComponent } from './trips/trips.component';
import { TripCardComponent } from './trip-card/trip-card.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TripNavbarComponent } from './trip-navbar/trip-navbar.component';
import { AddTripFormComponent } from './add-trip-form/add-trip-form.component';
import { FilterTripFormComponent } from './filter-trip-form/filter-trip-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { CartComponent } from './cart/cart.component';
import { TripHistoryComponent } from './trip-history/trip-history.component';
import { StartPageComponent } from './start-page/start-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TripsPageComponent } from './trips-page/trips-page.component';
import { TripPageComponent } from './trip-page/trip-page.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { LogFormComponent } from './log-form/log-form.component';
import { SignFormComponent } from './sign-form/sign-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TripsComponent,
    TripCardComponent,
    MainPageComponent,
    TripNavbarComponent,
    AddTripFormComponent,
    FilterTripFormComponent,
    CartComponent,
    TripHistoryComponent,
    StartPageComponent,
    PageNotFoundComponent,
    TripsPageComponent,
    TripPageComponent,
    LogFormComponent,
    SignFormComponent,
  ],
  providers: [],
  bootstrap: [MainPageComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleMapsModule,
  ],
})
export class AppModule {}
