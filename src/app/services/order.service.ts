import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpHandler } from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: Http) { }
  // constructor(private http: HttpClient) { }

  getOrders() {
    let headers = new Headers();
    let token = localStorage.getItem('token');
    headers.append('Authorization', 'Bearer ' + token);
    let options = new RequestOptions({headers: headers})

    return this.http.get('/api/orders', options)
      .map(response => response.json());

    // return this.http.get<any[]>('/api/orders')
    //   .map(data => data);

    // return this.http.get<any[]>('/api/orders');
  }
}
