import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { Trip } from '../app.trip';
import { TripDataService } from '../trip-data.service';

@Component({
  selector: 'app-filter-trip-form',
  templateUrl: './filter-trip-form.component.html',
  styleUrls: ['./filter-trip-form.component.css'],
})
export class FilterTripFormComponent implements OnInit {
  filterForm!: FormGroup;
  ratingFilterForm!: FormGroup;
  countriesFilterForm!: FormGroup;
  getPriceRange?: () => { min: number; max: number };
  ui?: { min: number; max: number };
  currentRange: { min?: number; max?: number } = {};
  updateMin?: (event: Event) => void;
  updateMax?: (event: Event) => void;
  updateMinDate?: (event: Event) => void;
  updateMaxDate?: (event: Event) => void;
  updateRatingFilter?: (options: number[]) => void;
  filterCountries: Trip[] = [];
  items: any;
  minRate = 0;
  maxRate = 10;

  constructor(private service: TripDataService, private _fb: FormBuilder) {
    this.currentRange = { ...this.ui };
    this.updateRatingFilter = service.updateRatingFilter;
    this.updateMin = (event: Event) => {
      const element = event.currentTarget as HTMLInputElement;
      this.currentRange.min = Number(element.value);
      service.updateMinPrice(this.currentRange.min);
    };
    this.updateMax = (event: Event) => {
      const element = event.currentTarget as HTMLInputElement;
      this.currentRange.max = Number(element.value);
      service.updateMaxPrice(this.currentRange.max);
    };
    this.updateMinDate = (event: Event) => {
      const element = event.currentTarget as HTMLInputElement;
      service.updateMinDate(element.value);
    };
    this.updateMaxDate = (event: Event) => {
      const element = event.currentTarget as HTMLInputElement;
      service.updateMaxDate(element.value);
    };
  }

  ngOnInit(): void {
    this.service.getTripList().subscribe(async (data) => {
      this.ui = await this.service.getPriceRange(data);
    });
    if (this.getPriceRange) {
      this.ui = this.getPriceRange?.();
    }
    this.filterForm = new FormGroup({
      start: new FormControl('', Validators.required),
      end: new FormControl('', Validators.required),
    });
    this.ratingFilterForm = this._fb.group({
      ratings: new FormArray(
        new Array(this.maxRate - this.minRate + 1)
          .fill(null)
          .map((_) => new FormControl(true))
      ),
    });
    this.countriesFilterForm = this._fb.group({
      checkBoxes: this._fb.group({}),
    });
  }

  public checks: Array<{ description: number; value: boolean }> = new Array(
    this.maxRate - this.minRate + 1
  )
    .fill(0)
    .map((_, i) => ({
      description: i + this.minRate,
      value: true,
    }));

  onCheckChange(event: Event) {
    const formArray: FormArray = this.ratingFilterForm.get(
      'ratings'
    ) as FormArray;
    const output: number[] = [];
    const id = Number((event.currentTarget as HTMLInputElement).id);
    formArray.controls.forEach((control, i) => {
      if (i === id - 1) {
        control.setValue(!control.value);
      }
      if (control.value) {
        output.push(this.checks[i].description);
      }
    });
    this.updateRatingFilter?.(output);
  }
}
