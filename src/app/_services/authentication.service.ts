import { Router } from '@angular/router';
import {  tap } from 'rxjs/operators';
import { User } from '../_models/user';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


const AUTH_DATA = "auth_data";

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private baseUrl = 'http://localhost:2030';


    tokenUser: any;

    private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
    isLoggedIn$ = this._isLoggedIn$.asObservable();

    constructor(
        private http: HttpClient,
        private router: Router
    ) {

        const token = localStorage.getItem(AUTH_DATA);
        this._isLoggedIn$.next(!!token);

    }

    login(request: any): Observable<User> {
        return this.http.post<User>(`${this.baseUrl}/login`, request, { responseType: 'text' as 'json' })
            .pipe(
                tap(response => {
                    localStorage.setItem(AUTH_DATA, JSON.stringify(response));
                    this._isLoggedIn$.next(true);
                })
            );
    }


    logout() {
        localStorage.removeItem(AUTH_DATA);
        this.router.navigate(['/login']);

    }
}
