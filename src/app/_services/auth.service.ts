import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { AuthUser } from '../_models/authUser';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  userToken: any;

constructor(private http: HttpClient) { }

login(model: any) {
  return this.http.post<AuthUser>(this.baseUrl +  'login', model, {headers: new HttpHeaders()
    .set('Content-type', 'application/json')})
    .pipe(map(user => {
        if (user) {
          localStorage.setItem('token', user.tokenString);
          this.userToken = user.tokenString;
        }
    }));
}

register(model: any) {
  return this.http.post(this.baseUrl + 'register', model, {headers: new HttpHeaders()
    .set('Content-type', 'application/json')});
}

}
