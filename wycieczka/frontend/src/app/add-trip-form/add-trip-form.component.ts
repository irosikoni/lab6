import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TripDataService } from '../trip-data.service';
import { Trip } from '../app.trip';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-add-trip-form',
  templateUrl: './add-trip-form.component.html',
  styleUrls: ['./add-trip-form.component.css'],
})
export class AddTripFormComponent implements OnInit {
  modelForm!: FormGroup;

  constructor(
    private service: TripDataService,
    private router: Router,
    private auth: AuthenticateService
  ) {
    this.auth.getUser().subscribe((user) => {
      if (!user.roles.includes('MANAGER')) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit(): void {
    this.modelForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z!\s]+$/),
      ]),
      country: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z\s]+$/),
      ]),
      start: new FormControl('', Validators.required),
      end: new FormControl('', Validators.required),
      unitPrice: new FormControl('', [
        Validators.required,
        Validators.pattern('[1-9]{1}[0-9]*'),
      ]),
      limit: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]+'),
      ]),
      description: new FormControl('', [Validators.required]),
      photo: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    console.log(this.modelForm.controls['name']);
    if (this.modelForm.valid) {
      const initialValues: Omit<
        Trip,
        | 'id'
        | 'name'
        | 'country'
        | 'start'
        | 'end'
        | 'unitPrice'
        | 'limit'
        | 'description'
        | 'photo'
      > = {
        taken: 0,
        rating: 0,
      };
      const trip: Trip = { ...this.modelForm.value, ...initialValues };
      this.service.addTrip(trip);
      // clear the form
      this.modelForm.reset();
    }
  }
}
