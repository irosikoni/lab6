import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css'],
})
export class StartPageComponent implements OnInit {
  mapsOptions = {
    center: { lat: 50.067346, lng: 19.913276 },
    zoom: 16,
    mapTypeId: 'hybrid',
    mapTypeControl: false,
  };
  constructor() {}

  ngOnInit(): void {}
}
