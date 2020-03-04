import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  userToken: any;
  decodedToken: any;

constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) { }

login(model: any) {
  return this.http.post(this.baseUrl +  'login', model)
    .pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.tokenString);
          this.decodedToken = this.jwtHelperService.decodeToken(user.tokenString);
          console.log(this.decodedToken);
          this.userToken = user.tokenString;
        }
    }));
}

register(model: any) {
  return this.http.post(this.baseUrl + 'register', model);
}

loggedIn() {
  const token = this.jwtHelperService.tokenGetter();
  if (!token) {
    return false;
  }
  return !this.jwtHelperService.isTokenExpired(token);
}

}
