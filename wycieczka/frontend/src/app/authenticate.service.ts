import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from './app.role';
import { Observable } from 'rxjs';

const AUTH_ENDPOINT = 'http://localhost:8000';

export type User = {
  id: string;
  name: string;
  isBanned: boolean;
  email: string;
  roles: Role[];
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  isLoggedIn: boolean = false;
  accessToken: string = '';
  refreshToken: string = '';

  constructor(private http: HttpClient) {}

  login(userName: string, password: string, onSucces?: () => void) {
    return this.http
      .post<{ accessToken: string; refreshToken: string }>(
        `${AUTH_ENDPOINT}/auth/login`,
        {
          userName,
          password,
        }
      )
      .subscribe(({ accessToken, refreshToken }) => {
        this.isLoggedIn = true;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        console.log(this.isLoggedIn);
        onSucces?.();
      });
  }

  signUp(username: string, email: string, password: string) {
    return this.http.post(`${AUTH_ENDPOINT}/auth/signup`, {
      username,
      email,
      password,
    });
  }
  refresh() {
    return this.http
      .post<{ accessToken: string }>(`${AUTH_ENDPOINT}/auth/refresh`, {
        refreshToken: this.refreshToken,
      })
      .subscribe(({ accessToken }) => {
        this.accessToken = accessToken;
      });
  }
  getUser(): Observable<User> {
    return this.http.get<User>(`${AUTH_ENDPOINT}/auth/user`);
  }

  isLogged() {
    return this.isLoggedIn;
  }
}
