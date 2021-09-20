import { Router } from '@angular/router';
import { map, shareReplay, tap } from 'rxjs/operators';
import { User } from '../_models/user';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


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

        const token = localStorage.getItem('teste');
        this._isLoggedIn$.next(!!token);

    }

    login(request: any): Observable<User> {
        return this.http.post<User>(`${this.baseUrl}/login`, request, { responseType: 'text' as 'json' })
            .pipe(
                tap(response => {
                    localStorage.setItem('teste', JSON.stringify(response));
                    this._isLoggedIn$.next(true);
                })
            );
    }


    logout() {
        localStorage.removeItem('teste');
        this.router.navigate(['/login']);

    }
}
