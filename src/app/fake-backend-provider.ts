// import { Http, BaseRequestOptions, RequestOptions, RequestMethod } from '@angular/http';
// import {Response, ResponseOptions} from '@angular/http';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';

// import { MockBackend, MockConnection } from '@angular/http/testing';

// export function fackBackendFactory(
//   backend: MockBackend,
//   options: BaseRequestOptions) {

//   let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.IgfIWP_XtusfBW3ltGuDKdGk4xJZkOjmyoqkjkAkWSI';

//   backend.connections.subscribe((connection: MockConnection) => {
//     setTimeout(() => {

//       // check authen
//       if(connection.request.url.endsWith('/api/authenticate') && 
//         connection.request.method === RequestMethod.Post) {
//         let body = JSON.parse(connection.request.getBody());
//         console.log(body);
//         const email = 'demo@gmail.com';
//         const password = '123456';

//         if(body.email === email && body.password === password) {
//           connection.mockRespond(new Response(
//             new ResponseOptions({
//               status: 200,
//               body: { token: token}
//             })))
//         } else {
//           connection.mockRespond(new Response(new ResponseOptions({
//             status: 200
//           })))
//         }
//       }

//       // get api/order
//       if(connection.request.url.endsWith('/api/orders') && 
//         connection.request.method === RequestMethod.Get) {
//         if(connection.request.headers.get('Authorization') === ('Bearer ' + token)) {
//           connection.mockRespond(new Response(new ResponseOptions({
//             status: 200,
//             body: [1, 2, 3]
//           })))
//         } else {
//           connection.mockRespond(new Response(new ResponseOptions({
//             status: 401
//           })))
//         }
//       }

//     }, 1000);
//   });

//   return new Http(backend, options);
// }

// export let fackBackendProvider = {
//   // provide: Http,
//   provide: HTTP_INTERCEPTORS,
//   useFactory: fackBackendFactory,
//   multi: true,
//   // useFactory: fackBackendFactory,
//   deps: [MockBackend, BaseRequestOptions]
// }

import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    constructor() { }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // let testUser = { id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' };
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.IgfIWP_XtusfBW3ltGuDKdGk4xJZkOjmyoqkjkAkWSI';
        let body = JSON.parse(request.body);
        const email = 'demo@gmail.com';
        const password = '123456';
        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate
            if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {
                if (body.email === email && body.password === password) {
                    // if login details are valid return 200 OK with a fake jwt token
                    return of(new HttpResponse({ status: 200, body: { token: token } }));
                } else {
                    // else return 400 bad request
                    return throwError('Username or password is incorrect');
                }
            }

            // get users
            if (request.url.endsWith('/api/orders') && request.method === 'GET') {
                // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                if (request.headers.get('Authorization') === ('Bearer ' + token)) {
                    return of(new HttpResponse({ status: 200, body: [1, 2, 3] }));
                } else {
                    // return 401 not authorised if token is null or invalid
                    return throwError('Token is null or invalid');
                }
            }

            // pass through any requests not handled above
            return next.handle(request);
            
        }))

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .pipe(materialize())
        .pipe(delay(500))
        .pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};

