import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTripFormComponent } from './filter-trip-form.component';

describe('FilterTripFormComponent', () => {
  let component: FilterTripFormComponent;
  let fixture: ComponentFixture<FilterTripFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterTripFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterTripFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
