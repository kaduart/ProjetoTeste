import { Role } from './../_models/role';
import { User } from './../_models/user';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';


@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const users: any[] = [
            {
                id: 1, login: 'admin', password: 'admin', name: 'Admin', cpf: '72931701149', addressCep: 'string',
                addressStreet: 'QND', addressNumber: 888, addressComplement: '', addressNeighborhood: 'taguatinga',
                addressCity: 'Brasilia', addressUf: 'DF', role: Role.Admin
            },
            {
                id: 2, login: 'user', password: 'user', name: 'User', cpf: '72931701149', addressCep: 'string',
                addressStreet: 'QND', addressNumber: 888, addressComplement: '', addressNeighborhood: 'taguatinga',
                addressCity: 'Brasilia', addressUf: 'DF', role: Role.User
            }
        ];

        const authHeader = request.headers.get('Authorization');
        const isLoggedIn = authHeader && authHeader.startsWith('Bearer fake-jwt-token');
        const roleString = isLoggedIn && authHeader.split('.')[1];
        const role =  roleString ? Role[roleString] : null;

        // wrap in delayed observable to simulate server api call
        return of(null).pipe(mergeMap(() => {

            // authenticate - public
            if (request.url.endsWith('/users/authenticate') && request.method === 'POST') {
                const user = users.find(x => x.login === request.body.login && x.password === request.body.password);
                if (!user) return error('login or password is incorrect');
                return ok({
                    id: user.id,
                    login: user.login,
                    name: user.name,
                    cpf: user.cpf,
                    addressCep: user.addressCep,
                    addressStreet: user.addressStreet,
                    addressNumber: user.addressNumber,
                    addressComplement: user.addressComplement,
                    addressNeighborhood: user.addressNeighborhood,
                    addressCity: user.addressCity,
                    addressUf: user.addressUf,
                    role: user.role,
                    token: `fake-jwt-token.${user.role}`
                });
            }

            // get user by id - admin or user (user can only access their own record)
            if (request.url.match(/\/users\/\d+$/) && request.method === 'GET') {
                if (!isLoggedIn) return unauthorised();

                // get id from request url
                let urlParts = request.url.split('/');
                let id = parseInt(urlParts[urlParts.length - 1]);

                // only allow normal users access to their own record
                const currentUser = users.find(x => x.role === role);
                if (id !== currentUser.id && role !== Role.Admin) return unauthorised();

                const user = users.find(x => x.id === id);
                return ok(user);
            }

            // get all users (admin only)
            if (request.url.endsWith('/users') && request.method === 'GET') {
                if (role !== Role.Admin) return unauthorised();
                return ok(users);
            }

            // pass through any requests not handled above
            return next.handle(request);
        }))
            // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        // private helper functions

        function ok(body: any) {
            return of(new HttpResponse({ status: 200, body }));
        }

        function unauthorised() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function error(message: any) {
            return throwError({ status: 400, error: { message } });
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};