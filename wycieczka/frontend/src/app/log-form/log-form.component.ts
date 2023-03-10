import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authenticate.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css'],
})
export class LogFormComponent {
  userName = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  authService: AuthenticateService;

  constructor(authService: AuthenticateService, private router: Router) {
    this.authService = authService;
    console.log(typeof this.password.value);
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.userName.value === null || this.password.value === null) {
      return;
    }

    this.authService.login(this.userName.value, this.password.value, () => {
      this.router.navigate(['/']);
      console.log(typeof this.userName.value);
      console.log(typeof this.password.value);
    });
    this.userName.reset();
    this.password.reset();
  }
}
