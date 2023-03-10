import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-sign-form',
  templateUrl: './sign-form.component.html',
  styleUrls: ['./sign-form.component.css'],
})
export class SignFormComponent implements OnInit {
  userName = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[A-Za-z0-9]+$/),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(
      new RegExp('(?=.{8,})') &&
        new RegExp('(?=.*[!@#$%^&*])') &&
        new RegExp('(?=.*[A-Z])') &&
        new RegExp('(?=.*[0-9])')
    ),
  ]);
  rpassword = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);

  constructor(authService: AuthenticateService) {
    if (
      this.userName.value === null ||
      this.password.value === null ||
      this.email.value === null ||
      this.rpassword === null
    ) {
      return;
    }
    if (this.password !== this.rpassword) {
      return;
    }
    authService.signUp(
      this.userName.value,
      this.email.value,
      this.password.value
    );
  }

  ngOnInit(): void {}
}
