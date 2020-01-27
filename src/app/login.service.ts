import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDetails } from './login-details';
import { CustomerDetails } from './customer-details';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiLoginUrl = 'http://localhost:4000/login';
  apiLoginUrl1 = 'http://localhost:4002/login';
  apiSignupUrl = 'http://localhost:4002/create';
  constructor(
    private http: HttpClient
  ) { }

  public login(login: LoginDetails): any {
    if (login.rank === '3') {
      return this.http.post(this.apiLoginUrl1, login);
    } else {
      return this.http.post(this.apiLoginUrl, login);
    }
  }

  public signup(cust: CustomerDetails) {
    return this.http.post(this.apiSignupUrl, cust);
  }
}
