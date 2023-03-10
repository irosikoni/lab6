import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-trip-navbar',
  templateUrl: './trip-navbar.component.html',
  styleUrls: ['./trip-navbar.component.css'],
})
export class TripNavbarComponent implements OnInit {
  isLog: Boolean = false;
  authService: AuthenticateService;
  constructor(authService: AuthenticateService) {
    this.authService = authService;
  }

  ngOnInit(): void {
    this.isLog = this.authService.isLoggedIn;
  }
}
