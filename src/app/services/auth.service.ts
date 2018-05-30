import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { JwtHelperService } from '@auth0/angular-jwt';

import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // constructor(private http: Http) { }
  constructor(private httpClient: HttpClient) { }

  login(account) {
    const authUrl = '/api/authenticate';
    return this.httpClient.post(authUrl, JSON.stringify(account))
      .map(response => {
        let token = response;
        if(token) {
          localStorage.setItem('token', JSON.stringify(token));
          return true;
        }
        return false;
      });
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    let jwtHelper = new JwtHelperService();
    let token = localStorage.getItem('token');
    if(!token) {
      return false;
    }
    return jwtHelper.isTokenExpired(token);

    // let jwtHelper = new JwtHelperService();
    // let token = localStorage.getItem('token');
    // if(!token) {
    //   return false;
    // }

    // let expirationDate = jwtHelper.getTokenExpirationDate(token);
    // let isExpired = jwtHelper.isTokenExpired(token);

    // return !isExpired;
  }

  getCurrentUser() {
    let token = localStorage.getItem('token');
    if(!token) {
      return null;
    }
    return new JwtHelperService().decodeToken(token);
  }

}
