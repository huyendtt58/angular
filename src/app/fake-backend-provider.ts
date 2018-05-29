import { Http, BaseRequestOptions, RequestOptions, RequestMethod } from '@angular/http';
import {Response, ResponseOptions} from '@angular/http';

import { MockBackend, MockConnection } from '@angular/http/testing';

export function fackBackendFactory(
  backend: MockBackend,
  options: BaseRequestOptions) {

  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.IgfIWP_XtusfBW3ltGuDKdGk4xJZkOjmyoqkjkAkWSI';

  backend.connections.subscribe((connection: MockConnection) => {
    setTimeout(() => {

      // check authen
      if(connection.request.url.endsWith('/api/authenticate') && 
        connection.request.method === RequestMethod.Post) {
        let body = JSON.parse(connection.request.getBody());
        // console.log(body);
        const email = 'demo@gmail.com';
        const password = '123456';

        if(body.email === email && body.password === password) {
          connection.mockRespond(new Response(
            new ResponseOptions({
              status: 200,
              body: { token: token}
            })))
        } else {
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200
          })))
        }
      }

      // get api/order
      if(connection.request.url.endsWith('/api/orders') && 
        connection.request.method === RequestMethod.Get) {
        if(connection.request.headers.get('Authorization') === ('Bearer ' + token)) {
          connection.mockRespond(new Response(new ResponseOptions({
            status: 200,
            body: [1, 2, 3]
          })))
        } else {
          connection.mockRespond(new Response(new ResponseOptions({
            status: 401
          })))
        }
      }

    }, 1000);
  });

  return new Http(backend, options);
}

export let fackBackendProvider = {
  provide: Http,
  useFactory: fackBackendFactory,
  deps: [MockBackend, BaseRequestOptions]
}
