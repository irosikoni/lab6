import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripNavbarComponent } from './trip-navbar.component';

describe('TripNavbarComponent', () => {
  let component: TripNavbarComponent;
  let fixture: ComponentFixture<TripNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
