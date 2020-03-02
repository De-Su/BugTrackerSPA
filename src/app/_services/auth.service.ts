import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthUser } from '../_models/authUser';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  userToken: any;
  decodedToken: any;

constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) { }

login(model: any) {
  return this.http.post<AuthUser>(this.baseUrl +  'login', model, {headers: new HttpHeaders()
    .set('Content-type', 'application/json')})
    .pipe(map(user => {
        if (user) {
          localStorage.setItem('token', user.tokenString);
          this.decodedToken = this.jwtHelperService.decodeToken(user.tokenString);
          console.log(this.decodedToken);
          this.userToken = user.tokenString;
        }
    }));
}

register(model: any) {
  return this.http.post(this.baseUrl + 'register', model, {headers: new HttpHeaders()
    .set('Content-type', 'application/json')});
}

loggedIn() {
  const token = this.jwtHelperService.tokenGetter();
  if (!token) {
    return false;
  }
  return !this.jwtHelperService.isTokenExpired(token);
}

}
