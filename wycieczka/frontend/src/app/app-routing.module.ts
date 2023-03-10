import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTripFormComponent } from './add-trip-form/add-trip-form.component';
import { CartComponent } from './cart/cart.component';
import { TripHistoryComponent } from './trip-history/trip-history.component';
import { StartPageComponent } from './start-page/start-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TripsPageComponent } from './trips-page/trips-page.component';
import { TripPageComponent } from './trip-page/trip-page.component';
import { LogFormComponent } from './log-form/log-form.component';
import { SignFormComponent } from './sign-form/sign-form.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'app-trips-page', component: TripsPageComponent },
  {
    path: 'app-add-trip-form',
    component: AddTripFormComponent,
    canActivate: [AuthGuard],
  },
  { path: 'app-cart', component: CartComponent, canActivate: [AuthGuard] },
  {
    path: 'app-trip-history',
    component: TripHistoryComponent,
    canActivate: [AuthGuard],
  },
  { path: 'app-log-form', component: LogFormComponent },
  { path: 'app-log-form/app-sign-form', component: SignFormComponent },
  {
    path: 'app-trips-page/:id',
    component: TripPageComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
